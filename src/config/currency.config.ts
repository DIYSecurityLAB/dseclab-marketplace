/**
 * Currency Configuration
 * Supported currencies and formatting
 */

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  format: (amount: number) => string;
}

export const currencies: Record<string, Currency> = {
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Real Brasileiro',
    format: (amount: number) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount),
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    format: (amount: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount),
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    format: (amount: number) =>
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount),
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    format: (amount: number) =>
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount),
  },
};

export const defaultCurrency = 'BRL';

/**
 * Country to currency mapping
 */
export const countryCurrencyMap: Record<string, string> = {
  BR: 'BRL',
  US: 'USD',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  PT: 'EUR',
  GB: 'GBP',
  // Add more as needed
};

/**
 * Format price with currency
 */
export function formatPrice(amount: number | string, currencyCode: string = defaultCurrency): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const currency = currencies[currencyCode] || currencies[defaultCurrency];
  return currency.format(numAmount);
}
