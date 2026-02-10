import Cookies from 'js-cookie';

const COOKIE_OPTIONS = { path: '/', sameSite: 'Lax' };

// Auth Token
export function getAuthToken() {
  return Cookies.get('auth_token') || null;
}

export function setAuthToken(token) {
  Cookies.set('auth_token', token, { ...COOKIE_OPTIONS, expires: 7 });
}

export function clearAuthToken() {
  Cookies.remove('auth_token', COOKIE_OPTIONS);
}

// Admin Auth Flag
export function getAdminAuth() {
  return Cookies.get('admin_auth') === 'true';
}

export function setAdminAuth(flag) {
  if (flag) {
    Cookies.set('admin_auth', 'true', { ...COOKIE_OPTIONS, expires: 7 });
  } else {
    Cookies.remove('admin_auth', COOKIE_OPTIONS);
  }
}

export function clearAdminAuth() {
  Cookies.remove('admin_auth', COOKIE_OPTIONS);
}

// Customer Auth Flag
export function getCustomerAuth() {
  return Cookies.get('customer_auth') === 'true';
}

export function setCustomerAuth(flag) {
  if (flag) {
    Cookies.set('customer_auth', 'true', { ...COOKIE_OPTIONS, expires: 7 });
  } else {
    Cookies.remove('customer_auth', COOKIE_OPTIONS);
  }
}

export function clearCustomerAuth() {
  Cookies.remove('customer_auth', COOKIE_OPTIONS);
}

// Customer Data (JSON)
export function getCustomerData() {
  try {
    const data = Cookies.get('customer_data');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCustomerData(data) {
  Cookies.set('customer_data', JSON.stringify(data), { ...COOKIE_OPTIONS, expires: 7 });
}

export function clearCustomerData() {
  Cookies.remove('customer_data', COOKIE_OPTIONS);
}

// Cart Items (JSON)
export function getCartItems() {
  try {
    const data = Cookies.get('cart_items');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setCartItems(items) {
  Cookies.set('cart_items', JSON.stringify(items), { ...COOKIE_OPTIONS, expires: 30 });
}

export function clearCartItems() {
  Cookies.remove('cart_items', COOKIE_OPTIONS);
}

// Clear all auth cookies
export function clearAllAuthCookies() {
  clearAuthToken();
  clearAdminAuth();
  clearCustomerAuth();
  clearCustomerData();
}

// Cookie Consent
export function getCookieConsent() {
  return Cookies.get('cookie_consent') || null;
}

export function setCookieConsent(level) {
  Cookies.set('cookie_consent', level, { ...COOKIE_OPTIONS, expires: 365 });
}
