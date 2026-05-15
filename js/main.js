// ============================================================
// 装机大师 v4 — 自主选配 + 3D实时预览
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from './lib/OrbitControls.js';
import { compatEngine } from './compat-engine.js';
import { PriceCalc } from './price-calc.js';
import { saveConfig } from './config-manager.js';
import { showToast, showError } from './error-banner.js';

// GLTFLoader懒加载
let _GLTFLoader=null,_gltfLdr=null;
async function _ldr(){if(!_GLTFLoader){const m=await import('./lib/GLTFLoader.js');_GLTFLoader=m.GLTFLoader;_gltfLdr=new _GLTFLoader();}return _gltfLdr;}

// ===================== 全局状态 =====================
const selectedBuild={};
let currentTab='intro',activeComponentKey=null,prevTotalPrice=0;
let scene,camera,renderer,controls;
let caseGroup,defaultCamPos,defaultTarget;
const componentGroups={};     // key→Group
const compSlots={};           // key→槽位配置
const compWorldPos={};        // key→标签锚点
const allFanMeshes=[];
const emissiveObjects=[];
const labelEls={};
let hoveredPart=null,selectedPart=null;
let raycaster,mouse;

// 配色
let colorTheme=0;
const colorThemes=[{name:'银灰',frame:0x8a8a8a,tray:0x505050,accent:0x888888},{name:'暗黑',frame:0x4a4a4a,tray:0x333333,accent:0x666666},{name:'钛金',frame:0x999988,tray:0x5a5a55,accent:0xaaaa99}];
let glassOpacity=0.2;

// ===================== 选配数据库 =====================
const PART_OPTIONS = {
  case: [
    {id:'case-default',name:'ATX海景房',glb:'models/case.glb',icon:'🖥️',color:0x8a8a8a,preview:'银灰铝合金+钢化玻璃'},
  ],
  gpu: [
    {id:'gpu-dual',name:'双风扇显卡',glb:'models/gpu-dual.glb',icon:'🎮',color:0x555555,preview:'中端双风扇·30cm级',size:[.1,.45,2.4]},
    {id:'gpu-triple',name:'三风扇显卡',glb:'models/gpu-triple.glb',icon:'🎮',color:0x5a5a5a,preview:'高端三风扇·33cm级',size:[.1,.45,3.1]},
    {id:'gpu-flagship',name:'旗舰显卡',glb:'models/gpu-flagship.glb',icon:'🔥',color:0x4a4a4a,preview:'三槽旗舰·35cm级',size:[.14,.48,3.3]},
  ],
  motherboard: [
    {id:'mb-default',name:'ATX主板(黑)',glb:'models/motherboard.glb',icon:'📋',color:0x1a3a1a,preview:'标准ATX·黑色PCB'},
    {id:'mb-white',name:'ATX主板(白)',glb:'models/motherboard.glb',icon:'📋',color:0xcccccc,preview:'标准ATX·白色PCB',colorOverride:0xcccccc},
  ],
  fan: [
    {id:'fan-blue',name:'RGB风扇(蓝)',glb:'models/fan.glb',icon:'🌀',emissive:0x3366ff,preview:'12cm·蓝色灯效'},
    {id:'fan-purple',name:'RGB风扇(紫)',glb:'models/fan.glb',icon:'🌀',emissive:0x9933ff,preview:'12cm·紫色灯效'},
    {id:'fan-red',name:'RGB风扇(红)',glb:'models/fan.glb',icon:'🌀',emissive:0xff3366,preview:'12cm·红色灯效'},
    {id:'fan-rainbow',name:'RGB风扇(彩虹)',glb:'models/fan.glb',icon:'🌈',emissive:'rainbow',preview:'12cm·彩虹渐变'},
  ],
  cpu: [
    {id:'cpu-intel',name:'Intel CPU',glb:'models/cpu.glb',icon:'🧠',color:0x555555,preview:'LGA1700'},
    {id:'cpu-amd',name:'AMD CPU',glb:'models/cpu.glb',icon:'🧠',color:0x888888,preview:'AM5'},
  ],
  cooler: [
    {id:'cooler-air',name:'双塔风冷',glb:'models/cooler.glb',icon:'❄️',color:0x606060,preview:'双塔6热管'},
    {id:'cooler-aio',name:'240水冷',glb:'models/cooler.glb',icon:'💧',color:0x444444,preview:'240mm一体水冷'},
  ],
  ram: [
    {id:'ram-black',name:'DDR5内存(黑)',glb:'models/ram.glb',icon:'📏',color:0x333333,preview:'16GB×2 无灯'},
    {id:'ram-rgb',name:'DDR5内存(RGB)',glb:'models/ram.glb',icon:'📏',color:0x444444,preview:'16GB×2 RGB',rgb:true},
  ],
  storage: [
    {id:'ssd-default',name:'NVMe SSD',glb:'models/ssd.glb',icon:'💾',color:0x505050,preview:'M.2 2280'},
  ],
  psu: [
    {id:'psu-default',name:'ATX电源',glb:'models/psu.glb',icon:'🔌',color:0x5a5a5a,preview:'750W金牌全模组'},
  ],
};

// 当前部件选择
const currentPicks = {
  case:'case-default', gpu:'gpu-dual', motherboard:'mb-default',
  fan:'fan-blue', cpu:'cpu-intel', cooler:'cooler-air',
  ram:'ram-black', storage:'ssd-default', psu:'psu-default',
};

// ===================== PBR材质工厂 =====================
const mBrushed=(h)=>new THREE.MeshStandardMaterial({color:h,roughness:.25,metalness:.85});
const mGlass=(o)=>new THREE.MeshPhysicalMaterial({color:0xcccccc,roughness:0,metalness:.05,transparent:true,opacity:o,envMapIntensity:.8,clearcoat:.15,clearcoatRoughness:0});
const mGun=(h)=>new THREE.MeshStandardMaterial({color:h,roughness:.4,metalness:.7});
const mFan=(e,s)=>new THREE.MeshStandardMaterial({color:0x1a1a1a,roughness:.3,metalness:.25,emissive:e,emissiveIntensity:s});
const mGhost=(h,o)=>new THREE.MeshStandardMaterial({color:h,roughness:.5,metalness:.15,transparent:true,opacity:o});

