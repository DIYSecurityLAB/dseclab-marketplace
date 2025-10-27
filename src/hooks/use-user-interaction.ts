"use client";

import { useEffect, useState } from "react";

let hasInteracted = false;
const listeners: Set<(value: boolean) => void> = new Set();

// Set up global interaction listeners once
if (typeof window !== "undefined" && !hasInteracted) {
  const handleInteraction = () => {
    hasInteracted = true;
    listeners.forEach((listener) => listener(true));
    // Clean up listeners after first interaction
    ["click", "touchstart", "keydown"].forEach((event) => {
      window.removeEventListener(event, handleInteraction);
    });
  };

  ["click", "touchstart", "keydown"].forEach((event) => {
    window.addEventListener(event, handleInteraction, { once: true });
  });
}

export function useUserInteraction() {
  const [interacted, setInteracted] = useState(hasInteracted);

  useEffect(() => {
    if (hasInteracted) {
      setInteracted(true);
      return;
    }

    listeners.add(setInteracted);
    return () => {
      listeners.delete(setInteracted);
    };
  }, []);

  return interacted;
}
