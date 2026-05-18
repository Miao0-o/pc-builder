// ============================================================
// Error Banner — global error display system
// ============================================================

const ERROR_MESSAGES = {
  NETWORK: '网络连接失败，请检查网络后重试',
  TIMEOUT: '请求超时，请稍后重试',
  SERVER: '服务器繁忙，请稍后重试',
  AUTH: '登录已过期，请重新登录',
  NOT_FOUND: '资源不存在或已删除',
  UNKNOWN: '发生未知错误，请刷新页面重试',
};

function classifyError(err) {
  if (err.name === 'AbortError' || err.message?.includes('超时')) return 'TIMEOUT';
  if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) return 'NETWORK';
  if (err.status === 401) return 'AUTH';
  if (err.status === 404) return 'NOT_FOUND';
  if (err.status >= 500) return 'SERVER';
  return 'UNKNOWN';
}

export function showError(err, { action, duration = 5000 } = {}) {
  const key = classifyError(err);
  const message = err.message || ERROR_MESSAGES[key];
  const existing = document.getElementById('global-error-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.id = 'global-error-banner';
  Object.assign(banner.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '9999',
    background: '#ff4444',
    color: '#fff',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontFamily: 'system-ui',
    animation: 'slideDown 0.3s ease',
    boxShadow: '0 2px 12px rgba(255,0,0,0.3)',
  });

  const messageSpan = document.createElement('span');
  messageSpan.textContent = `❌ ${message}`;
  banner.appendChild(messageSpan);

  const actionsSpan = document.createElement('span');
  actionsSpan.style.display = 'flex';
  actionsSpan.style.gap = '12px';
  actionsSpan.style.alignItems = 'center';

  if (action) {
    const actionBtn = document.createElement('button');
    actionBtn.id = 'err-action';
    Object.assign(actionBtn.style, {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
    });
    actionBtn.textContent = action.label || '重试';
    if (action.onClick) {
      actionBtn.addEventListener('click', () => {
        banner.remove();
        action.onClick();
      });
    }
    actionsSpan.appendChild(actionBtn);
  }

  const closeBtn = document.createElement('button');
  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
  });
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => banner.remove());
  actionsSpan.appendChild(closeBtn);

  banner.appendChild(actionsSpan);
  document.body.prepend(banner);

  if (duration > 0) {
    setTimeout(() => banner.remove(), duration);
  }
}

export function showToast(message, type = 'info', duration = 3000) {
  const colors = { success: '#66ff99', error: '#ff6666', warn: '#ffcc66', info: '#888' };
  const icons = { success: '✅', error: '❌', warn: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    right: '28px',
    zIndex: '9999',
    background: '#0d0d0d',
    color: colors[type] || colors.info,
    border: '1px solid #2a2a2a',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'system-ui',
    animation: 'toastIn 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  });
  toast.textContent = `${icons[type] || ''} ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function dismissAll() {
  document.querySelectorAll('#global-error-banner').forEach(el => el.remove());
}

// Inject keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
  @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);