// ===================== 粒子背景 =====================
function initParticles(){const cv=document.getElementById('particleCanvas');if(!cv)return;const ctx=cv.getContext('2d'),pts=[];for(let i=0;i<35;i++)pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,s:Math.random()*1.2+.3,v:Math.random()*.25+.05,o:Math.random()*.25+.05});function rs(){cv.width=window.innerWidth;cv.height=window.innerHeight;}rs();window.addEventListener('resize',rs);(function a(){ctx.clearRect(0,0,cv.width,cv.height);pts.forEach(p=>{p.y-=p.v;if(p.y<-10){p.y=cv.height+10;p.x=Math.random()*cv.width;}ctx.fillStyle=`rgba(255,255,255,${p.o})`;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill();});requestAnimationFrame(a);})();}

// ===================== 场景初始化 =====================
function init3DScene(){const ct=document.getElementById('case3D');if(!ct)return;const ld=ct.querySelector('.case-loading');try{_doInit(ct,ld);}catch(e){console.error(e);if(ld){ld.innerHTML='❌ '+e.message;ld.style.color='#f44';}}}
function _doInit(ct,ld){
  scene=new THREE.Scene();scene.background=new THREE.Color(0x0a0a12);scene.fog=new THREE.Fog(0x0a0a12,14,32);
  camera=new THREE.PerspectiveCamera(38,ct.clientWidth/ct.clientHeight,.1,100);camera.position.set(-10,3.5,1);camera.lookAt(0,2.4,0);
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setSize(ct.clientWidth,ct.clientHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;renderer.outputColorSpace=THREE.SRGBColorSpace;ct.appendChild(renderer.domElement);
  controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,2.4,0);controls.enableDamping=true;controls.dampingFactor=.08;controls.rotateSpeed=.35;controls.zoomSpeed=.55;controls.minDistance=3.5;controls.maxDistance=14;controls.maxPolarAngle=Math.PI*.65;controls.minPolarAngle=Math.PI*.15;controls.update();
  defaultCamPos=camera.position.clone();defaultTarget=controls.target.clone();
  raycaster=new THREE.Raycaster();raycaster.far=14;mouse=new THREE.Vector2();
  _setupLights();_buildBase();caseGroup=new THREE.Group();scene.add(caseGroup);
  _buildCase();_buildAllComponents();_createLabels();_setupKeybinds();
  document.getElementById('btnResetView')?.addEventListener('click',_resetView);
  renderer.domElement.addEventListener('pointermove',_onPointerMove);renderer.domElement.addEventListener('dblclick',_onDblClick);renderer.domElement.addEventListener('click',_onClick);window.addEventListener('resize',_onResize);
  _buildPickerUI();
  if(ld)ld.style.display='none';_animate();
}

// ===================== 灯光+底座 =====================
function _setupLights(){scene.add(new THREE.AmbientLight(0x8899bb,2.0));scene.add(new THREE.HemisphereLight(0xaaccff,0x223344,1.2));const key=new THREE.DirectionalLight(0xfffff0,6);key.position.set(8,14,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.near=.5;key.shadow.camera.far=60;key.shadow.camera.left=-15;key.shadow.camera.right=15;key.shadow.camera.top=15;key.shadow.camera.bottom=-15;key.shadow.bias=-.00008;key.shadow.normalBias=.02;key.shadow.radius=1.5;scene.add(key);const f=new THREE.DirectionalLight(0xaaccff,2.5);f.position.set(-5,4,-3);scene.add(f);const r=new THREE.DirectionalLight(0xffffff,2);r.position.set(0,3,6);scene.add(r);const b=new THREE.DirectionalLight(0x8899bb,1);b.position.set(0,-1,0);scene.add(b);}
function _buildBase(){const bs=new THREE.Mesh(new THREE.CylinderGeometry(2,2.1,.08,48),new THREE.MeshStandardMaterial({color:0x2a2a2a,roughness:.25,metalness:.7}));bs.position.y=-.04;bs.receiveShadow=true;scene.add(bs);const rg=new THREE.Mesh(new THREE.TorusGeometry(2.05,.015,16,80),new THREE.MeshBasicMaterial({color:0x999999,transparent:true,opacity:.5}));rg.rotation.x=-Math.PI/2;rg.position.y=.005;rg.name='glowRing';scene.add(rg);const fl=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshStandardMaterial({color:0x111,roughness:.9,metalness:0}));fl.rotation.x=-Math.PI/2;fl.position.y=-.08;fl.receiveShadow=true;scene.add(fl);}

// ===================== 机箱外壳 =====================
function _buildCase(){const cw=2.5,ch=5.2,cd=4.8,ft=.06,th=colorThemes[colorTheme];const fm=mBrushed(th.frame),tm=mGun(th.tray),gm=mGlass(glassOpacity);const B=(w,h,d,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),fm);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;m.name='case-frame';caseGroup.add(m);};B(ft,ch,ft,-cw/2,ch/2,-cd/2);B(ft,ch,ft,cw/2,ch/2,-cd/2);B(ft,ch,ft,-cw/2,ch/2,cd/2);B(ft,ch,ft,cw/2,ch/2,cd/2);[ch,0].forEach(y=>{B(cw,ft,ft,0,y,-cd/2);B(cw,ft,ft,0,y,cd/2);B(ft,ft,cd,-cw/2,y,0);B(ft,ft,cd,cw/2,y,0);});B(cw-.1,.02,cd-.1,0,1.15,0);const tp=new THREE.Mesh(new THREE.PlaneGeometry(cd-.1,ch-.15),tm);tp.position.set(cw/2-.01,ch/2,0);tp.rotation.y=Math.PI/2;tp.receiveShadow=true;tp.name='case-frame';caseGroup.add(tp);const G=(w,h,x,y,z,ry)=>{const g=new THREE.Mesh(new THREE.PlaneGeometry(w,h),gm);g.position.set(x,y,z);g.rotation.y=ry||0;g.name='case-glass';caseGroup.add(g);};G(cw-.08,ch-.12,0,ch/2,-cd/2+.005,0);G(cd-.08,ch-.12,-cw/2+.005,ch/2,0,Math.PI/2);caseGroup.userData={cw,ch,cd};const sh=new THREE.Group();sh.name='case';[...caseGroup.children].forEach(c=>{if(!componentGroups[c.name]&&!c.name?.startsWith('fan-'))sh.add(c);});caseGroup.add(sh);componentGroups['case']=sh;compWorldPos['case']=new THREE.Vector3(0,ch*.5,-cd/2);}

