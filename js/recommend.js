// ============================================================
// 一键推荐引擎 - 输入预算+用途 → 自动生成整机配置
// ============================================================

// 预算分配策略（百分比%）：[CPU, GPU, 主板, 内存, 硬盘, 电源, 机箱]
const BUDGET_ALLOC = {
  'office':     [28, 0,  14, 13, 18, 11, 6],  // 办公影音（核显）
  'light-game': [20, 32, 12, 11, 13, 10, 2],  // 轻度游戏
  'aaa-game':   [18, 40, 10, 10, 10, 10, 2],  // 3A大作
  'video':      [28, 26, 12, 15, 10, 7,  2],  // 视频剪辑
  'ai':         [22, 36, 10, 13, 7,  10, 2],  // AI/3D创作
};

// 兼容组：Intel平台
const INTEL_COMBOS = {
  cpu: [0, 1],           // i5-14600KF, i7-14700KF
  gpu: [0, 1, 2, 3],
  motherboard: [0, 1, 3], // B760M x2, Z790
  ram: [0, 1, 2, 3],
  storage: [0, 1, 2, 3],
  psu: [0, 1, 2],
  case: [0, 1, 2],
  cooler: [0, 1, 2],
};

// 兼容组：AMD平台
const AMD_COMBOS = {
  cpu: [2, 3],           // R5 7600X, R7 7800X3D
  gpu: [0, 1, 2, 3],
  motherboard: [2],      // B650M
  ram: [0, 1, 2, 3],
  storage: [0, 1, 2, 3],
  psu: [0, 1, 2],
  case: [0, 1, 2],
  cooler: [0, 1, 2],
};

// ==================== 推荐算法 ====================
function generateRecommend(budget, usages, platformPref) {
  // 1. 合并用途的预算分配权重
  const alloc = mergeAllocations(usages);

  // 2. 决定平台
  const platform = platformPref === 'amd' ? 'amd' : platformPref === 'intel' ? 'intel' : (Math.random() > 0.5 ? 'intel' : 'amd');
  const combos = platform === 'intel' ? INTEL_COMBOS : AMD_COMBOS;

  // 3. 按预算分配选择最佳配件
  const result = {};
  const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case', 'cooler'];

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const catBudget = budget * alloc[i] / 100;
    const options = pcComponents[cat].options;
    const validIndexes = combos[cat] || options.map((_, idx) => idx);

    result[cat] = pickBestOption(options, validIndexes, catBudget);

    // 特殊处理：办公模式不买独显
    if (cat === 'gpu' && usages.length === 1 && usages[0] === 'office') {
      result[cat] = null;
    }
  }

  // 4. 微调：保证总价不超出预算5%
  const total = calcTotal(result);
  if (total > budget * 1.08) {
    // 超预算，降级GPU和存储
    downgradePart(result, 'gpu');
    downgradePart(result, 'storage');
  }

  return { config: result, platform, total: calcTotal(result) };
}

// 合并多个用途的分配权重
function mergeAllocations(usages) {
  if (usages.length === 0) usages = ['office'];
  const merged = [0, 0, 0, 0, 0, 0, 0];
  for (const u of usages) {
    const a = BUDGET_ALLOC[u] || BUDGET_ALLOC['office'];
    for (let i = 0; i < 7; i++) merged[i] += a[i];
  }
  for (let i = 0; i < 7; i++) merged[i] /= usages.length;
  return merged;
}

// 在预算内选最优配件
function pickBestOption(options, validIndexes, budget) {
  let best = null;
  let bestPrice = 0;

  for (const idx of validIndexes) {
    if (idx >= options.length) continue;
    const opt = options[idx];
    // 找价格最接近预算但不超过120%的
    if (opt.price <= budget * 1.2) {
      if (!best || opt.price > bestPrice) {
        best = opt;
        bestPrice = opt.price;
      }
    }
  }

  // 如果没找到合适的，选最便宜的
  if (!best) {
    let minPrice = Infinity;
    for (const idx of validIndexes) {
      if (idx >= options.length) continue;
      if (options[idx].price < minPrice) {
        best = options[idx];
        minPrice = options[idx].price;
      }
    }
  }

  return best;
}

// 降级配件
function downgradePart(result, key) {
  if (!result[key]) return;
  const options = pcComponents[key].options;
  const currentIdx = options.findIndex(o => o.name === result[key].name);
  if (currentIdx > 0) {
    result[key] = options[currentIdx - 1];
  }
}

// 计算总价
function calcTotal(result) {
  let total = 0;
  for (const [key, opt] of Object.entries(result)) {
    if (opt) total += opt.price;
  }
  return total;
}

// ==================== 页面交互 ====================

