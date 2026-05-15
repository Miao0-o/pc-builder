// ============================================================
// 装机大师 - 旧机在线估价 (极简黑白风 · 电脑专用)
// ============================================================
const STORAGE_KEY = 'pcBuilder_tradeinDiscount';

// ======== 笔记本估价数据 ========
const LAPTOP_DATA = {
  'Apple': {
    models: {
      'MacBook Pro 16"':    { tiers:{ 'M4 Max':7500,'M4 Pro':6000,'M3 Max':5200,'M3 Pro':4200,'M2 Max':3800,'M1 Max':2800 } },
      'MacBook Pro 14"':    { tiers:{ 'M4 Pro':5000,'M4':4000,'M3 Pro':3800,'M3':3000,'M2 Pro':2800,'M2':2200,'M1 Pro':2000 } },
      'MacBook Air 15"':    { tiers:{ 'M4':3200,'M3':2500,'M2':1800 } },
      'MacBook Air 13"':    { tiers:{ 'M4':2600,'M3':2000,'M2':1400,'M1':900 } },
    }
  },
  'Lenovo': {
    models: {
      'ThinkPad X1 Carbon':  { tiers:{ 'Ultra 9':3500,'Ultra 7':2800,'i7-13代':2000,'i7-12代':1500,'i5-13代':1600 } },
      'ThinkPad T14/T16':    { tiers:{ 'Ultra 7':2200,'i7-13代':1700,'i5-13代':1300,'i7-12代':1200,'i5-12代':900 } },
      '小新 Pro 16':          { tiers:{ 'Ultra 9+4060':3200,'Ultra 7':2000,'Ultra 5':1600,'R7-7840HS':1400,'i5-13500H':1100 } },
      '小新 Pro 14':          { tiers:{ 'Ultra 7':1800,'Ultra 5':1400,'R7-7840HS':1200,'i5-13500H':1000 } },
      '拯救者 Y9000P':        { tiers:{ 'i9-14900HX+4060':4200,'i9+4070':5000,'i7+4060':3500,'i7-13650HX+4060':2800,'R9+4060':3200 } },
      '拯救者 Y7000P':        { tiers:{ 'i7-14650HX+4060':3000,'i7-13650HX+4060':2500,'i5-13500H+4050':2000 } },
      'ThinkBook 14+':        { tiers:{ 'Ultra 7':2000,'Ultra 5':1600,'R7-7840H':1400,'i5-13500H':1100 } },
    }
  },
  'Dell': {
    models: {
      'XPS 16':       { tiers:{ 'Ultra 9+4070':5000,'Ultra 7+4060':3800,'Ultra 7':3200 } },
      'XPS 14':       { tiers:{ 'Ultra 7':3000,'Ultra 5':2300 } },
      '灵越 16 Plus': { tiers:{ 'Ultra 7+4060':3000,'Ultra 5':1800,'i7-13700H':1600,'i5-13500H':1200 } },
      '灵越 14 Plus': { tiers:{ 'Ultra 7':1800,'Ultra 5':1400,'i7-1360P':1300,'i5-1340P':1000 } },
    }
  },
  'HP': {
    models: {
      '暗影精灵 10':  { tiers:{ 'i9+4080':4800,'i9+4070':4000,'i7+4070':3500,'i7+4060':3000,'i5+4050':2000 } },
      '战99':        { tiers:{ 'Ultra 9+4060':3200,'Ultra 7':2200,'i7+4050':1800,'i5':1400 } },
      '战66':        { tiers:{ 'Ultra 7':1500,'Ultra 5':1200,'R7-7730U':1100,'R5-7530U':800 } },
      '星Book Pro 16':{ tiers:{ 'Ultra 7+4060':2800,'Ultra 5':1600,'i7-13700H':1500 } },
    }
  },
  'ASUS': {
    models: {
      'ROG 枪神 8':   { tiers:{ 'i9+4080':5500,'i9+4070':4500,'i9+4060':3500 } },
      'ROG 魔霸':     { tiers:{ 'R9+4070':4000,'R9+4060':3200,'R7+4060':2600 } },
      '天选 5 Pro':   { tiers:{ 'i9+4070':3500,'i9+4060':2800,'R9+4060':2500,'i7+4060':2200 } },
      '无畏 Pro 15':  { tiers:{ 'Ultra 9+4060':2600,'Ultra 7':1800,'Ultra 5':1400 } },
      '灵耀 14':      { tiers:{ 'Ultra 9':2200,'Ultra 7':1700,'Ultra 5':1300 } },
    }
  },
  'Huawei': {
    models: {
      'MateBook X Pro': { tiers:{ 'Ultra 9':3500,'Ultra 7':2800,'i7-1360P':1800,'i7-1260P':1400 } },
      'MateBook 16s':   { tiers:{ 'i9-13900H':2200,'i7-13700H':1700,'i5-13500H':1200 } },
      'MateBook 14':    { tiers:{ 'Ultra 7':1800,'Ultra 5':1400,'i7-1360P':1300,'i5':900 } },
      'MateBook D 16':  { tiers:{ 'i7-13700H':1400,'i5-13500H':1000,'i5-12450H':700 } },
    }
  },
  'Honor': {
    models: {
      'MagicBook Pro 16': { tiers:{ 'Ultra 7+4060':2500,'Ultra 5':1500,'i7-13700H':1300 } },
      'MagicBook 14':     { tiers:{ 'Ultra 5':1200,'i5-13500H':900,'R7-7840HS':1000 } },
      'MagicBook X 14':   { tiers:{ 'i5-12450H':600,'i3':400 } },
    }
  },
  'Acer': {
    models: {
      '掠夺者·擎 Neo': { tiers:{ 'i9+4070':3200,'i9+4060':2600,'i7+4060':2200,'i5+4050':1700 } },
      '暗影骑士·龙':   { tiers:{ 'R9+4060':2400,'R7+4060':2000,'R5+4050':1400 } },
      '非凡 Go':       { tiers:{ 'Ultra 7':1700,'Ultra 5':1300,'i7-13700H':1200,'i5-13500H':900 } },
    }
  },
  'Microsoft': {
    models: {
      'Surface Laptop 6': { tiers:{ 'Ultra 7':2800,'Ultra 5':2100 } },
      'Surface Laptop 5': { tiers:{ 'i7-1265U':1500,'i5-1245U':1000 } },
      'Surface Pro 10':   { tiers:{ 'Ultra 7':2800,'Ultra 5':2000 } },
      'Surface Pro 9':    { tiers:{ 'i7-1265U':1500,'i5-1245U':1100 } },
    }
  },
  'Xiaomi': {
    models: {
      'RedmiBook Pro 16': { tiers:{ 'Ultra 7':1700,'Ultra 5':1300,'i7-13700H':1200 } },
      'RedmiBook Pro 14': { tiers:{ 'Ultra 5':1200,'i5-13500H':900,'i5-12450H':600 } },
      'Xiaomi Book Pro':  { tiers:{ 'Ultra 7':2000,'Ultra 5':1600 } },
    }
  },
};