// ===================== 构建所有部件（程序化占位+GLB异步加载） =====================
function _makeGroup(key,slot,detailFn){
  const g=new THREE.Group();g.name=key;const[sx,sy,sz]=slot.size;
  const main=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz,1,1,1),mGhost(slot.color));main.castShadow=main.receiveShadow=true;g.add(main);
  if(detailFn)detailFn(g,slot,sx,sy,sz);
  g.position.set(...slot.pos);g.rotation.set(...(slot.rot||[0,0,0]));caseGroup.add(g);componentGroups[key]=g;compWorldPos[key]=new THREE.Vector3(...slot.pos);return g;
}
function _buildAllComponents(){const{cw,ch,cd}=caseGroup.userData;const slots={motherboard:{pos:[cw/2-.13,ch*.56,0],size:[.06,3.5,3.1],rot:[0,0,0],color:0x3a3a3a},cpu:{pos:[cw/2-.17,ch*.72,.18],size:[.09,.45,.45],rot:[0,0,0],color:0x555555},cooler:{pos:[cw/2-.52,ch*.78,.18],size:[.7,1.35,1.15],rot:[0,0,0],color:0x606060},gpu:{pos:[cw/2-.22,ch*.44,-.1],size:[.08,.52,2.9],rot:[0,0,0],color:0x585858},storage:{pos:[cw/2-.18,ch*.34,.6],size:[.03,.07,.82],rot:[0,0,0],color:0x505050},psu:{pos:[0,.65,-1.4],size:[1.45,.88,1.5],rot:[0,0,0],color:0x5a5a5a},ram:{pos:[cw/2-.19,ch*.6,.88],size:[.04,1.02,.09],rot:[0,0,0],color:0x777777}};Object.assign(compSlots,slots);
  _makeGroup('motherboard',slots.motherboard,(g,s,sx,sy,sz)=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.28,.9),mGhost(0x505050))).position.set(-.05,.27,.2);g.add(new THREE.Mesh(new THREE.BoxGeometry(.08,.14,.4),mGhost(0x484848))).position.set(-.03,-.16,.55);g.add(new THREE.Mesh(new THREE.BoxGeometry(.06,.35,1.5),mGhost(0x666666))).position.set(-.04,.32,-.8);});
  _makeGroup('cpu',slots.cpu,(g,s,sx,sy,sz)=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.025,.4,.4),mGhost(0xcccccc,.5))).position.set(-.05,0,0);});
  _makeGroup('cooler',slots.cooler,(g,s,sx,sy,sz)=>{for(let i=0;i<5;i++)g.add(new THREE.Mesh(new THREE.BoxGeometry(.65,.08,.95),mGhost(0x555555))).position.set(0,-.4+i*.2,0);const fan=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.06,20),mFan(0x4488ff,.7));fan.rotation.z=Math.PI/2;fan.position.set(.33,0,0);fan.name='fan-blade';g.add(fan);allFanMeshes.push(fan);emissiveObjects.push(fan);});
  _makeGroup('gpu',slots.gpu,(g,s,sx,sy,sz)=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.3,1.8),mGhost(0x3d3d3d,.5))).position.set(-.07,.03,.2);g.add(new THREE.Mesh(new THREE.BoxGeometry(.02,.44,2.7),mGhost(0x333333))).position.set(-.05,0,-.05);const logo=new THREE.Mesh(new THREE.BoxGeometry(.003,.035,1.1),new THREE.MeshStandardMaterial({color:0x111,roughness:.2,metalness:.1,emissive:0x00ccff,emissiveIntensity:.9}));logo.position.set(-.1,.05,.2);g.add(logo);emissiveObjects.push(logo);});
  _makeGroup('storage',slots.storage,(g,s)=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.003,.035,.25),mGhost(0x333333))).position.set(-.02,0,.1);});
  _makeGroup('psu',slots.psu,(g,s)=>{const pf=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.04,20),mGhost(0x444444));pf.position.set(0,.35,0);pf.rotation.x=Math.PI/2;g.add(pf);const mp=new THREE.Mesh(new THREE.BoxGeometry(1.3,.08,.25),mGhost(0x333333));mp.position.set(0,-.44,.65);g.add(mp);});
  _makeGroup('ram',slots.ram,(g,s)=>{for(let i=0;i<3;i++){g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,1.02,.09),mGhost(0x777777))).position.set(0,0,(i+1)*.13);g.add(new THREE.Mesh(new THREE.BoxGeometry(.005,.06,.07),new THREE.MeshStandardMaterial({color:0x222,roughness:.2,metalness:.1,emissive:0xff4488,emissiveIntensity:.8}))).position.set(-.02,.45,(i+1)*.13);emissiveObjects.push(g.children[g.children.length-1]);}g.add(new THREE.Mesh(new THREE.BoxGeometry(.005,.06,.07),new THREE.MeshStandardMaterial({color:0x222,roughness:.2,metalness:.1,emissive:0xff4488,emissiveIntensity:.8}))).position.set(-.02,.45,0);emissiveObjects.push(g.children[g.children.length-1]);});
  _buildFans(cw,ch,cd);_buildCables(cw,ch);
  _loadAllGLBs();
}
function _buildFans(cw,ch,cd){const fc=[0x3366ff,0x9933ff,0xff3366];for(let j=0;j<3;j++){const g=new THREE.Group();g.name='fan-front-'+j;const ff=new THREE.Mesh(new THREE.TorusGeometry(.33,.03,8,24),mGun(0x444444));ff.rotation.x=Math.PI/2;g.add(ff);const b=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.04,16),mFan(fc[j],.9));b.rotation.x=Math.PI/2;b.name='fan-blade';g.add(b);emissiveObjects.push(b);allFanMeshes.push(b);g.position.set(0,ch*.42+j*.9,-cd/2+.04);g.userData={rotSpeed:.8+j*.2};caseGroup.add(g);const fk='fan-front-'+j;componentGroups[fk]=g;compWorldPos[fk]=new THREE.Vector3(0,ch*.42+j*.9,-cd/2);}const rg=new THREE.Group();rg.name='fan-rear';const rf=new THREE.Mesh(new THREE.TorusGeometry(.33,.03,8,24),mGun(0x444444));rf.rotation.x=Math.PI/2;rg.add(rf);const rb=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.04,16),mFan(0x3366ff,.7));rb.rotation.x=Math.PI/2;rb.name='fan-blade';rg.add(rb);emissiveObjects.push(rb);allFanMeshes.push(rb);rg.position.set(0,ch*.88,cd/2-.04);rg.userData={rotSpeed:1};caseGroup.add(rg);componentGroups['fan-rear']=rg;compWorldPos['fan-rear']=new THREE.Vector3(0,ch*.88,cd/2);}
function _buildCables(cw,ch){const m=new THREE.MeshStandardMaterial({color:0x1a1a1a,roughness:.7,metalness:.05});for(let i=0;i<5;i++){const cv=new THREE.CatmullRomCurve3([new THREE.Vector3(cw/2-.2,ch*.52+i*.06,1.5),new THREE.Vector3(cw/2-.3,ch*.48+i*.06,1.2),new THREE.Vector3(cw/2-.35,ch*.42,.8)]);caseGroup.add(new THREE.Mesh(new THREE.TubeGeometry(cv,12,.02,8,false),m)).castShadow=true;}}

