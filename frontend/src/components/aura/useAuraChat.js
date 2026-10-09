"use client";

import { useAuraContext } from "@/context/AuraContext";

/**
 * useAuraChat — Hook proxy to the global singleton AURA AI conversation state.
 * Ensures all components share one single conversation instance and provider.
 */
export default function useAuraChat() {
  return useAuraContext();
}