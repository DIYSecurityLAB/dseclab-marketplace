/**
 * Translation key types
 * Auto-generated types for type-safe i18n usage
 */

export type TranslationKeys = {
  navbar: {
    links: {
      shop: string;
      buildKit: string;
      academy: string;
      support: {
        label: string;
        tutorials: string;
        contact: string;
        about: string;
        sovereignty: string;
      };
    };
    languageSelector: {
      label: string;
      english: string;
      portuguese: string;
    };
    auth: {
      login: string;
      account: string;
    };
  };
  product: {
    backToProducts: string;
    details: string;
    inStock: string;
    outOfStock: string;
    lowStock: string;
    quantity: string;
    selectVariant: string;
    buyButton: {
      buy: string;
      adding: string;
      unavailable: string;
    };
    pricing: {
      save: string;
    };
    paymentMethods: {
      title: string;
      creditCard: string;
      pix: string;
      bankSlip: string;
    };
    shipping: {
      calculatedAtCheckout: string;
    };
    addedToCart: string;
    error: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    total: string;
    checkout: string;
    continueShopping: string;
    remove: string;
    update: string;
    quantity: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    sort: string;
  };
  transactionShowcase: {
    title: {
      part1: string;
      part2: string;
    };
    description: {
      part1: string;
      part2: string;
    };
    cards: {
      blue: string;
      spectre: string;
      nomad: string;
      sparrow: string;
    };
  };
  footer: {
    about: string;
    support: string;
    legal: string;
    social: string;
    newsletter: string;
    copyright: string;
  };
};

/**
 * Flattened translation key paths for easier usage
 * Use these with t() function
 *
 * @example
 * t('navbar.links.shop')
 * t('product.buyButton.buy')
 * t('common.loading')
 */
export type TranslationKeyPath =
  | 'navbar.links.shop'
  | 'navbar.links.buildKit'
  | 'navbar.links.academy'
  | 'navbar.links.support.label'
  | 'navbar.links.support.tutorials'
  | 'navbar.links.support.contact'
  | 'navbar.links.support.about'
  | 'navbar.links.support.sovereignty'
  | 'navbar.languageSelector.label'
  | 'navbar.languageSelector.english'
  | 'navbar.languageSelector.portuguese'
  | 'navbar.auth.login'
  | 'navbar.auth.account'
  | 'product.backToProducts'
  | 'product.details'
  | 'product.inStock'
  | 'product.outOfStock'
  | 'product.lowStock'
  | 'product.quantity'
  | 'product.selectVariant'
  | 'product.buyButton.buy'
  | 'product.buyButton.adding'
  | 'product.buyButton.unavailable'
  | 'product.pricing.save'
  | 'product.paymentMethods.title'
  | 'product.paymentMethods.creditCard'
  | 'product.paymentMethods.pix'
  | 'product.paymentMethods.bankSlip'
  | 'product.shipping.calculatedAtCheckout'
  | 'product.addedToCart'
  | 'product.error'
  | 'cart.title'
  | 'cart.empty'
  | 'cart.subtotal'
  | 'cart.total'
  | 'cart.checkout'
  | 'cart.continueShopping'
  | 'cart.remove'
  | 'cart.update'
  | 'cart.quantity'
  | 'common.loading'
  | 'common.error'
  | 'common.retry'
  | 'common.close'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.search'
  | 'common.filter'
  | 'common.sort'
  | 'transactionShowcase.title.part1'
  | 'transactionShowcase.title.part2'
  | 'transactionShowcase.description.part1'
  | 'transactionShowcase.description.part2'
  | 'transactionShowcase.cards.blue'
  | 'transactionShowcase.cards.spectre'
  | 'transactionShowcase.cards.nomad'
  | 'transactionShowcase.cards.sparrow'
  | 'footer.about'
  | 'footer.support'
  | 'footer.legal'
  | 'footer.social'
  | 'footer.newsletter'
  | 'footer.copyright';
