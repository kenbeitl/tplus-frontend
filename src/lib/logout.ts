'use client';

export function logout() {
  // Clear SessionStorage
  sessionStorage.removeItem('hasSession');
  sessionStorage.removeItem('sessionExpiry');

  // Clear cookies
  document.cookie = 'hasSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
  document.cookie = 'sessionExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';

  // Redirect to external logout endpoint
  window.location.href = 'http://192.168.221.118:8082/logout';
}
