// ============================================================
// 装机大师 - 旧机自助估价 JS
// ============================================================
const STORAGE_KEY = 'pcBuilder_tradeinDiscount';

// 成色系数
const DEPRECIATION = {
  'like-new': { label: '几乎全新', factor: 0.80 },
  'good':     { label: '良好（1-2代前）', factor: 0.60 },
  'fair':     { label: '一般（3-4代前）', factor: 0.40 },
  'old':      { label: '老旧', factor: 0.20 },
};

// 从 pcComponents 中获取每个品类的最低价格作为基准
function getBasePrice(key) {
  const comp = pcComponents[key];
  if (!comp || !comp.options || comp.options.length === 0) return 0;
  const prices = comp.options.map(o => o.price);
  return Math.min(...prices);
}

function initTradeinPage() {
  const cardsEl = document.getElementById('tradeinCards');
  // 排除 fan（风扇单独估价无意义）
  const categories = componentOrder.filter(k => k !== 'fan');

  let html = '';
  for (const key of categories) {
    const comp = pcComponents[key];
    if (!comp) continue;
    const basePrice = getBasePrice(key);
    html += `
      <div class="tradein-item" id="tradein-${key}">
        <label class="tradein-check">
          <input type="checkbox" data-key="${key}" onchange="updateEstimate()">
          <span class="tradein-check-mark"></span>
        </label>
        <div class="tradein-info">
          <span class="tradein-icon">${comp.icon}</span>
          <div>
            <div class="tradein-name">${comp.shortName}</div>
            <div class="tradein-base">新品基准价 ¥${basePrice.toLocaleString()}</div>
          </div>
        </div>
        <select class="tradein-condition" data-key="${key}" onchange="updateEstimate()" disabled>
          <option value="">选择成色</option>
          ${Object.entries(DEPRECIATION).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('')}
        </select>
        <div class="tradein-estimate" id="est-${key}">-</div>
      </div>
    `;
  }
  cardsEl.innerHTML = html;

  // 联动 checkbox 和 condition select
  cardsEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const row = cb.closest('.tradein-item');
      const select = row.querySelector('.tradein-condition');
      select.disabled = !cb.checked;
      if (!cb.checked) select.value = '';
    });
  });

  document.getElementById('btnApply').addEventListener('click', applyDiscount);
  document.getElementById('btnReset').addEventListener('click', resetEstimate);

  updateEstimate();
}

function updateEstimate() {
  const items = document.querySelectorAll('.tradein-item');
  let total = 0;
  let count = 0;

  items.forEach(row => {
    const cb = row.querySelector('input[type="checkbox"]');
    const select = row.querySelector('.tradein-condition');
    const estEl = row.querySelector('.tradein-estimate');
    const key = cb.dataset.key;

    if (cb.checked && select.value) {
      const basePrice = getBasePrice(key);
      const dep = DEPRECIATION[select.value];
      const estimate = Math.round(basePrice * dep.factor);
      estEl.textContent = '¥' + estimate.toLocaleString();
      estEl.className = 'tradein-estimate active';
      total += estimate;
      count++;
    } else if (cb.checked && !select.value) {
      estEl.textContent = '选成色';
      estEl.className = 'tradein-estimate';
    } else {
      estEl.textContent = '-';
      estEl.className = 'tradein-estimate';
    }
  });

  document.getElementById('tisTotal').textContent = total.toLocaleString();
  document.getElementById('tisCount').textContent = count > 0 ? `已选 ${count} 件` : '未选配件';
  document.getElementById('btnApply').disabled = count === 0;

  // 存储当前估价用于应用
  window._tradeinTotal = total;
  window._tradeinCount = count;
}

function applyDiscount() {
  if (!window._tradeinTotal || window._tradeinTotal <= 0) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      amount: window._tradeinTotal,
      count: window._tradeinCount,
      timestamp: Date.now()
    }));
  } catch(e) {
    alert('存储失败，请清理浏览器缓存后重试');
    return;
  }
  document.getElementById('discountAmount').textContent = window._tradeinTotal.toLocaleString();
  document.getElementById('discountModal').style.display = 'flex';
}

function resetEstimate() {
  document.querySelectorAll('.tradein-item input[type="checkbox"]').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.tradein-condition').forEach(s => { s.value = ''; s.disabled = true; });
  localStorage.removeItem(STORAGE_KEY);
  updateEstimate();
}

document.addEventListener('DOMContentLoaded', initTradeinPage);