// ======== 台式机逐配件估价 ========
// 复用 pcComponents 中的配件数据（最低价格作为基准）
function getDesktopParts() {
  if (typeof pcComponents === 'undefined') return [];
  const keys = ['cpu','gpu','motherboard','ram','storage','psu','case','cooler'];
  const icons = { cpu:'cpu', gpu:'gamepad-2', motherboard:'layout-template', ram:'memory-stick', storage:'hard-drive', psu:'plug-zap', case:'monitor', cooler:'fan' };
  return keys.map(key => {
    const comp = pcComponents[key];
    if (!comp) return null;
    return {
      key, icon: icons[key] || '🔧', name: comp.shortName || comp.name,
      options: comp.options.map(o => ({ name: o.name, price: o.price }))
    };
  }).filter(Boolean);
}

// 成色系数
const DEPRECIATION = [
  { id:'like-new', label:'几乎全新', desc:'仅拆封/使用少于3个月', factor:0.85 },
  { id:'good',     label:'良好',     desc:'正常使用痕迹，1-2年', factor:0.65 },
  { id:'fair',     label:'一般',     desc:'明显使用痕迹，2-4年', factor:0.45 },
  { id:'old',      label:'老旧',     desc:'严重磨损，4年以上', factor:0.25 },
];

// ======== 状态 ========
let state = {
  deviceType: null,
  // 笔记本
  laptopBrand: null, laptopModel: null, laptopTier: null,
  // 台式机
  desktopParts: {}, // { cpu: {name, price, condition}, gpu: {...}, ... }
  // 通用
  overallCondition: null,
  functionalPassed: {},
};

