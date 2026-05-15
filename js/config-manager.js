// ============================================================
// Config Manager — CRUD, cloud sync, offline fallback
// ============================================================
import { api } from './api-client.js';
import { supabase, getUserId } from './supabase-client.js';
import { AsyncState } from './state-machine.js';
import { showToast, showError } from './error-banner.js';

const LS_KEY_SAVED = 'pcBuilder_savedConfigs';
const LS_KEY_PENDING = 'pcBuilder_pendingSync';
const LS_KEY_ANON = 'pcBuilder_anonymous_configs';

// ========== Cloud Operations ==========

export async function saveConfig({ name, partsSnapshot, totalPrice, benchmark, platform, isPublic = false }) {
  const userId = await getUserId();
  const body = {
    name: name || '我的配置 ' + new Date().toLocaleDateString('zh-CN'),
    parts_snapshot: partsSnapshot,
    total_price: totalPrice,
    benchmark_score: benchmark.totalWan,
    benchmark_level: benchmark.level,
    platform,
    is_public: isPublic,
    user_id: userId,
  };

  try {
    const result = await api.post('/configs', body);
    showToast('配置保存成功', 'success');
    return result;
  } catch (err) {
    saveConfigLocal({ ...body, id: crypto.randomUUID(), status: 'draft' });
    savePendingSync({ ...body, id: crypto.randomUUID() });
    showError(err, { action: { label: '稍后重试', onClick: () => syncPendingConfigs() } });
    return { id: body.id, status: 'draft', _offline: true };
  }
}

export async function loadMyConfigs({ status = 'draft,published,private', page = 1, limit = 20 } = {}) {
  const userId = await getUserId();
  if (!userId) return loadLocalConfigs();

  try {
    const result = await api.get(`/configs?status=${status}&page=${page}&limit=${limit}`);
    return result;
  } catch (err) {
    showError(err);
    return loadLocalConfigs();
  }
}

export async function loadConfigById(id) {
  try {
    return await api.get(`/configs/${id}`);
  } catch (err) {
    const local = loadLocalConfigs();
    const found = local.find(c => c.id === id);
    if (found) return { data: found };
    throw err;
  }
}

export async function updateConfig(id, { name, partsSnapshot, version }) {
  try {
    const result = await api.patch(`/configs/${id}`, {
      name,
      parts_snapshot: partsSnapshot,
      version,
    });
    showToast('配置更新成功', 'success');
    return result;
  } catch (err) {
    if (err.status === 409) {
      showToast('配置已被其他设备修改，请刷新后重试', 'warn');
    } else {
      showError(err, { action: { label: '重试', onClick: () => updateConfig(id, { name, partsSnapshot, version }) } });
    }
    throw err;
  }
}

export async function deleteConfig(id) {
  try {
    await api.delete(`/configs/${id}`);
    showToast('配置已删除', 'success');
  } catch (err) {
    showError(err);
  }
}

export async function loadSharedConfig(shareCode) {
  return api.get(`/s/${shareCode}`);
}

export async function publishConfig(id, version) {
  try {
    const result = await api.patch(`/configs/${id}`, { status: 'published', version });
    showToast('配置已公开分享', 'success');
    return result;
  } catch (err) {
    showError(err);
    throw err;
  }
}

export async function makePrivate(id, version) {
  try {
    const result = await api.patch(`/configs/${id}`, { status: 'private', version });
    showToast('已取消公开分享', 'success');
    return result;
  } catch (err) {
    showError(err);
    throw err;
  }
}

// ========== Local Fallback ==========

function loadLocalConfigs() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY_SAVED) || '[]');
  } catch { return []; }
}

function saveConfigLocal(config) {
  const saved = loadLocalConfigs();
  const idx = saved.findIndex(c => c.id === config.id);
  if (idx >= 0) saved[idx] = config;
  else saved.unshift(config);
  if (saved.length > 50) saved.length = 50;
  localStorage.setItem(LS_KEY_SAVED, JSON.stringify(saved));
}

function savePendingSync(config) {
  try {
    const pending = JSON.parse(localStorage.getItem(LS_KEY_PENDING) || '[]');
    pending.push({ ...config, _pendingSince: Date.now() });
    localStorage.setItem(LS_KEY_PENDING, JSON.stringify(pending));
  } catch {}
}

export async function syncPendingConfigs() {
  try {
    const pending = JSON.parse(localStorage.getItem(LS_KEY_PENDING) || '[]');
    if (pending.length === 0) return;

    let synced = 0;
    for (const config of pending) {
      try {
        await api.post('/configs', config);
        synced++;
      } catch (err) {
        if (err.status >= 500) break;
      }
    }

    if (synced > 0) {
      localStorage.removeItem(LS_KEY_PENDING);
      showToast(`${synced} 条配置已同步到云端`, 'success');
    }
  } catch {}
}

// ========== Anonymous → Login Migration ==========

export async function mergeLocalToCloud() {
  const localConfigs = loadLocalConfigs();
  const pending = JSON.parse(localStorage.getItem(LS_KEY_PENDING) || '[]');
  const allLocal = [...localConfigs, ...pending];

  if (allLocal.length === 0) return;

  let merged = 0;
  for (const config of allLocal) {
    try {
      await api.post('/configs', { ...config, _migrated: true });
      merged++;
    } catch {}
  }

  if (merged > 0) {
    localStorage.removeItem(LS_KEY_SAVED);
    localStorage.removeItem(LS_KEY_PENDING);
    showToast(`已将 ${merged} 条本地配置同步到云端`, 'success');
  }
}

// Auto-sync on online
window.addEventListener('online', () => {
  syncPendingConfigs();
});

export { loadLocalConfigs };
