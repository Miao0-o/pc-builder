// ============================================================
// 装机大师 - 旧机在线估价 (极简黑白风)
// ============================================================
const STORAGE_KEY = 'pcBuilder_tradeinDiscount';

// ======== 设备数据 ========
const DEVICE_DATA = {
  phone: {
    name: '手机', icon: '📱',
    brands: {
      'Apple': {
        models: {
          'iPhone 16 Pro Max': { basePrice: 6800, storage: {'256GB':0,'512GB':800,'1TB':1600} },
          'iPhone 16 Pro':     { basePrice: 5200, storage: {'128GB':0,'256GB':400,'512GB':800,'1TB':1400} },
          'iPhone 16':         { basePrice: 3800, storage: {'128GB':0,'256GB':400,'512GB':800} },
          'iPhone 15 Pro Max': { basePrice: 4800, storage: {'256GB':0,'512GB':700,'1TB':1400} },
          'iPhone 15 Pro':     { basePrice: 3800, storage: {'128GB':0,'256GB':400,'512GB':700} },
          'iPhone 15':         { basePrice: 2500, storage: {'128GB':0,'256GB':350} },
          'iPhone 14 Pro Max': { basePrice: 3500, storage: {'128GB':0,'256GB':350,'512GB':650} },
          'iPhone 14 Pro':     { basePrice: 2800, storage: {'128GB':0,'256GB':350} },
          'iPhone 14':         { basePrice: 1800, storage: {'128GB':0,'256GB':300} },
          'iPhone 13':         { basePrice: 1200, storage: {'128GB':0,'256GB':250} },
          'iPhone SE 3':       { basePrice: 700,  storage: {'64GB':0,'128GB':150} },
        }
      },
      'Samsung': {
        models: {
          'Galaxy S25 Ultra':   { basePrice: 5200, storage: {'256GB':0,'512GB':600,'1TB':1200} },
          'Galaxy S25+':        { basePrice: 3800, storage: {'256GB':0,'512GB':600} },
          'Galaxy S25':         { basePrice: 2800, storage: {'128GB':0,'256GB':300} },
          'Galaxy S24 Ultra':   { basePrice: 3800, storage: {'256GB':0,'512GB':550} },
          'Galaxy S24':         { basePrice: 2000, storage: {'128GB':0,'256GB':280} },
          'Galaxy Z Fold 5':    { basePrice: 4500, storage: {'256GB':0,'512GB':600} },
          'Galaxy Z Flip 5':    { basePrice: 2200, storage: {'256GB':0,'512GB':500} },
        }
      },
      'Huawei': {
        models: {
          'Mate 70 Pro+':   { basePrice: 4800, storage: {'512GB':0,'1TB':800} },
          'Mate 70 Pro':    { basePrice: 3800, storage: {'256GB':0,'512GB':500} },
          'Mate 70':        { basePrice: 2800, storage: {'256GB':0,'512GB':500} },
          'Pura 70 Ultra':  { basePrice: 4200, storage: {'512GB':0,'1TB':800} },
          'Pura 70 Pro':    { basePrice: 3200, storage: {'256GB':0,'512GB':450} },
          'Mate 60 Pro':    { basePrice: 3000, storage: {'256GB':0,'512GB':450} },
          'nova 13 Pro':    { basePrice: 1500, storage: {'256GB':0,'512GB':300} },
        }
      },
      'Xiaomi': {
        models: {
          'Xiaomi 15 Ultra': { basePrice: 3500, storage: {'256GB':0,'512GB':400,'1TB':800} },
          'Xiaomi 15 Pro':   { basePrice: 2600, storage: {'256GB':0,'512GB':400} },
          'Xiaomi 15':       { basePrice: 1800, storage: {'256GB':0,'512GB':350} },
          'Xiaomi 14 Ultra': { basePrice: 2600, storage: {'256GB':0,'512GB':400} },
          'Redmi K80 Pro':   { basePrice: 1400, storage: {'256GB':0,'512GB':250} },
          'Redmi Note 14 Pro': { basePrice: 700, storage: {'128GB':0,'256GB':150} },
        }
      },
      'OPPO': {
        models: {
          'Find X8 Ultra':   { basePrice: 3000, storage: {'256GB':0,'512GB':400} },
          'Find X8 Pro':     { basePrice: 2200, storage: {'256GB':0,'512GB':400} },
          'Find X8':         { basePrice: 1600, storage: {'256GB':0,'512GB':300} },
          'Reno 14 Pro':     { basePrice: 1200, storage: {'256GB':0,'512GB':250} },
          'Reno 14':         { basePrice: 800,  storage: {'128GB':0,'256GB':150} },
        }
      },
      'vivo': {
        models: {
          'X200 Ultra':   { basePrice: 3200, storage: {'256GB':0,'512GB':400} },
          'X200 Pro':     { basePrice: 2400, storage: {'256GB':0,'512GB':400} },
          'X200':         { basePrice: 1800, storage: {'256GB':0,'512GB':300} },
          'S20 Pro':      { basePrice: 1500, storage: {'256GB':0,'512GB':250} },
          'S20':          { basePrice: 1000, storage: {'128GB':0,'256GB':180} },
        }
      },
      'Honor': {
        models: {
          'Magic 7 Pro':   { basePrice: 2800, storage: {'256GB':0,'512GB':400} },
          'Magic 7':       { basePrice: 2000, storage: {'256GB':0,'512GB':350} },
          'Magic V4':      { basePrice: 3800, storage: {'256GB':0,'512GB':500} },
          'Honor 300 Pro': { basePrice: 1400, storage: {'256GB':0,'512GB':250} },
          'Honor 300':     { basePrice: 900,  storage: {'128GB':0,'256GB':150} },
        }
      },
    }
  },
  tablet: {
    name: '平板', icon: '📋',
    brands: {
      'Apple': {
        models: {
          'iPad Pro 13" M4':    { basePrice: 5500, storage: {'256GB':0,'512GB':600,'1TB':1200} },
          'iPad Pro 11" M4':    { basePrice: 4000, storage: {'256GB':0,'512GB':600} },
          'iPad Air 13" M2':    { basePrice: 3000, storage: {'128GB':0,'256GB':350,'512GB':600} },
          'iPad Air 11" M2':    { basePrice: 2200, storage: {'128GB':0,'256GB':350} },
          'iPad 10.9"':         { basePrice: 1200, storage: {'64GB':0,'256GB':300} },
          'iPad mini 7':        { basePrice: 1800, storage: {'128GB':0,'256GB':300} },
        }
      },
      'Samsung': {
        models: {
          'Galaxy Tab S10 Ultra': { basePrice: 4200, storage: {'256GB':0,'512GB':500} },
          'Galaxy Tab S10+':      { basePrice: 3000, storage: {'256GB':0,'512GB':500} },
          'Galaxy Tab S10':       { basePrice: 2000, storage: {'128GB':0,'256GB':300} },
          'Galaxy Tab S9 FE':     { basePrice: 1200, storage: {'128GB':0,'256GB':200} },
        }
      },
      'Huawei': {
        models: {
          'MatePad Pro 13.2"': { basePrice: 3000, storage: {'256GB':0,'512GB':400} },
          'MatePad Pro 11"':   { basePrice: 1800, storage: {'256GB':0,'512GB':350} },
          'MatePad Air 12"':   { basePrice: 1400, storage: {'128GB':0,'256GB':250} },
          'MatePad SE 11"':    { basePrice: 600,  storage: {'128GB':0,'256GB':150} },
        }
      },
      'Xiaomi': {
        models: {
          'Pad 7 Max 14"': { basePrice: 2200, storage: {'256GB':0,'512GB':350} },
          'Pad 7 Pro 12.4"': { basePrice: 1400, storage: {'128GB':0,'256GB':250} },
          'Pad 7 11"': { basePrice: 800, storage: {'128GB':0,'256GB':180} },
          'Redmi Pad Pro': { basePrice: 500, storage: {'128GB':0,'256GB':120} },
        }
      },
      'Lenovo': {
        models: {
          '小新 Pad Pro 12.7"': { basePrice: 900, storage: {'128GB':0,'256GB':150} },
          '小新 Pad 2024':      { basePrice: 400, storage: {'64GB':0,'128GB':100} },
          'YOGA Pad Pro':       { basePrice: 1500, storage: {'256GB':0,'512GB':300} },
        }
      },
    }
  }
};