function initTradeinPage() {
  buildDeviceTypeOptions();
  buildConditionOptions();
  buildFunctionalOptions();
  bindEvents();
  loadExistingDiscount();
}

function buildDeviceTypeOptions() {
  document.getElementById('deviceTypeGroup').innerHTML = `
    <button class="til-opt" data-type="desktop" onclick="selectDeviceType('desktop')">🖥️ 台式机</button>
    <button class="til-opt" data-type="laptop" onclick="selectDeviceType('laptop')">💻 笔记本</button>
  `;
}

function buildConditionOptions() {
  document.getElementById('conditionGroup').innerHTML = DEPRECIATION.map(c =>
    `<button class="til-opt" data-cond="${c.id}" onclick="selectOverallCondition('${c.id}')">
      <div class="til-opt-title">${c.label}</div>
      <div class="til-opt-desc">${c.desc}</div>
    </button>`
  ).join('');
}

function buildFunctionalOptions() {
  document.getElementById('functionalGroup').innerHTML = `
    <label class="til-func-item" id="funcItem-normal">
      <input type="checkbox" onchange="toggleFunctional('normal', this.checked)"><span class="til-func-check"></span><span>可正常开机运行</span>
    </label>
    <label class="til-func-item" id="funcItem-screen">
      <input type="checkbox" onchange="toggleFunctional('screen', this.checked)"><span class="til-func-check"></span><span>屏幕/显示器正常</span>
    </label>
    <label class="til-func-item" id="funcItem-noise">
      <input type="checkbox" onchange="toggleFunctional('noise', this.checked)"><span class="til-func-check"></span><span>无异常噪音/过热</span>
    </label>
    <label class="til-func-item" id="funcItem-ports">
      <input type="checkbox" onchange="toggleFunctional('ports', this.checked)"><span class="til-func-check"></span><span>接口全部可用</span>
    </label>
  `;
}

function selectDeviceType(type) {
  state.deviceType = type;
  state.laptopBrand = state.laptopModel = state.laptopTier = null;
  state.desktopParts = {};
  state.overallCondition = null;
  state.functionalPassed = {};

  document.querySelectorAll('#deviceTypeGroup .til-opt').forEach(b =>
    b.classList.toggle('selected', b.dataset.type === type));

  document.getElementById('stepBrand').style.display = '';
  document.getElementById('stepCondition').style.display = 'none';
  document.getElementById('stepFunctional').style.display = 'none';
  resetConditionAndFunctional();

  if (type === 'laptop') buildLaptopStep();
  else buildDesktopStep();
  updatePrice();
}

// ======== 笔记本步骤 ========
function buildLaptopStep() {
  document.getElementById('stepBrand').querySelector('.til-step-title').textContent = '选择品牌 / 型号 / 配置';
  const brandSel = document.getElementById('brandSelect');
  const modelSel = document.getElementById('modelSelect');
  const storageSel = document.getElementById('storageSelect');
  brandSel.style.display = ''; modelSel.style.display = ''; storageSel.style.display = '';
  brandSel.innerHTML = '<option value="">选择品牌</option>' +
    Object.keys(LAPTOP_DATA).map(b => `<option value="${b}">${b}</option>`).join('');
  brandSel.disabled = false;
  document.getElementById('modelSelect').innerHTML = '<option value="">选择型号</option>';
  document.getElementById('modelSelect').disabled = true;
  document.getElementById('storageSelect').innerHTML = '<option value="">选择配置</option>';
  document.getElementById('storageSelect').disabled = true;
  // 移除台式机多余元素
  const extra = document.getElementById('storageSelect2');
  if (extra) extra.remove();
  const partsDiv = document.getElementById('desktopPartsArea');
  if (partsDiv) partsDiv.remove();
}

