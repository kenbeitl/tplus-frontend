'use client';

export function logout() {
  // Clear SessionStorage
  sessionStorage.removeItem('hasSession');
  sessionStorage.removeItem('sessionExpiry');
  
  // Clear cookies
  document.cookie = 'hasSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
  document.cookie = 'sessionExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
  
  // Redirect to login
  window.location.href = '/login';
}