// ===================== 选配面板 UI =====================
function _buildPickerUI(){
  const panel=document.getElementById('pickerPanel');if(!panel)return;
  const cats=[
    {key:'case',name:'机箱',icon:'🖥️'},{key:'gpu',name:'显卡',icon:'🎮'},{key:'motherboard',name:'主板',icon:'📋'},
    {key:'cpu',name:'CPU',icon:'🧠'},{key:'cooler',name:'散热器',icon:'❄️'},{key:'ram',name:'内存',icon:'📏'},
    {key:'storage',name:'硬盘',icon:'💾'},{key:'psu',name:'电源',icon:'🔌'},{key:'fan',name:'风扇灯效',icon:'🌀'},
  ];
  let html='<div class="picker-title">🎨 配件选择器</div><div class="picker-grid">';
  for(const cat of cats){
    const opts=PART_OPTIONS[cat.key]||[];const cur=currentPicks[cat.key];
    html+=`<div class="picker-cat"><div class="picker-cat-name">${cat.icon} ${cat.name}</div><div class="picker-opts">`;
    for(const opt of opts){
      html+=`<button class="picker-opt${cur===opt.id?' active':''}" data-cat="${cat.key}" data-id="${opt.id}" title="${opt.preview}">${opt.icon} ${opt.name}</button>`;
    }
    html+=`</div></div>`;
  }
  html+='</div>';
  panel.innerHTML=html;

  // 点击事件
  panel.querySelectorAll('.picker-opt').forEach(btn=>{btn.addEventListener('click',()=>{const cat=btn.dataset.cat,id=btn.dataset.id;_applyPick(cat,id);_buildPickerUI();});});
}

function _applyPick(cat,id){
  currentPicks[cat]=id;const opt=PART_OPTIONS[cat].find(o=>o.id===id);if(!opt)return;
  // 更新3D场景
  if(cat==='case'){_rebuildCase();return;}
  if(cat==='fan'){_updateFanColors(opt);return;}
  if(cat==='gpu'){_replaceComponent('gpu',opt,compSlots['gpu']);return;}
  if(cat==='motherboard'){_replaceComponent('motherboard',opt,compSlots['motherboard']);return;}
  // 其他部件用GLB加载
  const slot=compSlots[cat];if(slot&&opt.glb){_replaceComponent(cat,opt,slot);}
}
window._applyPick=_applyPick;
window.currentPicks=currentPicks;

function _replaceComponent(key,opt,slot){
  const old=componentGroups[key];if(old){caseGroup.remove(old);_dispose(old);}
  // 尝试加载GLB
  if(opt.glb){_tryLoadGLB(opt.glb,key,slot,opt);return;}
  // 回退程序化
  const g=new THREE.Group();g.name=key;const[sx,sy,sz]=slot.size;
  const color=opt.colorOverride||opt.color||slot.color;
  const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz,1,1,1),mGhost(color));m.castShadow=m.receiveShadow=true;g.add(m);
  g.position.set(...slot.pos);g.rotation.set(...(slot.rot||[0,0,0]));caseGroup.add(g);componentGroups[key]=g;
  if(selectedPart===key){_setGroupStyle(g,'real');}
}

async function _tryLoadGLB(url,key,slot,opt){
  try{
    const loader=await _ldr();
    loader.load(url,(gltf)=>{const model=gltf.scene;const bb=new THREE.Box3().setFromObject(model);const sz=new THREE.Vector3();bb.getSize(sz);const ct=new THREE.Vector3();bb.getCenter(ct);const[tsx,tsy,tsz]=slot.size;const sc=Math.min(tsx/(sz.x||.001),tsy/(sz.y||.001),tsz/(sz.z||.001))*.95;model.scale.setScalar(sc);model.position.set(slot.pos[0]-ct.x*sc,slot.pos[1]-ct.y*sc,slot.pos[2]-ct.z*sc);model.rotation.set(...(slot.rot||[0,0,0]));model.traverse(c=>{if(c.isMesh){c.castShadow=c.receiveShadow=true;if(c.material){[c.material].flat().forEach(m=>{if(m.isMeshStandardMaterial||m.isMeshPhysicalMaterial){m.emissive=new THREE.Color(0);m.emissiveIntensity=0;m.envMapIntensity=.6;}});}}});model.name=key;caseGroup.add(model);componentGroups[key]=model;if(selectedPart===key)_setGroupStyle(model,'real');if(opt.colorOverride){model.traverse(c=>{if(c.material?.color)c.material.color.set(opt.colorOverride);});}},undefined,()=>{}/*silent fail*/);
  }catch(e){}
}
function _updateFanColors(opt){
  for(const fan of allFanMeshes){if(!fan.material?.emissive)continue;if(opt.emissive==='rainbow'){fan.userData={rainbow:true};}else{fan.userData={rainbow:false};fan.material.emissive.set(opt.emissive);}}
  for(const obj of emissiveObjects){if(!obj.material?.emissive||obj.name==='fan-blade')continue;if(opt.emissive==='rainbow'){obj.userData={rainbow:true};}else{obj.userData={rainbow:false};obj.material.emissive.set(opt.emissive);}}
}
function _loadAllGLBs(){for(const[cat,id]of Object.entries(currentPicks)){if(cat==='case'||cat==='fan')continue;const opt=PART_OPTIONS[cat]?.find(o=>o.id===id);const slot=compSlots[cat];if(opt?.glb&&slot)_tryLoadGLB(opt.glb,cat,slot,opt);}}