// ======== 台式机步骤：逐配件选择 ========
function buildDesktopStep() {
  document.getElementById('stepBrand').querySelector('.til-step-title').textContent = '选择配件并评估成色';
  // 隐藏原有下拉
  document.getElementById('brandSelect').style.display = 'none';
  document.getElementById('modelSelect').style.display = 'none';
  document.getElementById('storageSelect').style.display = 'none';
  document.getElementById('brandSelect').disabled = true;
  document.getElementById('modelSelect').disabled = true;
  document.getElementById('storageSelect').disabled = true;

  // 构建配件清单
  const parts = getDesktopParts();
  let html = '<div id="desktopPartsArea" class="til-parts-list">';
  parts.forEach(part => {
    const cheapest = part.options.reduce((a,b) => a.price < b.price ? a : b, part.options[0]);
    const prices = [...new Set(part.options.map(o => o.price))].sort((a,b) => a-b);
    html += `
      <div class="til-part-row" id="partRow-${part.key}">
        <label class="til-part-check">
          <input type="checkbox" data-key="${part.key}" onchange="toggleDesktopPart('${part.key}', this.checked)">
          <span class="til-part-checkmark"></span>
        </label>
        <span class="til-part-icon"><i data-lucide="${part.icon}" style="width:18px;height:18px;"></i></span>
        <div class="til-part-info">
          <div class="til-part-name">${part.name}</div>
          <div class="til-part-base">基准价 ￥${cheapest.price.toLocaleString()} 起</div>
        </div>
        <select class="til-select til-part-model" id="partModel-${part.key}" data-key="${part.key}" onchange="updateDesktopPartModel('${part.key}')" disabled style="flex:1;max-width:260px;">
          <option value="">型号</option>
          ${part.options.map(o => `<option value="${o.name}" data-price="${o.price}">${o.name}（￥${o.price}）</option>`).join('')}
        </select>
        <select class="til-select til-part-cond" id="partCond-${part.key}" data-key="${part.key}" onchange="updateDesktopPartCond('${part.key}')" disabled style="max-width:140px;">
          <option value="">整体成色</option>
          ${DEPRECIATION.map(d => `<option value="${d.id}">${d.label}（${(d.factor*100).toFixed(0)}%）</option>`).join('')}
        </select>
        <span class="til-part-est" id="partEst-${part.key}">-</span>
      </div>
    `;
  });
  html += '</div>';
  document.getElementById('stepBrand').querySelector('.til-step-content').insertAdjacentHTML('beforeend', html);
  if(typeof lucide!=='undefined')lucide.createIcons();
}

function toggleDesktopPart(key, checked) {
  const row = document.getElementById('partRow-'+key);
  const modelSel = document.getElementById('partModel-'+key);
  const condSel = document.getElementById('partCond-'+key);
  if (checked) {
    row.classList.add('active');
    modelSel.disabled = false;
    condSel.disabled = false;
  } else {
    row.classList.remove('active');
    modelSel.disabled = true;
    condSel.disabled = true;
    modelSel.value = '';
    condSel.value = '';
    delete state.desktopParts[key];
    document.getElementById('partEst-'+key).textContent = '-';
  }
  updatePrice();
}

function updateDesktopPartModel(key) {
  const sel = document.getElementById('partModel-'+key);
  const price = parseInt(sel.selectedOptions[0]?.dataset?.price || '0');
  const name = sel.value;
  if (!state.desktopParts[key]) state.desktopParts[key] = {};
  state.desktopParts[key].name = name;
  state.desktopParts[key].price = price;
  // 自动显示成色选择
  if (name) document.getElementById('partCond-'+key).style.display = '';
  updatePrice();
}

function updateDesktopPartCond(key) {
  const sel = document.getElementById('partCond-'+key);
  const factor = DEPRECIATION.find(d => d.id === sel.value)?.factor || 1;
  if (!state.desktopParts[key]) state.desktopParts[key] = {};
  state.desktopParts[key].condition = sel.value;
  state.desktopParts[key].factor = factor;
  updatePrice();
}

