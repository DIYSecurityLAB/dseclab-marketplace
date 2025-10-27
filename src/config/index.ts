/**
 * Configuration - Central Exports
 * Import all configuration from this file for convenience
 */

// I18n Configuration
export * from './i18n';

// Navbar Configuration
export { NavbarLinks } from './navbar.config';
export type { INavbarLink, INavbarSublink, INavbarLinks } from './navbar.config';

// Landing Page Configuration
export {
  partners,
  featureSlides,
  influencerVideos,
  testimonialImages,
} from './landing.config';
export type {
  Partner,
  FeatureSlide,
  InfluencerVideo,
} from './landing.config';

// Shopify Configuration
export {
  shopifyConfig,
  validateShopifyConfig,
  validateShopifyAdminConfig,
  SHOPIFY_API_VERSION,
} from './shopify.config';

// Payment Configuration
export { paymentOperators, installmentConfig } from './payment.config';
export type { PaymentOperator } from './payment.config';

// Community Configuration
export { communityLinks, communityCards } from './community.config';
export type { CommunityLink, CommunityCard } from './community.config';

// Currency Configuration
export { currencies, defaultCurrency, formatPrice } from './currency.config';
export type { Currency } from './currency.config';