// 成色系数
const CONDITION_OPTS = [
  { id:'perfect', name:'外观完好', desc:'无任何划痕损伤', factor:1.0 },
  { id:'scratch', name:'轻微划痕', desc:'屏幕/机身细微划痕', factor:0.85 },
  { id:'dent',    name:'磕碰凹陷', desc:'边框或背板有磕碰', factor:0.65 },
  { id:'crack',   name:'屏幕碎裂', desc:'屏幕玻璃破损', factor:0.35 },
];

// 功能状态项
const FUNCTIONAL_ITEMS = [
  { id:'noRepair',   label:'无拆修记录',   penalty:0,    failDesc:'' },
  { id:'noWater',    label:'无进水',        penalty:0,    failDesc:'' },
  { id:'batteryOk',  label:'电池健康 ≥80%', penalty:0,    failDesc:'' },
  { id:'allFunc',    label:'所有功能正常',   penalty:0,    failDesc:'' },
];

// ======== 状态 ========
let state = {
  deviceType: null,
  brand: null, model: null, storage: null,
  condition: null,
  functionalPassed: {},
  basePrice: 0, storageAddon: 0,
};

function initTradeinPage() {
  buildDeviceTypeOptions();
  buildConditionOptions();
  buildFunctionalOptions();
  bindEvents();
  loadExistingDiscount();
}

