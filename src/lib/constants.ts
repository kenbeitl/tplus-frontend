/**
 * Application-wide constants
 */

// ============================================
// TEMPLATE IDs (Form Templates)
// ============================================
export const TEMPLATE_IDS = {
  // Help Centre Forms
  CONTACT_SUPPORT: 'contact-support',
  
  // GovConnect Forms
  GOVCONNECT_DUAL_DECLARATION: 'govconnect-dual-declaration',
  
  // BizConnect Forms
  NOTIFICATION_BIZCONNECT_LAUNCH: 'notification-bizconnect-launch',
  
  // PayConnect Forms
  PAYCONNECT_BANK_ACCOUNT: 'payconnect-bank-account-opening',
  PAYCONNECT_DEBT_COLLECTION: 'payconnect-debt-collection-services',
  PAYCONNECT_INTEGRATED_PAYMENT: 'payconnect-integrated-payment-solutions',
  PAYCONNECT_REMITTANCE: 'payconnect-local-cross-border-remittance',
  PAYCONNECT_TRADE_CARD: 'payconnect-trade-card-insurance',
  PAYCONNECT_TRADE_FINANCING: 'payconnect-trade-financing',
  
  // SafeConnect Forms
  SAFECONNECT_WEB_VULNERABILITY: 'safeconnect-web-vulnerability-assessment',
  SAFECONNECT_NETWORK_BOX: 'safeconnect-network-box-cybersecurity',
  
  // SignConnect Forms
  SIGNCONNECT_TRADELINK: 'signconnect-tradelink-esign',
  SIGNCONNECT_DOCUSIGN: 'signconnect-docusign',
  SIGNCONNECT_FADADA: 'signconnect-fadada',
} as const;

// Legacy alias for backward compatibility
export const FORM_IDS = TEMPLATE_IDS;

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: '/',
  LOGIN: '/',
  
  // Services
  SERVICES: '/services',
  SIGN_CONNECT: '/services/sign-connect',
  PAY_CONNECT: '/services/pay-connect',
  GOV_CONNECT: '/services/gov-connect',
  SAFE_CONNECT: '/services/safe-connect',
  BIZ_CONNECT: '/services/biz-connect',
  
  // Other Pages
  SUBSCRIPTIONS: '/subscriptions',
  SETTINGS: '/settings',
  HELP_CENTRE: '/help-centre',
} as const;

// ============================================
// SESSION & AUTH
// ============================================
export const SESSION = {
  DURATION_MS: 8 * 60 * 60 * 1000, // 8 hours
  STORAGE_KEY: 'hasSession',
  EXPIRY_KEY: 'sessionExpiry',
  COOKIE_NAME: 'hasSession',
  EXPIRY_COOKIE_NAME: 'sessionExpiry',
} as const;

// ============================================
// API CONFIGURATION
// ============================================
export const API = {
  TIMEOUT: 10000, // 10 seconds
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api',
} as const;

// ============================================
// UI CONFIGURATION
// ============================================
export const UI = {
  DRAWER_WIDTH: 240,
  DRAWER_MINI_WIDTH: 64,
  MAX_FORM_WIDTH: 800,
  DRAWER_STORAGE_KEY: 'drawerOpen',
  LOCALE_STORAGE_KEY: 'locale',
} as const;

// ============================================
// VALIDATION
// ============================================
export const VALIDATION = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[\d\s\-\+\(\)]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error - no response received',
  SERVER_ERROR: 'Server error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  FORM_SUBMIT_FAILED: 'Failed to submit form. Please try again.',
  FORM_VALIDATION_FAILED: 'Please fill in all required fields correctly.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  APPLICATION_SUBMITTED: 'Application submitted successfully! We will review your request and get back to you soon.',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
} as const;

// Type exports for type safety
export type TemplateId = typeof TEMPLATE_IDS[keyof typeof TEMPLATE_IDS];
export type FormId = TemplateId; // Legacy alias
export type Route = typeof ROUTES[keyof typeof ROUTES];
