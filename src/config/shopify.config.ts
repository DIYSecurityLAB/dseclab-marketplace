/**
 * Shopify API configuration
 * Centralized Shopify settings
 */

/**
 * Shopify API version to use
 * Update this when upgrading to a newer API version
 */
export const SHOPIFY_API_VERSION = '2025-01';

/**
 * Shopify Storefront API settings
 */
export const shopifyConfig = {
  apiVersion: SHOPIFY_API_VERSION,
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  adminAccessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
};

/**
 * Validate required environment variables
 */
export function validateShopifyConfig() {
  if (!shopifyConfig.storeDomain) {
    throw new Error('SHOPIFY_STORE_DOMAIN is not defined');
  }
  if (!shopifyConfig.storefrontAccessToken) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined');
  }
}

export function validateShopifyAdminConfig() {
  validateShopifyConfig();
  if (!shopifyConfig.adminAccessToken) {
    throw new Error('SHOPIFY_ADMIN_ACCESS_TOKEN is not defined');
  }
}