function buildDeviceTypeOptions() {
  const group = document.getElementById('deviceTypeGroup');
  group.innerHTML = Object.entries(DEVICE_DATA).map(([k,v]) =>
    `<button class="til-opt" data-type="${k}" onclick="selectDeviceType('${k}')">${v.icon} ${v.name}</button>`
  ).join('');
}

function buildConditionOptions() {
  const group = document.getElementById('conditionGroup');
  group.innerHTML = CONDITION_OPTS.map(c =>
    `<button class="til-opt" data-cond="${c.id}" onclick="selectCondition('${c.id}')">
      <div class="til-opt-title">${c.name}</div>
      <div class="til-opt-desc">${c.desc}</div>
    </button>`
  ).join('');
}

function buildFunctionalOptions() {
  const group = document.getElementById('functionalGroup');
  group.innerHTML = FUNCTIONAL_ITEMS.map(f =>
    `<label class="til-func-item" id="funcItem-${f.id}">
      <input type="checkbox" onchange="toggleFunctional('${f.id}', this.checked)">
      <span class="til-func-check"></span>
      <span>${f.label}</span>
    </label>`
  ).join('');
}

function selectDeviceType(type) {
  state.deviceType = type;
  state.brand = state.model = state.storage = null;
  state.condition = null;
  state.functionalPassed = {};
  state.basePrice = 0; state.storageAddon = 0;

  // 更新选项高亮
  document.querySelectorAll('#deviceTypeGroup .til-opt').forEach(b => {
    b.classList.toggle('selected', b.dataset.type === type);
  });

  // 构建品牌下拉
  const data = DEVICE_DATA[type];
  const brandSel = document.getElementById('brandSelect');
  brandSel.innerHTML = '<option value="">选择品牌</option>' +
    Object.keys(data.brands).map(b => `<option value="${b}">${b}</option>`).join('');
  brandSel.disabled = false;
  document.getElementById('modelSelect').innerHTML = '<option value="">选择型号</option>';
  document.getElementById('modelSelect').disabled = true;
  document.getElementById('storageSelect').innerHTML = '<option value="">内存版本</option>';
  document.getElementById('storageSelect').disabled = true;

  // 显示后续步骤
  document.getElementById('stepBrand').style.display = '';
  document.getElementById('stepCondition').style.display = 'none';
  document.getElementById('stepFunctional').style.display = 'none';
  resetConditionAndFunctional();
  updatePrice();
}

function bindEvents() {
  document.getElementById('brandSelect').addEventListener('change', function() {
    state.brand = this.value;
    state.model = null; state.storage = null;
    const data = DEVICE_DATA[state.deviceType];
    const models = data.brands[this.value]?.models || {};
    const modelSel = document.getElementById('modelSelect');
    modelSel.innerHTML = '<option value="">选择型号</option>' +
      Object.keys(models).map(m => `<option value="${m}">${m}</option>`).join('');
    modelSel.disabled = false;
    document.getElementById('storageSelect').innerHTML = '<option value="">内存版本</option>';
    document.getElementById('storageSelect').disabled = true;
    resetConditionAndFunctional();
    updatePrice();
  });

  document.getElementById('modelSelect').addEventListener('change', function() {
    state.model = this.value;
    state.storage = null;
    const data = DEVICE_DATA[state.deviceType];
    const modelData = data.brands[state.brand]?.models[this.value];
    state.basePrice = modelData?.basePrice || 0;
    const storages = modelData?.storage || {};
    const storageSel = document.getElementById('storageSelect');
    storageSel.innerHTML = '<option value="">选择版本</option>' +
      Object.entries(storages).map(([k,v]) => `<option value="${k}">${k} ${v>0?'(+¥'+v+')':'(基础)'}</option>`).join('');
    storageSel.disabled = false;
    // 显示步骤3
    document.getElementById('stepCondition').style.display = '';
    document.getElementById('stepFunctional').style.display = 'none';
    resetConditionAndFunctional();
    updatePrice();
  });

  document.getElementById('storageSelect').addEventListener('change', function() {
    state.storage = this.value;
    const data = DEVICE_DATA[state.deviceType];
    const modelData = data.brands[state.brand]?.models[state.model];
    state.storageAddon = modelData?.storage[this.value] || 0;
    document.getElementById('stepFunctional').style.display = '';
    updatePrice();
  });

  document.getElementById('btnRecycle').addEventListener('click', openRecycleModal);
  document.getElementById('btnApplyDiscount')?.addEventListener('click', applyDiscount);
  document.getElementById('btnConfirmRecycle')?.addEventListener('click', confirmRecycle);

  document.querySelectorAll('.til-modal-overlay').forEach(ov => {
    ov.addEventListener('click', function(e) { if(e.target===this) this.style.display='none'; });
  });
}

