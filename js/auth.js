// ============================================================
// Auth — session management, user state, profile
// ============================================================
import { supabase } from './supabase-client.js';

let _user = null;
let _profile = null;
let _listeners = [];

// Listen for auth state changes (including INITIAL_SESSION from stored token)
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    _user = session?.user || null;
    _profile = null;
    _notify();
  } else if (event === 'SIGNED_OUT') {
    _user = null;
    _profile = null;
    _notify();
  }
});

// Initialize from existing session (handles page reload)
(async () => {
  const { data } = await supabase.auth.getSession();
  _user = data.session?.user || null;
  _notify();
})();

function _notify() {
  _listeners.forEach(fn => fn(_user));
}

// ========== Inactivity Timeout (15 min) ==========
const INACTIVITY_MS = 15 * 60 * 1000; // 15 minutes
let _inactivityTimer = null;

function _resetInactivityTimer() {
  if (_inactivityTimer) clearTimeout(_inactivityTimer);
  if (!_user) return;
  _inactivityTimer = setTimeout(async () => {
    await signOut();
    _notify();
  }, INACTIVITY_MS);
}

['mousemove','keydown','click','scroll','touchstart'].forEach(evt => {
  window.addEventListener(evt, _resetInactivityTimer, { passive: true });
});

// Start timer when user signs in
const _origNotify = _notify;
_notify = function() {
  _origNotify();
  if (_user) _resetInactivityTimer();
  else if (_inactivityTimer) { clearTimeout(_inactivityTimer); _inactivityTimer = null; }
};

export function onAuthChange(fn) {
  _listeners.push(fn);
  fn(_user);
  return () => { _listeners = _listeners.filter(f => f !== fn); };
}

export function getUser() {
  return _user;
}

export function getUserDisplay() {
  if (!_user) return '';
  // Phone users: show phone from metadata
  const phone = _user.user_metadata?.phone;
  if (phone) return phone;
  // Email users: show email (strip internal domain for phone users)
  const email = _user.email || '';
  if (email.includes('@phone.pcbuilder.local')) {
    return email.replace('p', '').replace('@phone.pcbuilder.local', '');
  }
  return email;
}

export function isLoggedIn() {
  return !!_user;
}

export async function getProfile() {
  if (!_user) return null;
  if (_profile) return _profile;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', _user.id)
    .single();
  _profile = data;
  return _profile;
}

export async function updateProfile(updates) {
  if (!_user) throw new Error('Not logged in');
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', _user.id)
    .select()
    .single();
  if (error) throw error;
  _profile = data;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
  _user = null;
  _profile = null;
  _notify();
}

// ========== Addresses (mobile number + physical address) ==========

export async function getAddresses() {
  if (!_user) return [];
  const { data } = await supabase
    .from('profiles')
    .select('addresses')
    .eq('id', _user.id)
    .single();
  try {
    const addrs = data?.addresses;
    return Array.isArray(addrs) ? addrs : [];
  } catch { return []; }
}

export async function saveAddress(address) {
  if (!_user) throw new Error('Not logged in');
  const existing = await getAddresses();
  if (!address.id) {
    address.id = crypto.randomUUID();
    address.createdAt = new Date().toISOString();
  }
  address.updatedAt = new Date().toISOString();
  const idx = existing.findIndex(a => a.id === address.id);
  if (idx >= 0) existing[idx] = address;
  else existing.unshift(address);
  await supabase
    .from('profiles')
    .update({ addresses: existing })
    .eq('id', _user.id);
  return existing;
}

export async function deleteAddress(addressId) {
  if (!_user) throw new Error('Not logged in');
  const existing = await getAddresses();
  const filtered = existing.filter(a => a.id !== addressId);
  await supabase
    .from('profiles')
    .update({ addresses: filtered })
    .eq('id', _user.id);
  return filtered;
}
