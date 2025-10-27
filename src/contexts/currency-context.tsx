"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { defaultCurrency } from "@/config/currency.config";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(defaultCurrency);

  // Load currency from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("preferred_currency");
    if (stored) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("preferred_currency", newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
