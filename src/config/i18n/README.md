# Internationalization (i18n) Configuration

This directory contains all internationalization configuration and translation files for the application.

## Files

- `en.json` - English translations
- `pt.json` - Portuguese (Brasil) translations
- `routing.ts` - Next-intl routing configuration
- `request.ts` - Next-intl request configuration
- `locales.config.ts` - Locale metadata and configuration
- `types.ts` - TypeScript types for type-safe translations

## Supported Locales

- `en` - English
- `pt` - Portuguese (Brasil) - **Default**

## Available Translation Keys

### Navbar
- `navbar.links.shop` - Shop/Store link
- `navbar.links.buildKit` - Build your kit link
- `navbar.links.academy` - Academy link
- `navbar.links.support` - Support dropdown trigger
- `navbar.links.support.tutorials` - Tutorials sublink
- `navbar.links.support.contact` - Contact sublink
- `navbar.links.support.about` - About Us sublink
- `navbar.links.support.sovereignty` - Build Your Sovereignty sublink
- `navbar.languageSelector.*` - Language selector labels
- `navbar.auth.*` - Authentication links

### Product Pages
- `product.backToProducts` - Back to products link
- `product.details` - Product details heading
- `product.inStock` - In stock label
- `product.outOfStock` - Out of stock label
- `product.lowStock` - Low stock warning (supports {count} variable)
- `product.quantity` - Quantity label
- `product.selectVariant` - Variant selector label
- `product.buyButton.*` - Buy button states
- `product.pricing.save` - Savings label (supports {amount} variable)
- `product.paymentMethods.*` - Payment method descriptions
- `product.shipping.*` - Shipping information
- `product.addedToCart` - Success message
- `product.error` - Error message

### Shopping Cart
- `cart.title` - Cart page title
- `cart.empty` - Empty cart message
- `cart.subtotal` - Subtotal label
- `cart.total` - Total label
- `cart.checkout` - Checkout button
- `cart.continueShopping` - Continue shopping link
- `cart.remove` - Remove item button
- `cart.update` - Update quantity button
- `cart.quantity` - Quantity label

### Common UI Elements
- `common.loading` - Loading state
- `common.error` - Generic error message
- `common.retry` - Retry action
- `common.close` - Close button
- `common.save` - Save button
- `common.cancel` - Cancel button
- `common.delete` - Delete button
- `common.edit` - Edit button
- `common.search` - Search placeholder
- `common.filter` - Filter label
- `common.sort` - Sort label

### Transaction Showcase
- `transactionShowcase.title.*` - Section title parts
- `transactionShowcase.description.*` - Section description
- `transactionShowcase.cards.*` - Wallet names

### Footer
- `footer.about` - About section
- `footer.support` - Support section
- `footer.legal` - Legal section
- `footer.social` - Social media section
- `footer.newsletter` - Newsletter subscription
- `footer.copyright` - Copyright notice

## Usage

### In Server Components

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('product');

  return (
    <div>
      <h1>{t('details')}</h1>
      <button>{t('buyButton.buy')}</button>
    </div>
  );
}
```

### In Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('cart');

  return (
    <div>
      <h2>{t('title')}</h2>
      <p>{t('empty')}</p>
    </div>
  );
}
```

### With Variables

Some translation keys support variables:

```tsx
const t = useTranslations('product');

// Using variables
<p>{t('lowStock', { count: 5 })}</p>
// Output: "apenas 5 unidades" (PT) or "only 5 units" (EN)

<p>{t('pricing.save', { amount: 'R$ 50,00' })}</p>
// Output: "Economize R$ 50,00" (PT) or "Save R$ 50,00" (EN)
```

## Adding New Translations

1. Add the key to both `en.json` and `pt.json`
2. Update `types.ts` with the new key type
3. Update this README with the new key documentation

### Example

```json
// en.json
{
  "product": {
    "newKey": "New translation"
  }
}

// pt.json
{
  "product": {
    "newKey": "Nova tradução"
  }
}
```

## Currency Formatting

For Brazilian Real (BRL) formatting, use `Intl.NumberFormat`:

```tsx
const formatPriceBRL = (amount: string) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(amount));
};
```

## Best Practices

1. **Keep keys organized** - Group related translations under common namespaces
2. **Use descriptive keys** - Make key names self-explanatory
3. **Support variables** - Use {variable} syntax for dynamic content
4. **Maintain consistency** - Keep similar UI elements using similar translation patterns
5. **Test both locales** - Always verify translations in both EN and PT
6. **Avoid hardcoded strings** - All user-facing text should use translations