function selectCondition(condId) {
  state.condition = condId;
  document.querySelectorAll('#conditionGroup .til-opt').forEach(b => {
    b.classList.toggle('selected', b.dataset.cond === condId);
  });
  updatePrice();
}

function toggleFunctional(id, checked) {
  state.functionalPassed[id] = checked;
  const item = document.getElementById('funcItem-'+id);
  if (item) item.classList.toggle('checked', checked);
  updatePrice();
}

function resetConditionAndFunctional() {
  state.condition = null;
  state.functionalPassed = {};
  document.querySelectorAll('#conditionGroup .til-opt').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.til-func-item').forEach(el => el.classList.remove('checked'));
  document.querySelectorAll('#functionalGroup input[type="checkbox"]').forEach(cb => cb.checked = false);
}

function updatePrice() {
  const priceNum = document.getElementById('priceNum');
  const btnRecycle = document.getElementById('btnRecycle');
  const priceDetail = document.getElementById('priceDetail');

  // 需要型号已选
  if (!state.model || !state.storage) {
    priceNum.textContent = '0';
    btnRecycle.disabled = true;
    priceDetail.innerHTML = '';
    return;
  }

  let price = state.basePrice + state.storageAddon;

  // 成色系数
  const cond = CONDITION_OPTS.find(c => c.id === state.condition);
  if (cond) price = Math.round(price * cond.factor);

  // 功能缺陷扣减
  const penalties = [];
  if (!state.functionalPassed['noRepair']) { price = Math.round(price * 0.85); penalties.push('拆修 -15%'); }
  if (!state.functionalPassed['noWater'])  { price = Math.round(price * 0.75); penalties.push('进水 -25%'); }
  if (!state.functionalPassed['batteryOk']) { price = Math.round(price * 0.90); penalties.push('电池老化 -10%'); }
  if (!state.functionalPassed['allFunc'])  { price = Math.round(price * 0.80); penalties.push('功能异常 -20%'); }

  priceNum.textContent = price.toLocaleString();
  btnRecycle.disabled = false;

  // 明细
  let detailHTML = '';
  if (cond) detailHTML += `<div class="til-detail-row"><span>${cond.name}</span><span>×${(cond.factor*100).toFixed(0)}%</span></div>`;
  penalties.forEach(p => {
    detailHTML += `<div class="til-detail-row penalty"><span>${p}</span></div>`;
  });
  if (detailHTML) detailHTML += `<div class="til-detail-row total"><span>最终估价</span><span>￥${price.toLocaleString()}</span></div>`;
  priceDetail.innerHTML = detailHTML;

  // 更新预约弹窗中的价格
  document.getElementById('rmPrice').textContent = price.toLocaleString();
  window._currentEstimate = price;
}

function openRecycleModal() {
  if (!window._currentEstimate || window._currentEstimate <= 0) return;
  const data = DEVICE_DATA[state.deviceType];
  const brand = state.brand;
  const model = state.model;
  const storage = state.storage;
  document.getElementById('rmDevice').textContent = `${data?.icon||''} ${brand} ${model} ${storage}`;
  document.getElementById('rmPrice').textContent = window._currentEstimate.toLocaleString();
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
    deviceType: state.deviceType, brand: state.brand, model: state.model, storage: state.storage,
    condition: state.condition, functionalPassed: state.functionalPassed,
    estimate: window._currentEstimate,
    name, phone, address, date, timeSlot,
    status: '已预约', createdAt: new Date().toISOString()
  };

  let orders = [];
  try { orders = JSON.parse(localStorage.getItem('pcBuilder_recycleOrders') || '[]'); } catch(e) {}
  orders.unshift(order);
  localStorage.setItem('pcBuilder_recycleOrders', JSON.stringify(orders));

  // 存抵扣
  saveDiscount(window._currentEstimate);
  document.getElementById('recycleModal').style.display = 'none';
  alert('✅ 预约成功！回收员将在 ' + date + ' 上门取件');
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
    if (!td || !td.amount) return;
    document.getElementById('dmAmount').textContent = td.amount.toLocaleString();
    document.getElementById('discountModal').style.display = 'flex';
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', initTradeinPage);