// ===================== 交互事件 =====================
function _onPointerMove(e){if(!renderer||!raycaster||!mouse)return;const r=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(caseGroup.children,true);if(hits.length>0){const part=_findPart(hits[0].object);if(part&&componentGroups[part]){hoveredPart=part;renderer.domElement.style.cursor='pointer';return;}}hoveredPart=null;renderer.domElement.style.cursor='grab';}
function _onDblClick(e){if(!renderer||!raycaster||!mouse)return;const r=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(caseGroup.children,true);if(hits.length>0){const part=_findPart(hits[0].object);if(part&&componentGroups[part]){_focusOnObject(part);return;}}if(selectedPart)_resetView();}
function _onClick(e){if(!selectedPart||!renderer||!raycaster||!mouse)return;const r=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(caseGroup.children,true);if(hits.length===0||!_findPart(hits[0].object))_resetView();}
function _findPart(obj){let c=obj;while(c){if(c.name&&componentGroups[c.name])return c.name;if(c.name?.startsWith('case-frame')||c.name?.startsWith('case-glass'))return'case';c=c.parent;}return null;}

// ===================== 聚焦系统 =====================
function _focusOnObject(key){let grpKey=key;if(key==='fan'&&componentGroups['fan-front-0'])grpKey='fan-front-0';const group=componentGroups[grpKey];if(!group)return;for(const[k,g]of Object.entries(componentGroups)){const match=(k===grpKey||(key==='fan'&&k.startsWith('fan-')));_setGroupStyle(g,match?'real':'deep-ghost');}selectedPart=key;_updateLabels();const bb=new THREE.Box3().setFromObject(group);const center=new THREE.Vector3();bb.getCenter(center);const sT=controls.target.clone(),sC=camera.position.clone();const dir=sC.clone().sub(sT).normalize();const eT=center.clone(),eC=center.clone().add(dir.multiplyScalar(4));const t0=performance.now();function anim(now){const t=Math.min((now-t0)/600,1),e=1-Math.pow(1-t,3);controls.target.lerpVectors(sT,eT,e);camera.position.lerpVectors(sC,eC,e);controls.update();if(t<1)requestAnimationFrame(anim);}requestAnimationFrame(anim);const lookupKey=(key.startsWith('fan-')||key==='fan')?'fan':key;if(pcComponents[lookupKey])_showDetail(lookupKey);else _showGeneric(key);document.getElementById('btnResetView')?.classList.add('visible');}
function _resetView(){for(const g of Object.values(componentGroups))_setGroupStyle(g,'ghost');selectedPart=null;_updateLabels();const sT=controls.target.clone(),sC=camera.position.clone();const t0=performance.now();function a(now){const t=Math.min((now-t0)/600,1),e=1-Math.pow(1-t,3);controls.target.lerpVectors(sT,defaultTarget,e);camera.position.lerpVectors(sC,defaultCamPos,e);if(t<1)requestAnimationFrame(a);}requestAnimationFrame(a);document.getElementById('btnResetView')?.classList.remove('visible');}
function _setGroupStyle(group,mode){if(!group)return;group.traverse(c=>{if(!c.material?.isMeshStandardMaterial)return;if(c.name?.includes('fan-blade')||c.name?.includes('led'))return;if(mode==='ghost'){c.material.transparent=true;c.material.opacity=.45;c.material.emissiveIntensity=0;c.material.roughness=.5;c.material.metalness=.15;}else if(mode==='deep-ghost'){c.material.transparent=true;c.material.opacity=.1;c.material.emissiveIntensity=0;c.material.roughness=.7;c.material.metalness=.05;}else{c.material.transparent=false;c.material.opacity=1;c.material.emissive?.set(0xffffff);c.material.emissiveIntensity=.25;c.material.roughness=.1;c.material.metalness=.8;c.material.color.set(0xeeeeee);}});}

// ===================== 标签 + 键盘 =====================
function _createLabels(){const ct=document.getElementById('compLabels');if(!ct)return;const names={cpu:'CPU',gpu:'显卡',motherboard:'主板',ram:'内存',storage:'硬盘',psu:'电源',cooler:'散热',case:'机箱','fan-front-0':'风扇1','fan-front-1':'风扇2','fan-front-2':'风扇3','fan-rear':'后排风'};ct.innerHTML='';for(const[k,n]of Object.entries(names)){const el=document.createElement('div');el.className='comp-label';el.innerHTML=`<span class="comp-label-dot"></span><span class="comp-label-text">${n}</span>`;el.addEventListener('click',()=>{if(componentGroups[k])_focusOnObject(k);});ct.appendChild(el);labelEls[k]=el;}}
function _updateLabels(){if(!camera)return;const rect=renderer.domElement.getBoundingClientRect();for(const[k,el]of Object.entries(labelEls)){const p=compWorldPos[k];if(!p){el.style.display='none';continue;}const wp=p.clone();caseGroup.localToWorld(wp);const sp=wp.project(camera);const x=(sp.x*.5+.5)*rect.width,y=(-sp.y*.5+.5)*rect.height;el.style.opacity=(sp.z>1||x<-40||x>rect.width+40||y<-40||y>rect.height+40)?'0':(selectedPart===k?'1':'.5');el.style.left=x+'px';el.style.top=y+'px';el.classList.toggle('selected',selectedPart===k);}}
function _setupKeybinds(){window.addEventListener('keydown',e=>{if(e.key==='c'||e.key==='C'){colorTheme=(colorTheme+1)%colorThemes.length;_rebuildCase();}if(e.key==='g'||e.key==='G'){glassOpacity=glassOpacity>=.35?.1:glassOpacity+.08;_rebuildCase();}});renderer.domElement.addEventListener('contextmenu',e=>{e.preventDefault();glassOpacity=glassOpacity>=.35?.1:glassOpacity+.08;_rebuildCase();});}
function _rebuildCase(){while(caseGroup.children.length>0)caseGroup.remove(caseGroup.children[0]);allFanMeshes.length=0;emissiveObjects.length=0;for(const k of Object.keys(componentGroups))delete componentGroups[k];for(const k of Object.keys(compWorldPos))delete compWorldPos[k];_buildCase();_buildAllComponents();_createLabels();if(selectedPart&&componentGroups[selectedPart])_setGroupStyle(componentGroups[selectedPart],'real');}

