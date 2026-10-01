"use client";

import { useState, useRef } from "react";
import {
  getLocalAuraResponse,
  getProjectGreeting,
  getFollowUpSuggestions,
} from "./auraKnowledge";

// Suggested follow-up questions per project (Requirement 19)
const PROJECT_KNOWLEDGE_SUGGESTIONS = {
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
  if (projectContext) {
    const greeting = getProjectGreeting(projectContext.projectId);
    if (greeting) {
      return {
        id: Date.now(),
        role: "aura",
        content: greeting,
        suggestions: PROJECT_KNOWLEDGE_SUGGESTIONS[projectContext.projectId] || PROJECT_KNOWLEDGE_SUGGESTIONS.general,
        timestamp: new Date(),
      };
    }
  }
  return {
    id: 1,
    role: "aura",
    content: getProjectGreeting(null),
    suggestions: PROJECT_KNOWLEDGE_SUGGESTIONS.general,
    timestamp: new Date(),
  };
}

export default function useAuraChat(projectContext) {
  const [messages, setMessages] = useState(() => [buildGreetingMessage(projectContext)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // React 19 pattern: reset messages during render when project changes
  const prevProjectIdRef = useRef(projectContext ? projectContext.projectId : null);
  const currProjectId = projectContext ? projectContext.projectId : null;

  if (prevProjectIdRef.current !== currProjectId) {
    prevProjectIdRef.current = currProjectId;
  }

  // Session key tied to project ID to switch greetings safely during render
  const [sessionProjectId, setSessionProjectId] = useState(currProjectId);

  if (sessionProjectId !== currProjectId) {
    setSessionProjectId(currProjectId);
    setMessages([buildGreetingMessage(projectContext)]);
  }

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

  const handleSend = async (overrideText) => {
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
            projectContext: projectContext || null,
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
      console.log("[AURA Client] Server API route unreachable, using deterministic fallback...", err);
    }

    // 2. Client-side verified portfolio knowledge fallback if server is offline or fails
    if (!replyText) {
      replyText = getLocalAuraResponse(text, projectContext || null);
    }

    const suggestions = getFollowUpSuggestions(text, projectContext || null);

    const auraMessage = {
      id: Date.now() + 1,
      role: "aura",
      content: replyText,
      suggestions: suggestions,
      timestamp: new Date(),
    };

    setMessages((current) => [...current, auraMessage]);
    setIsLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    isLoading,
  };
}