// ======== 笔记本事件 ========
function bindEvents() {
  document.getElementById('brandSelect').addEventListener('change', function() {
    if (state.deviceType === 'laptop') {
      state.laptopBrand = this.value;
      state.laptopModel = null; state.laptopTier = null;
      const modelData = LAPTOP_DATA[this.value];
      const modelSel = document.getElementById('modelSelect');
      modelSel.innerHTML = '<option value="">选择型号</option>' +
        (modelData ? Object.keys(modelData.models).map(m => `<option value="${m}">${m}</option>`).join('') : '');
      modelSel.disabled = !modelData;
      document.getElementById('storageSelect').innerHTML = '<option value="">选择配置</option>';
      document.getElementById('storageSelect').disabled = true;
      updatePrice();
    }
  });

  document.getElementById('modelSelect').addEventListener('change', function() {
    if (state.deviceType === 'laptop') {
      state.laptopModel = this.value;
      state.laptopTier = null;
      const modelData = LAPTOP_DATA[state.laptopBrand]?.models[this.value];
      const storageSel = document.getElementById('storageSelect');
      storageSel.innerHTML = '<option value="">选择配置</option>' +
        (modelData ? Object.keys(modelData.tiers).map(t => `<option value="${t}">${t}（¥${modelData.tiers[t]}）</option>`).join('') : '');
      storageSel.disabled = !modelData;
      updatePrice();
    }
  });

  document.getElementById('storageSelect').addEventListener('change', function() {
    if (state.deviceType === 'laptop') {
      state.laptopTier = this.value;
      document.getElementById('stepCondition').style.display = '';
      document.getElementById('stepFunctional').style.display = '';
      updatePrice();
    }
  });

  document.getElementById('btnRecycle').addEventListener('click', openRecycleModal);
  document.getElementById('btnApplyDiscount')?.addEventListener('click', applyDiscount);
  document.getElementById('btnConfirmRecycle')?.addEventListener('click', confirmRecycle);
  document.querySelectorAll('.til-modal-overlay').forEach(ov =>
    ov.addEventListener('click', function(e) { if(e.target===this) this.style.display='none'; }));
}

function selectOverallCondition(condId) {
  state.overallCondition = condId;
  document.querySelectorAll('#conditionGroup .til-opt').forEach(b =>
    b.classList.toggle('selected', b.dataset.cond === condId));
  if (state.deviceType === 'desktop') document.getElementById('stepFunctional').style.display = '';
  updatePrice();
}

function toggleFunctional(id, checked) {
  state.functionalPassed[id] = checked;
  const item = document.getElementById('funcItem-'+id);
  if (item) item.classList.toggle('checked', checked);
  updatePrice();
}

function resetConditionAndFunctional() {
  state.overallCondition = null;
  state.functionalPassed = {};
  document.querySelectorAll('#conditionGroup .til-opt').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.til-func-item').forEach(el => el.classList.remove('checked'));
  document.querySelectorAll('#functionalGroup input[type="checkbox"]').forEach(cb => cb.checked = false);
}

function updatePrice() {
  const priceNum = document.getElementById('priceNum');
  const btnRecycle = document.getElementById('btnRecycle');
  const priceDetail = document.getElementById('priceDetail');
  let price = 0;
  let detailHTML = '';

  if (state.deviceType === 'laptop') {
    if (!state.laptopTier) { priceNum.textContent = '0'; btnRecycle.disabled = true; priceDetail.innerHTML = ''; return; }
    price = LAPTOP_DATA[state.laptopBrand]?.models[state.laptopModel]?.tiers[state.laptopTier] || 0;
    detailHTML += `<div class="til-detail-row"><span>${state.laptopBrand} ${state.laptopModel}</span><span>￥${price.toLocaleString()}</span></div>`;

    if (state.overallCondition) {
      const cond = DEPRECIATION.find(c => c.id === state.overallCondition);
      if (cond) {
        const oldPrice = price;
        price = Math.round(price * cond.factor);
        detailHTML += `<div class="til-detail-row"><span>${cond.label}</span><span>×${(cond.factor*100).toFixed(0)}%  -¥${(oldPrice-price).toLocaleString()}</span></div>`;
      }
    }
  } else if (state.deviceType === 'desktop') {
    // 逐配件汇总
    const parts = getDesktopParts();
    let hasAny = false;
    parts.forEach(part => {
      const p = state.desktopParts[part.key];
      if (p && p.name && p.price > 0) {
        hasAny = true;
        let partPrice = p.price;
        const factor = p.factor || 1;
        partPrice = Math.round(partPrice * factor);
        price += partPrice;
        const modelEl = document.getElementById('partModel-'+part.key);
        const shortName = modelEl?.selectedOptions[0]?.text?.substring(0,20) || part.name;
        detailHTML += `<div class="til-detail-row"><span>${shortName}</span><span>￥${partPrice.toLocaleString()}</span></div>`;
        // 更新单配件估价显示
        const estEl = document.getElementById('partEst-'+part.key);
        if (estEl) estEl.textContent = '￥'+partPrice.toLocaleString();
      } else {
        const estEl = document.getElementById('partEst-'+part.key);
        if (estEl) estEl.textContent = '-';
      }
    });
    if (!hasAny) { priceNum.textContent = '0'; btnRecycle.disabled = true; priceDetail.innerHTML = ''; return; }
  }

  if (price === 0) { priceNum.textContent = '0'; btnRecycle.disabled = true; priceDetail.innerHTML = ''; return; }

  // 功能扣减
  const issues = [];
  if (!state.functionalPassed['normal']) { price = Math.round(price * 0.78); issues.push('无法开机 -22%'); }
  if (!state.functionalPassed['screen']) { price = Math.round(price * 0.88); issues.push('屏幕问题 -12%'); }
  if (!state.functionalPassed['noise'])  { price = Math.round(price * 0.85); issues.push('噪音/过热 -15%'); }
  if (!state.functionalPassed['ports'])  { price = Math.round(price * 0.94); issues.push('接口故障 -6%'); }
  issues.forEach(i => detailHTML += `<div class="til-detail-row penalty"><span>${i}</span></div>`);

  detailHTML += `<div class="til-detail-row total"><span>最终估价</span><span>￥${price.toLocaleString()}</span></div>`;
  priceDetail.innerHTML = detailHTML;
  priceNum.textContent = price.toLocaleString();
  btnRecycle.disabled = false;
  window._currentEstimate = price;
}