// ===================== 详情面板 =====================
function _showDetail(key){activeComponentKey=key;currentTab='intro';const comp=pcComponents[key],pan=document.getElementById('detailPanel'),ph=document.getElementById('panelPlaceholder');if(ph)ph.style.display='none';pan.innerHTML=_buildDetailHTML(comp,key);_renderTabContent();}
function _showGeneric(key){const info={case:{icon:'🖥️',name:'机箱外壳',desc:'海景房全景机箱。'},'fan-front-0':{icon:'🌀',name:'前置RGB风扇#1',desc:'进风扇。'},'fan-front-1':{icon:'🌀',name:'前置RGB风扇#2',desc:'进风扇。'},'fan-front-2':{icon:'🌀',name:'前置RGB风扇#3',desc:'进风扇。'},'fan-rear':{icon:'🌀',name:'后置排风扇',desc:'排风扇。'}};const item=info[key]||{icon:'🔧',name:key,desc:'硬件部件'};activeComponentKey=key;const pan=document.getElementById('detailPanel'),ph=document.getElementById('panelPlaceholder');if(ph)ph.style.display='none';pan.innerHTML=`<div class="detail-content"><div class="detail-header"><span class="part-icon-big">${item.icon}</span><h2>${item.name}</h2></div><div class="detail-intro"><p>${item.desc}</p></div></div>`;}
function _buildDetailHTML(comp,key){return`<div class="detail-content"><div class="detail-header"><span class="part-icon-big">${comp.icon}</span><h2>${comp.name}</h2></div><div class="detail-tabs"><button class="detail-tab active" id="tabIntro" onclick="window.switchTab('intro')">📖 介绍</button><button class="detail-tab" id="tabBuy" onclick="window.switchTab('buy')">🛒 在售</button></div><div id="tabContent"></div></div>`;}
function switchTab(tab){currentTab=tab;document.getElementById('tabIntro')?.classList.toggle('active',tab==='intro');document.getElementById('tabBuy')?.classList.toggle('active',tab==='buy');_renderTabContent();}window.switchTab=switchTab;
function _renderTabContent(){const comp=pcComponents[activeComponentKey],c=document.getElementById('tabContent');if(!c)return;const chosen=selectedBuild[activeComponentKey]||null;if(currentTab==='intro'){c.innerHTML=`<div class="detail-tab-content"><div class="detail-intro"><p>${comp.description}</p></div>${(comp.knowledge||[]).map(k=>`<div class="knowledge-card"><div class="kc-title">${k.title}</div><div class="kc-text">${k.text}</div>${k.example?`<div class="kc-example">${k.example}</div>`:''}</div>`).join('')}${comp.specs?`<div class="knowledge-card"><div class="kc-title">📋 关键参数</div><table class="spec-table">${comp.specs.map(s=>`<tr><th>${s[0]}</th><td>${s[1]}</td></tr>`).join('')}</table></div>`:''}</div>`;}else{c.innerHTML=`<div class="detail-tab-content"><div class="options-title">🏪 市售热门型号</div>${comp.options.map(opt=>{const is=chosen===opt.name;return`<div class="option-card${is?' chosen':''}" onclick="window.pickOption('${activeComponentKey}','${_escape(opt.name)}')">${is?'<span class="choose-badge">✓ 已选</span>':''}<div class="opt-icon-placeholder">${comp.icon}</div><div class="option-info"><h4>${opt.name}</h4><div class="option-specs">${opt.specs}</div><span class="option-tier">${opt.tier}</span><div class="buy-links"><a href="https://search.jd.com/Search?keyword=${encodeURIComponent(opt.name)}&enc=utf-8" target="_blank" class="buy-link jd" onclick="event.stopPropagation()">🔴京东</a><a href="https://s.taobao.com/search?q=${encodeURIComponent(opt.name)}" target="_blank" class="buy-link tb" onclick="event.stopPropagation()">🟠淘宝</a><a href="https://mobile.yangkeduo.com/search_result.html?search_key=${encodeURIComponent(opt.name)}" target="_blank" class="buy-link pdd" onclick="event.stopPropagation()">🔵拼多多</a></div></div><div class="option-price">¥${opt.price.toLocaleString()}</div></div>`}).join('')}</div>`;}}
function pickOption(key,name){if(selectedBuild[key]===name)delete selectedBuild[key];else selectedBuild[key]=name;if(key==='fan'){const fanOpt=PART_OPTIONS['fan']?.find(o=>o.name===name);if(fanOpt)_updateFanColors(fanOpt);}if(selectedBuild[key])_focusOnObject(key);_renderSummary();_renderTabContent();_updateLabels();}window.pickOption=pickOption;
function _escape(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}

// ===================== 底部总览+跑分 =====================
function _renderSummary(){const sp=document.getElementById('summaryParts'),st=document.getElementById('summaryTotal'),nt=document.getElementById('navTotal'),bs=document.getElementById('btnScore');let total=0,cnt=0;sp.innerHTML=componentOrder.map(key=>{const comp=pcComponents[key];if(selectedBuild[key]){const opt=comp.options.find(o=>o.name===selectedBuild[key]);total+=opt?opt.price:0;cnt++;return`<span class="summary-part filled">${comp.icon} ${_short(key,selectedBuild[key])}</span>`;}return`<span class="summary-part empty">${comp.icon} 未选</span>`;}).join('');_animPrice(st,prevTotalPrice,total);_animPrice(nt,prevTotalPrice,total);prevTotalPrice=total;const shareBtn=document.getElementById('btnShare');bs.disabled=cnt<8;bs.textContent=cnt===8?'📊 查看鲁大师跑分！':`📊 鲁大师预估跑分（已选${cnt}/8）`;bs.classList.toggle('ready',cnt===8);bs.onclick=_showScore;if(shareBtn){shareBtn.style.display=cnt>=9?'inline-flex':'none';shareBtn.onclick=_openShareModal;}_runCompatCheck();}

function _runCompatCheck() {
  const parts = {};
  for (const [key, name] of Object.entries(selectedBuild)) {
    const comp = pcComponents[key];
    if (!comp) continue;
    const option = comp.options.find(o => o.name === name);
    if (option) parts[key] = option;
  }

  const report = compatEngine.checkAll(parts);
  _updateCompatIndicator(report);
  return report;
}

function _updateCompatIndicator(report) {
  const indicator = document.getElementById('compatIndicator');
  const dot = document.getElementById('compatDot');
  const text = document.getElementById('compatText');
  const btnShare = document.getElementById('btnShare');

  if (!indicator || !dot || !text) return;

  const { summary } = report;
  const partCount = Object.keys(selectedBuild).filter(k => selectedBuild[k]).length;

  if (partCount < 2) {
    indicator.style.display = 'none';
    return;
  }

  indicator.style.display = 'flex';
  if (summary.status === 'compatible') {
    dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#66ff99;box-shadow:0 0 8px rgba(102,255,153,0.4);';
    text.textContent = '全部兼容';
    text.style.color = '#66ff99';
  } else if (summary.status === 'warning') {
    dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#ffcc66;box-shadow:0 0 8px rgba(255,204,102,0.4);';
    text.textContent = `${summary.warns} 个注意项`;
    text.style.color = '#ffcc66';
  } else {
    dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#ff6666;box-shadow:0 0 8px rgba(255,102,102,0.4);animation:pulse-red 2s infinite;';
    text.textContent = `${summary.blocks} 个冲突`;
    text.style.color = '#ff6666';
  }

  if (btnShare) {
    btnShare.style.opacity = summary.isReady ? '1' : '0.5';
    btnShare.style.pointerEvents = summary.isReady ? 'auto' : 'none';
  }
}

