/**
 * Payment Configuration
 * Payment methods and operator logos
 */

export interface PaymentOperator {
  name: string;
  logo: string;
  alt: string;
}

/**
 * Installment configuration
 */
export const installmentConfig = {
  maxInstallments: 12,
  minInstallmentValue: 5, // Minimum value per installment in BRL
};

/**
 * Payment operator logos
 */
export const paymentOperators: PaymentOperator[] = [
  {
    name: 'visa',
    logo: '//dseclab.io/cdn/shop/t/4/assets/VISA.svg?v=7465368297978241971759338361',
    alt: 'Visa',
  },
  {
    name: 'mastercard',
    logo: 'https://dseclab.io/cdn/shop/t/4/assets/MASTERCARD.svg?v=103501794080103759821759338361',
    alt: 'Mastercard',
  },
  {
    name: 'amex',
    logo: 'https://dseclab.io/cdn/shop/t/4/assets/AMEX.svg?v=156721050750723113511759338361',
    alt: 'American Express',
  },
  {
    name: 'pix',
    logo: 'https://dseclab.io/cdn/shop/t/4/assets/PIX.svg?v=106757000572440841201759338361',
    alt: 'Pix',
  },
];