function initRecommendPage() {
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const btnGenerate = document.getElementById('btnGenerate');
  const resultArea = document.getElementById('resultArea');

  if (!budgetSlider) return;

  // 检查旧机抵扣
  let tradeinDiscount = 0;
  try {
    const td = JSON.parse(localStorage.getItem('pcBuilder_tradeinDiscount'));
    if (td && td.amount > 0) tradeinDiscount = td.amount;
  } catch(e) {}
  window._tradeinDiscount = tradeinDiscount;

  // 显示抵扣提示
  const discountHint = document.getElementById('tradeinHint');
  if (discountHint) {
    if (tradeinDiscount > 0) {
      discountHint.innerHTML = '<i data-lucide="dollar-sign" class="icon-sm"></i> 旧机抵扣 <strong>¥' + tradeinDiscount.toLocaleString() + '</strong> 已生效，将从总价中扣除';if(typeof lucide!=='undefined')lucide.createIcons();
      discountHint.style.display = 'block';
    } else {
      discountHint.style.display = 'none';
    }
  }

  budgetSlider.addEventListener('input', () => {
    budgetDisplay.textContent = '¥' + Number(budgetSlider.value).toLocaleString();
  });

  btnGenerate.addEventListener('click', () => {
    const budget = Number(budgetSlider.value);
    const usages = [];
    if (document.getElementById('useOffice').checked) usages.push('office');
    if (document.getElementById('useLightGame').checked) usages.push('light-game');
    if (document.getElementById('useAAAGame').checked) usages.push('aaa-game');
    if (document.getElementById('useVideo').checked) usages.push('video');
    if (document.getElementById('useAI').checked) usages.push('ai');

    if (usages.length === 0) {
      alert('请至少选择一个用途');
      return;
    }

    const platformPref = document.querySelector('input[name="platform"]:checked').value;

    const { config, platform, total } = generateRecommend(budget, usages, platformPref);
    const score = estimateLudashiScore(buildConfigToSelected(config));

    renderResult(config, total, score, platform);
  });
}

// 转换配置格式给跑分函数
function buildConfigToSelected(config) {
  const selected = {};
  for (const [key, opt] of Object.entries(config)) {
    if (opt) selected[key] = opt.name;
  }
  return selected;
}

function renderResult(config, total, score, platform) {
  const resultArea = document.getElementById('resultArea');
  if (!resultArea) return;

  const categoryNames = { cpu:'处理器', gpu:'显卡', motherboard:'主板', ram:'内存', storage:'硬盘', psu:'电源', case:'机箱', cooler:'散热器' };
  const icons = { cpu:'cpu', gpu:'gamepad-2', motherboard:'layout-template', ram:'memory-stick', storage:'hard-drive', psu:'plug-zap', case:'monitor', cooler:'fan' };

  let rows = '';
  for (const [key, opt] of Object.entries(config)) {
    if (!opt) continue;
    rows += `
      <div class="rec-part-row">
        <span class="rec-part-icon"><i data-lucide="${icons[key]}" class="icon-lg"></i></span>
        <div class="rec-part-info">
          <span class="rec-part-cat">${categoryNames[key]}</span>
          <span class="rec-part-name">${opt.name}</span>
        </div>
        <span class="rec-part-price">¥${opt.price.toLocaleString()}</span>
      </div>
    `;
  }

  resultArea.innerHTML = `
    <div class="rec-result-header">
      <h2><i data-lucide="sparkles" class="icon-lg"></i> 推荐配置</h2>
      <span class="rec-platform-badge">${platform === 'intel' ? '🔵 Intel平台' : '🔴 AMD平台'}</span>
    </div>
    <div class="rec-parts-list">${rows}</div>
    <div class="rec-summary">${window._tradeinDiscount > 0 ? `<div class="rec-tradein-hint">💰 旧机抵扣：<strong>-¥${window._tradeinDiscount.toLocaleString()}</strong></div>` : ''}
      <div class="rec-total">总价：<strong>¥${total.toLocaleString()}</strong>${window._tradeinDiscount > 0 ? ` <small style="color:var(--text-muted);">（实付约 ¥${Math.max(0,total-window._tradeinDiscount).toLocaleString()}）</small>` : ''}</div>
      <div class="rec-score">预估跑分：<strong>${score.totalWan}万分</strong> · ${score.level}</div>
      <div class="rec-comment">${score.comment}</div>
    </div>
    <div class="rec-actions">
      <button class="btn-rebuild" onclick="initRecommendPage(); document.getElementById('btnGenerate').click();"><i data-lucide="refresh-cw" class="icon-sm"></i> 重新生成</button>
      <button class="btn-view3d" onclick="openIn3D()"><i data-lucide="monitor" class="icon-sm"></i> 在3D机箱中查看</button>
    </div>
  `;

  // 存入选中的配置到全局变量供3D跳转
  window._recommendConfig = buildConfigToSelected(config);
}

function openIn3D() {
  if (window._recommendConfig) {
    localStorage.setItem('pcBuilderPreselect', JSON.stringify(window._recommendConfig));
  }
  window.location.href = 'index.html';
}
