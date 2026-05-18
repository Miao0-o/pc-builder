// ============================================================
// Feedback Widget — floating button + form + auto context
// ============================================================
import { api } from './api-client.js';
import { showToast } from './error-banner.js';

const errorLog = [];
const MAX_ERRORS = 5;

const originalConsoleError = console.error.bind(console);
console.error = function(...args) {
  errorLog.push({ message: args.map(String).join(' '), time: Date.now() });
  if (errorLog.length > MAX_ERRORS) errorLog.shift();
  originalConsoleError(...args);
};

window.addEventListener('error', (e) => {
  errorLog.push({ message: `${e.message} at ${e.filename}:${e.lineno}`, time: Date.now() });
  if (errorLog.length > MAX_ERRORS) errorLog.shift();
});

let sessionStart = Date.now();
let actionCount = 0;
document.addEventListener('click', () => actionCount++);

function autoCaptureContext() {
  const config = window.selectedBuild || {};
  return {
    currentConfig: Object.keys(config).length > 0 ? config : null,
    pagePath: window.location.pathname + window.location.hash,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language,
    errors: [...errorLog],
    sessionDuration: Math.round((Date.now() - sessionStart) / 1000),
    actionCount,
  };
}

export function initFeedback() {
  const fab = document.createElement('button');
  fab.id = 'feedbackFab';
  fab.innerHTML = '<i data-lucide="bug" style="width:20px;height:20px;color:#d4af37;"></i>';
  fab.title = '反馈问题';
  fab.style.cssText = `
    position:fixed;bottom:140px;right:24px;z-index:150;
    width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,0.08);
    background:rgba(255,255,255,0.05);color:#f0f0f0;
    font-size:18px;cursor:pointer;display:flex;align-items:center;
    justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.5);
    transition:transform 0.3s;backdrop-filter:blur(10px);
  `;
  fab.addEventListener('mouseenter', () => fab.style.transform = 'scale(1.1)');
  fab.addEventListener('mouseleave', () => fab.style.transform = 'scale(1)');
  fab.addEventListener('click', function() { if (!fab._wasDragged) showForm(); fab._wasDragged = false; });
  document.body.appendChild(fab);
  // 拖拽
  (function makeDraggable(el, storageKey) {
    var pos = {};
    if (localStorage.getItem(storageKey)) localStorage.removeItem(storageKey);
    var sx, sy, sl, st, dragging;
    el.addEventListener('mousedown', function(e) {
      if (e.target !== el && e.target.tagName !== 'svg' && e.target.tagName !== 'path') return;
      var rect = el.getBoundingClientRect();
      el.style.left = rect.left + 'px'; el.style.top = rect.top + 'px';
      el.style.right = 'auto'; el.style.bottom = 'auto';
      sx = e.clientX; sy = e.clientY; sl = rect.left; st = rect.top;
      el.style.transition = 'none';
      function mv(e) {
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging = true;
        if (dragging) { el.style.left = Math.max(0,Math.min(window.innerWidth-50,sl+dx))+'px'; el.style.top = Math.max(0,Math.min(window.innerHeight-50,st+dy))+'px'; }
      }
      function up() {
        el.style.transition = ''; document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up);
        if (dragging) try { localStorage.setItem(storageKey, JSON.stringify({x:parseInt(el.style.left),y:parseInt(el.style.top)})); } catch(e) {}
        var wasDrag = dragging; fab._wasDragged = wasDrag; setTimeout(function(){ dragging = false; }, 0);
      }
      document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up);
    });
  })(fab, 'pcBuilder_feedbackPos');

}

function showForm() {
  const existing = document.getElementById('feedbackModal');
  if (existing) { existing.style.display = 'flex'; return; }

  const overlay = document.createElement('div');
  overlay.id = 'feedbackModal';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:300;display:flex;
    align-items:center;justify-content:center;
    background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);
  `;

  const panel = document.createElement('div');
  panel.style.cssText = `
    background:rgba(17,24,39,0.95);border:1px solid rgba(255,255,255,0.08);
    border-radius:24px;padding:28px;max-width:420px;width:90%;max-height:80vh;overflow-y:auto;
    color:#f0f0f0;backdrop-filter:blur(20px);
  `;

  const title = document.createElement('h3');
  title.textContent = '反馈问题';
  title.style.cssText = 'margin:0 0 16px;font-size:18px;';

  const typeLabel = document.createElement('label');
  typeLabel.textContent = '反馈类型';
  typeLabel.style.cssText = 'font-size:13px;color:#888;display:block;margin-bottom:4px;';

  const typeSelect = document.createElement('select');
  typeSelect.id = 'fbType';
  typeSelect.style.cssText = 'width:100%;padding:8px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);color:#f0f0f0;border-radius:8px;margin-bottom:12px;';
  ['bug', 'feature', 'data', 'other'].forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = { bug: 'Bug', feature: '功能建议', data: '数据错误', other: '其他' }[v];
    typeSelect.appendChild(opt);
  });

  const descLabel = document.createElement('label');
  descLabel.textContent = '描述（至少10字）';
  descLabel.style.cssText = 'font-size:13px;color:#888;display:block;margin-bottom:4px;';

  const descTextarea = document.createElement('textarea');
  descTextarea.id = 'fbDesc';
  descTextarea.rows = 4;
  descTextarea.minLength = 10;
  descTextarea.placeholder = '请描述您遇到的问题...';
  descTextarea.style.cssText = 'width:100%;padding:8px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);color:#f0f0f0;border-radius:8px;resize:vertical;font-family:inherit;margin-bottom:16px;';

  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '取消';
  cancelBtn.style.cssText = 'padding:8px 20px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#f0f0f0;border-radius:8px;cursor:pointer;';
  cancelBtn.addEventListener('click', () => overlay.remove());

  const submitBtn = document.createElement('button');
  submitBtn.textContent = '提交反馈';
  submitBtn.style.cssText = 'padding:8px 20px;border:none;background:linear-gradient(135deg,#7c3aed,#38bdf8);color:#fff;border-radius:8px;cursor:pointer;font-weight:600;';
  submitBtn.addEventListener('click', () => submitFeedback(overlay, typeSelect, descTextarea, submitBtn));

  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(submitBtn);
  panel.appendChild(title);
  panel.appendChild(typeLabel);
  panel.appendChild(typeSelect);
  panel.appendChild(descLabel);
  panel.appendChild(descTextarea);
  panel.appendChild(btnRow);
  overlay.appendChild(panel);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

async function submitFeedback(overlay, typeSelect, descTextarea, submitBtn) {
  const type = typeSelect.value;
  const description = descTextarea.value.trim();

  if (description.length < 10) {
    showToast('请至少输入10个字描述问题', 'warn');
    return;
  }

  const context = autoCaptureContext();
  submitBtn.disabled = true;
  submitBtn.textContent = '提交中...';

  try {
    await api.post('/feedback', { type, description, context });
    overlay.remove();
    showToast('感谢反馈！我们会尽快处理', 'success');
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = '提交反馈';
    showToast('提交失败，请稍后重试', 'error');
  }
}
