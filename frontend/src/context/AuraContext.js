"use client";

/**
 * AuraContext — Global AURA AI state provider.
 *
 * Provides:
 *   isOpen           — whether the chat panel is open
 *   projectContext   — { projectId, projectName, contextMode } | null
 *   openWithProject  — opens chat in project deep-dive mode
 *   openGeneral      — opens chat in general portfolio mode
 *   close            — closes chat
 *
 * Layout wraps the full app with AuraContextProvider.
 * AuraAssistant reads from context.
 * Projects section writes via openWithProject.
 */

import { createContext, useCallback, useContext, useState } from "react";

const AuraContext = createContext(null);

export function AuraContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectContext, setProjectContext] = useState(null);

  const openWithProject = useCallback((ctx) => {
    setProjectContext(ctx);
    setIsOpen(true);
  }, []);

  const openGeneral = useCallback(() => {
    setProjectContext(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Keep projectContext while closing so it does not flash to null during close animation
    setTimeout(() => setProjectContext(null), 500);
  }, []);

  return (
    <AuraContext.Provider value={{ isOpen, projectContext, openWithProject, openGeneral, close }}>
      {children}
    </AuraContext.Provider>
  );
}

export function useAuraContext() {
  const ctx = useContext(AuraContext);
  if (!ctx) throw new Error("useAuraContext must be used inside AuraContextProvider");
  return ctx;
}
