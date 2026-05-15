// ============================================================
// API Client — unified fetch wrapper with retry, JWT, dedup
// ============================================================
import { supabase, getSession } from './supabase-client.js';

const BASE_URL = 'https://YOUR-PROJECT.supabase.co/functions/v1';
const TIMEOUT_MS = 15000;
const pendingRequests = new Map();

function cacheKey(method, url, body) {
  return `${method}:${url}:${JSON.stringify(body || '')}`;
}

async function request(method, url, body = null, options = {}) {
  const { skipAuth = false, timeout = TIMEOUT_MS, dedup = true } = options;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const key = cacheKey(method, fullUrl, body);

  if (dedup && pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  const promise = _doRequest(method, fullUrl, body, { skipAuth, timeout });
  if (dedup) {
    pendingRequests.set(key, promise);
    promise.finally(() => pendingRequests.delete(key));
  }
  return promise;
}

async function _doRequest(method, url, body, { skipAuth, timeout }) {
  const headers = { 'Content-Type': 'application/json' };

  if (!skipAuth) {
    const session = await getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.status === 401 && !skipAuth) {
      const { data } = await supabase.auth.refreshSession();
      if (data.session) {
        headers['Authorization'] = `Bearer ${data.session.access_token}`;
        const retryRes = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
        return _parseResponse(retryRes);
      }
    }

    return _parseResponse(res);
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('请求超时，请检查网络连接后重试');
    }
    throw err;
  }
}

async function _parseResponse(res) {
  if (!res.ok) {
    let message;
    try {
      const json = await res.json();
      message = json.error || json.message || `HTTP ${res.status}`;
    } catch {
      message = `HTTP ${res.status}`;
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export const api = {
  get: (url, opts) => request('GET', url, null, opts),
  post: (url, body, opts) => request('POST', url, body, opts),
  patch: (url, body, opts) => request('PATCH', url, body, opts),
  delete: (url, opts) => request('DELETE', url, null, opts),
  request,
};