// ======== 弹窗逻辑 ========
function openRecycleModal() {
  if (!window._currentEstimate) return;
  let deviceDesc = '';
  if (state.deviceType === 'laptop') {
    deviceDesc = `${state.laptopBrand} ${state.laptopModel} ${state.laptopTier}`;
  } else {
    const selParts = Object.values(state.desktopParts).filter(p => p.name);
    deviceDesc = '台式机：' + selParts.map(p => p.name).join(' / ');
  }
  document.getElementById('rmDevice').textContent = deviceDesc;
  document.getElementById('rmPrice').textContent = window._currentEstimate.toLocaleString();
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('rmDate').setAttribute('min', today);
  document.getElementById('recycleModal').style.display = 'flex';
}

function confirmRecycle() {
  const name = document.getElementById('rmName').value.trim();
  const phone = document.getElementById('rmPhone').value.trim();
  const address = document.getElementById('rmAddress').value.trim();
  const date = document.getElementById('rmDate').value;
  const timeSlot = document.getElementById('rmTimeSlot').value;
  if (!name) { alert('请填写姓名'); return; }
  if (!phone || !/^1\d{10}$/.test(phone)) { alert('请填写正确的手机号码'); return; }
  if (!address) { alert('请填写取件地址'); return; }
  if (!date) { alert('请选择上门日期'); return; }
  if (!timeSlot) { alert('请选择上门时段'); return; }
  const order = {
    id: 'RC' + Date.now().toString(36).toUpperCase(),
    deviceType: state.deviceType, estimate: window._currentEstimate,
    name, phone, address, date, timeSlot,
    status: '已预约', createdAt: new Date().toISOString()
  };
  let orders = [];
  try { orders = JSON.parse(localStorage.getItem('pcBuilder_recycleOrders') || '[]'); } catch(e) {}
  orders.unshift(order);
  localStorage.setItem('pcBuilder_recycleOrders', JSON.stringify(orders));
  saveDiscount(window._currentEstimate);
  document.getElementById('recycleModal').style.display = 'none';
  alert('预约成功！回收员将在 ' + date + ' 上门取件');
}

function saveDiscount(amount) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ amount, count: 1, timestamp: Date.now() }));
  loadExistingDiscount();
}

function loadExistingDiscount() {
  try {
    const td = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (td && td.amount > 0) {
      document.getElementById('discountCard').style.display = '';
      document.getElementById('discountAmt').textContent = td.amount.toLocaleString();
      document.getElementById('dmAmount').textContent = td.amount.toLocaleString();
    }
  } catch(e) {}
}

function applyDiscount() {
  try {
    const td = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!td?.amount) return;
    document.getElementById('dmAmount').textContent = td.amount.toLocaleString();
    document.getElementById('discountModal').style.display = 'flex';
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', initTradeinPage);
