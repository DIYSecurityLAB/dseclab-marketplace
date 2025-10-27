"use client";

import { useCurrency } from "@/contexts/currency-context";
import { formatPrice } from "@/config/currency.config";

/**
 * Hook to format prices with the selected currency
 */
export function usePriceFormatter() {
  const { currency } = useCurrency();

  return {
    currency,
    formatPrice: (amount: number | string) => {
      return formatPrice(amount, currency);
    },
  };
}
