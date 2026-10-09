"use client";

/**
 * AuraContext — Global AURA AI Assistant State & Conversation Provider.
 *
 * Provides:
 *   isOpen                — whether the chat panel is open
 *   projectContext        — { projectId, projectName, contextMode } | null
 *   messages              — active conversation history (persistent across routes & projects)
 *   input, setInput       — current chat input
 *   isLoading             — whether AURA is formulating a response
 *   handleSend            — send user message or suggestion
 *   updateProjectContext  — update active project without clearing dialogue history
 *   openWithProject       — opens chat and applies project context
 *   openGeneral           — opens chat in general portfolio mode
 *   close                 — closes chat without resetting conversation history
 *   clearConversation     — explicitly reset conversation if user chooses
 */

import { createContext, useCallback, useContext, useState } from "react";
import {
  getLocalAuraResponse,
  getProjectGreeting,
  getFollowUpSuggestions,
} from "@/components/aura/auraKnowledge";

export const PROJECT_KNOWLEDGE_SUGGESTIONS = {
  meso: [
    "EXPLORE WHY",
    "EXPLORE WHAT NEXT",
    "EXPLORE WHAT IF",
    "SYSTEM ARCHITECTURE",
    "WHY FASTAPI?",
    "HOW DOES MESO WORK?",
  ],
  "medi-vault": [
    "EXPIRY ALERTS",
    "REDUCING WASTAGE",
    "BILLING SYSTEM",
    "INVENTORY",
    "SECURITY",
    "ARCHITECTURE",
  ],
  general: [
    "ABOUT AKSHIT",
    "TECH STACK",
    "PROJECTS",
    "AI ENGINEERING",
    "EXPERIENCE",
  ],
};

function buildGreetingMessage(projectContext) {
  if (projectContext && projectContext.projectId) {
    const greeting = getProjectGreeting(projectContext.projectId);
    if (greeting) {
      return {
        id: Date.now(),
        role: "aura",
        content: greeting,
        suggestions:
          PROJECT_KNOWLEDGE_SUGGESTIONS[projectContext.projectId] ||
          PROJECT_KNOWLEDGE_SUGGESTIONS.general,
        timestamp: new Date(),
        isInitialGreeting: true,
      };
    }
  }
  return {
    id: 1,
    role: "aura",
    content: getProjectGreeting(null),
    suggestions: PROJECT_KNOWLEDGE_SUGGESTIONS.general,
    timestamp: new Date(),
    isInitialGreeting: true,
  };
}

const AuraContext = createContext(null);

export function AuraContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectContext, setProjectContext] = useState(null);

  const [messages, setMessages] = useState(() => [buildGreetingMessage(null)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update project context without clearing conversation history
  const updateProjectContext = useCallback((newCtx) => {
    setProjectContext((prevCtx) => {
      if (prevCtx?.projectId === newCtx?.projectId) {
        return newCtx;
      }

      setMessages((currentMessages) => {
        const hasUserMessages = currentMessages.some((m) => m.role === "user");

        // If user hasn't asked anything yet, update initial greeting
        if (!hasUserMessages) {
          return [buildGreetingMessage(newCtx)];
        }

        // If conversation is already active, preserve full history and append context notification
        if (newCtx && newCtx.projectId) {
          const projectName =
            newCtx.projectName ||
            (newCtx.projectId === "meso"
              ? "MESO"
              : newCtx.projectId === "medi-vault"
              ? "Medi Vault"
              : "Project");

          const switchNotice = {
            id: Date.now(),
            role: "aura",
            content: `Context updated: **${projectName}**.\nYou can ask about this project's architecture and engineering decisions, or continue asking general questions.`,
            suggestions:
              PROJECT_KNOWLEDGE_SUGGESTIONS[newCtx.projectId] ||
              PROJECT_KNOWLEDGE_SUGGESTIONS.general,
            timestamp: new Date(),
            isContextNotice: true,
          };

          return [...currentMessages, switchNotice];
        }

        return currentMessages;
      });

      return newCtx;
    });
  }, []);

  const openWithProject = useCallback(
    (ctx) => {
      updateProjectContext(ctx);
      setIsOpen(true);
    },
    [updateProjectContext]
  );

  const openGeneral = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Keep projectContext & messages intact so reopening preserves conversation continuity
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([buildGreetingMessage(projectContext)]);
    setInput("");
  }, [projectContext]);

  const fetchWithTimeout = async (url, options, timeoutMs = 9500) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  const handleSend = useCallback(
    async (overrideText) => {
      const text = (overrideText !== undefined ? overrideText : input).trim();

      if (!text || isLoading) {
        return;
      }

      const userMessage = {
        id: Date.now(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((current) => [...current, userMessage]);
      setInput("");
      setIsLoading(true);

      const activeContext = projectContextRef.current;
      let replyText = null;

      // 1. Dispatch request to server-side Next.js route (Google Gemini integration)
      try {
        const historyPayload = messages.slice(-10).map((m) => ({
          role: m.role === "user" ? "user" : "model",
          content: typeof m.content === "string" ? m.content : "",
        }));

        const response = await fetchWithTimeout(
          "/api/aura/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: text,
              projectContext: activeContext || null,
              history: historyPayload,
            }),
          },
          9500
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.response) {
            replyText = data.response;
          }
        }
      } catch (err) {
        console.log(
          "[AURA Client] Server API route unreachable, using deterministic fallback...",
          err
        );
      }

      // 2. Client-side verified portfolio knowledge fallback if server is offline or fails
      if (!replyText) {
        replyText = getLocalAuraResponse(text, activeContext || null);
      }

      const suggestions = getFollowUpSuggestions(text, activeContext || null);

      const auraMessage = {
        id: Date.now() + 1,
        role: "aura",
        content: replyText,
        suggestions: suggestions,
        timestamp: new Date(),
      };

      setMessages((current) => [...current, auraMessage]);
      setIsLoading(false);
    },
    [input, isLoading, messages]
  );

  return (
    <AuraContext.Provider
      value={{
        isOpen,
        projectContext,
        updateProjectContext,
        openWithProject,
        openGeneral,
        close,
        messages,
        input,
        setInput,
        handleSend,
        isLoading,
        clearConversation,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
}

export function useAuraContext() {
  const ctx = useContext(AuraContext);
  if (!ctx) throw new Error("useAuraContext must be used inside AuraContextProvider");
  return ctx;
}