const compatStyle = document.createElement('style');
compatStyle.textContent = '@keyframes pulse-red { 0%,100%{box-shadow:0 0 8px rgba(255,102,102,0.4)} 50%{box-shadow:0 0 18px rgba(255,102,102,0.8)} }';
document.head.appendChild(compatStyle);

function _animPrice(el,from,to){if(from===to){el.textContent='¥'+to.toLocaleString();return;}const t0=performance.now();function s(n){const t=Math.min((n-t0)/400,1);el.textContent='¥'+Math.round(from+(to-from)*(1-Math.pow(1-t,3))).toLocaleString();if(t<1)requestAnimationFrame(s);}requestAnimationFrame(s);}
function _showScore(){const sc=estimateLudashiScore(selectedBuild),m=document.getElementById('scoreModal');document.getElementById('scoreLevel').textContent=sc.level;document.getElementById('scoreComment').textContent=sc.comment;document.getElementById('scoreBreakdown').innerHTML=`<div class="score-bar-row"><span class="bar-label">处理器</span><div class="bar-track"><div class="bar-fill" id="barCpu" style="background:var(--text);"></div></div><span id="txtCpu">0万</span></div><div class="score-bar-row"><span class="bar-label">显卡</span><div class="bar-track"><div class="bar-fill" id="barGpu" style="background:var(--accent-dim);"></div></div><span id="txtGpu">0万</span></div><div class="score-bar-row"><span class="bar-label">内存</span><div class="bar-track"><div class="bar-fill" id="barRam" style="background:var(--text-muted);"></div></div><span id="txtRam">0万</span></div><div class="score-bar-row"><span class="bar-label">硬盘</span><div class="bar-track"><div class="bar-fill" id="barDisk" style="background:var(--text);"></div></div><span id="txtDisk">0万</span></div><div class="score-bar-row"><span class="bar-label">其他</span><div class="bar-track"><div class="bar-fill" id="barOther" style="background:var(--accent-dim);"></div></div><span id="txtOther">0万</span></div>`;m.style.display='flex';requestAnimationFrame(()=>{_an('scoreNum',0,sc.totalWan,1200);_ab('barCpu','txtCpu',sc.cpuWan,400);_ab('barGpu','txtGpu',sc.gpuWan,550);_ab('barRam','txtRam',sc.ramWan,700);_ab('barDisk','txtDisk',sc.diskWan,850);_ab('barOther','txtOther',sc.otherWan,1000);});}
function _an(id,f,t,d){const el=document.getElementById(id);if(!el)return;const s=performance.now();function step(n){const p=Math.min((n-s)/d,1);el.textContent=Math.round(f+(t-f)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
function _ab(bid,tid,v,del){setTimeout(()=>{const b=document.getElementById(bid),t=document.getElementById(tid);if(b)b.style.width=Math.min(v/2,100)+'%';if(t){const s=performance.now();function step(n){const p=Math.min((n-s)/600,1);t.textContent=Math.round(v*(1-Math.pow(1-p,3)))+'万';if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}},del);}
document.getElementById('scoreModal')?.addEventListener('click',function(e){if(e.target===this)this.style.display='none';});
document.getElementById('shareModal')?.addEventListener('click',function(e){if(e.target===this)this.style.display='none';});

// ===================== 配置单分享 =====================
function _openShareModal(){
  const id=Math.random().toString(36).substring(2,8).toUpperCase();
  _generateShareCard(id);
  _saveConfigV2(id);
  _renderSavedConfigs();
  document.getElementById('shareModal').style.display='flex';
}

function _generateShareCard(id){
  const canvas=document.getElementById('shareCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=800,H=600;

  // 背景
  ctx.fillStyle='#0d0d0d';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#2a2a2a';ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(10,10,W-20,H-20,12);ctx.stroke();

  // 标题
  ctx.fillStyle='#f0f0f0';ctx.font='bold 28px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign='center';ctx.fillText('🖥 装机大师 · 配置单',W/2,56);

  // 分割线
  ctx.strokeStyle='#2a2a2a';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(60,72);ctx.lineTo(W-60,72);ctx.stroke();

  // 计算总价和跑分
  let total=0;
  for(const key of componentOrder){
    if(selectedBuild[key]){
      const opt=pcComponents[key].options.find(o=>o.name===selectedBuild[key]);
      if(opt)total+=opt.price;
    }
  }
  const score=estimateLudashiScore(selectedBuild);

  // 配件网格 3列×3行
  const cols=3,startX=50,startY=95,cellW=230,cellH=130,gapX=10,gapY=8;
  const cats=componentOrder.slice(0,9);
  for(let i=0;i<cats.length;i++){
    const key=cats[i],col=i%cols,row=Math.floor(i/cols);
    const x=startX+col*(cellW+gapX),y=startY+row*(cellH+gapY);
    const name=selectedBuild[key];

    // 卡片背景
    ctx.fillStyle='#161616';ctx.strokeStyle='#2a2a2a';ctx.lineWidth=1;
    ctx.beginPath();ctx.roundRect(x,y,cellW,cellH,8);ctx.fill();ctx.stroke();

    // 图标
    const comp=pcComponents[key];
    ctx.fillStyle='#f0f0f0';ctx.font='22px sans-serif';ctx.textAlign='left';
    ctx.fillText(comp?.icon||'🔧',x+12,y+28);

    // 品类名
    ctx.fillStyle='#888888';ctx.font='12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(comp?.shortName||key,x+44,y+26);

    // 型号（截断）
    ctx.fillStyle='#f0f0f0';ctx.font='bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    const shortName=name?name.replace(/NVIDIA |AMD |Intel |利民 |九州风神 |酷冷至尊 |追风者 |联力 |恩杰 |猫头鹰 |ARCTIC /g,'').substring(0,16)+(name.length>16?'…':''):'未选';
    ctx.fillText(shortName,x+12,y+56);

    // 价格
    if(name){
      const opt=comp?.options?.find(o=>o.name===name);
      if(opt){
        ctx.fillStyle='#f0f0f0';ctx.font='bold 16px sans-serif';ctx.textAlign='right';
        ctx.fillText('¥'+opt.price.toLocaleString(),x+cellW-12,y+28);
      }
    }
  }

  // 底部信息
  const bottomY=startY+3*(cellH+gapY)+30;
  ctx.fillStyle='#f0f0f0';ctx.font='bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign='center';
  ctx.fillText(`总计：¥${total.toLocaleString()}  |  鲁大师 ${score.totalWan}万分  |  ${score.level}`,W/2,bottomY);

  ctx.fillStyle='#888888';ctx.font='12px "PingFang SC","Microsoft YaHei",sans-serif';
  const today=new Date().toLocaleDateString('zh-CN');
  ctx.fillText(`生成日期：${today}  |  配置编号：${id}`,W/2,bottomY+26);

  // 水印
  ctx.fillStyle='rgba(255,255,255,0.03)';ctx.font='11px sans-serif';ctx.textAlign='right';
  ctx.fillText('miao0-o.github.io/pc-builder',W-40,H-20);
}

async function _saveConfigV2(id) {
  const partsSnapshot = {};
  for (const key of componentOrder) {
    if (selectedBuild[key]) {
      const comp = pcComponents[key];
      const option = comp.options.find(o => o.name === selectedBuild[key]);
      if (option) {
        partsSnapshot[key] = {
          name: option.name,
          price: option.price,
          specs: option.specs,
          icon: comp.icon,
          structuredSpecs: option.structuredSpecs || null,
        };
      }
    }
  }

  const { total } = PriceCalc.getTotal(selectedBuild);
  const benchmark = estimateLudashiScore(selectedBuild);
  const platform = selectedBuild.cpu?.includes('AMD') || selectedBuild.cpu?.includes('锐龙') ? 'amd' : 'intel';

  try {
    const result = await saveConfig({
      name: '我的配置 ' + id,
      partsSnapshot,
      totalPrice: total,
      benchmark: { totalWan: benchmark.totalWan, level: benchmark.level, comment: benchmark.comment },
      platform,
      isPublic: false,
    });
    showToast('配置已保存' + (result.share_code ? '，分享码: ' + result.share_code : ''), 'success');
  } catch (err) {
    showError(err);
  }
}

function _renderSavedConfigs(){
  const el=document.getElementById('savedConfigsList');
  if(!el)return;
  let saved=[];
  try{saved=JSON.parse(localStorage.getItem('pcBuilder_savedConfigs')||'[]');}catch(e){}
  if(saved.length===0){el.innerHTML='<div style="color:var(--text-muted);text-align:center;padding:16px;">暂无保存的配置</div>';return;}
  el.innerHTML=saved.map(s=>`<div class="saved-config-mini">
    <span class="scm-date">${new Date(s.createdAt).toLocaleDateString('zh-CN')}</span>
    <span class="scm-total">¥${s.totalPrice.toLocaleString()}</span>
    <span class="scm-score">${s.score.totalWan}万分 ${s.score.level}</span>
    <span class="scm-id">#${s.id}</span>
  </div>`).join('');
}

document.getElementById('btnDownload')?.addEventListener('click',()=>{
  const canvas=document.getElementById('shareCanvas');
  if(!canvas)return;
  canvas.toBlob(blob=>{
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='装机配置单.png';
    a.click();URL.revokeObjectURL(url);
  },'image/png');
});

document.getElementById('btnCopyLink')?.addEventListener('click',async()=>{
  const saved=[];
  try{saved=JSON.parse(localStorage.getItem('pcBuilder_savedConfigs')||'[]');}catch(e){}
  if(saved.length===0){alert('请先生成配置单');return;}
  const id=saved[0].id;
  const url=window.location.origin+window.location.pathname+'#config/'+id;
  try{await navigator.clipboard.writeText(url);alert('✅ 链接已复制！\n'+url);}catch(e){prompt('复制此链接分享：',url);}
});

// ===================== 渲染循环 =====================
function _animate(){requestAnimationFrame(_animate);controls.update();_updateLabels();const t=performance.now()*.001;caseGroup.traverse(c=>{if(c.name==='fan-blade'){c.rotation.z+=(c.parent?.userData?.rotSpeed||1)*.03;}});const ring=scene.getObjectByName('glowRing');if(ring)ring.material.opacity=.35+Math.sin(t*1.5)*.2;emissiveObjects.forEach((o,i)=>{if(!o.material?.emissive)return;if(o.userData?.rainbow){o.material.emissive.setHSL((t*.12+i*.25)%1,.85,.55);}});renderer.render(scene,camera);}
function _onResize(){const c=document.getElementById('case3D');if(!c)return;camera.aspect=c.clientWidth/c.clientHeight;camera.updateProjectionMatrix();renderer.setSize(c.clientWidth,c.clientHeight);}

// ===================== 工具 =====================
function _dispose(g){g.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material){[c.material].flat().forEach(m=>{Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});m.dispose();});}});}
function _short(k,f){const o=pcComponents[k].options.find(o=>o.name===f);if(!o)return f;const p=f.split(' ');return p.length>=3?p.slice(0,3).join(' '):f.slice(0,16)+'...';}
function _loadPreselected(){try{const d=localStorage.getItem('pcBuilderPreselect');if(d){const cfg=JSON.parse(d);for(const[k,n]of Object.entries(cfg)){if(pcComponents[k]){selectedBuild[k]=n;if(componentGroups[k]){_focusOnObject(k);break;}}}localStorage.removeItem('pcBuilderPreselect');_renderSummary();return;}if(window.location.hash){const m=window.location.hash.match(/^#config\/([A-Z0-9]{6})$/);if(m){const sd=localStorage.getItem('pcBuilder_sharedConfig_'+m[1]);if(sd){const sc=JSON.parse(sd);for(const[k,n]of Object.entries(sc.config)){if(pcComponents[k])selectedBuild[k]=n;}_renderSummary();}}}}catch(e){}}
function initServicePage(){document.querySelectorAll('.service-card').forEach((c,i)=>{c.style.animationDelay=`${.2+i*.12}s`;});}

if(document.getElementById('case3D')){initParticles();init3DScene();_renderSummary();_loadPreselected();}
else if(document.querySelector('.service-card')){initParticles();initServicePage();}
