const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const ROLE_KEY = 'role';

export const saveAuth = ({ token, username, role }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(ROLE_KEY, role);
};

const isNullOrUndefinedString = (v) => v === null || v === undefined || v === 'null' || v === 'undefined' || v === '';

export const getToken = () => {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (isNullOrUndefinedString(raw)) return null;
  return raw;
};
export const getUsername = () => {
  const token = getToken();
  if (!token) return null;
  return localStorage.getItem(USERNAME_KEY);
};

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  return localStorage.getItem(ROLE_KEY);
};
// Basic JWT validation: check presence, not literal 'null', and if token has exp claim ensure it's not expired.
const base64UrlDecode = (str) => {
  try {
    // Replace URL-safe chars
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding
    while (str.length % 4) str += '=';
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return null;
  }
};

const tokenHasValidExp = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const payload = base64UrlDecode(parts[1]);
    if (!payload) return false;
    const obj = JSON.parse(payload);
    if (!obj.exp) return true; // no exp claim — assume valid
    // exp is in seconds since epoch
    return obj.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  return tokenHasValidExp(token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
};
