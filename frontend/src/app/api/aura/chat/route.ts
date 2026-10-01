import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { resolveRelevantKnowledge, buildSystemInstruction, ProjectContext } from "@/lib/gemini/knowledgeResolver";
import { getLocalAuraResponse } from "@/components/aura/auraKnowledge";

interface ChatMessageInput {
  role: "user" | "aura" | "model" | "assistant";
  content?: string;
  text?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Invalid request. 'message' string is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();
    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // Guard against overly large payloads (max 1000 chars)
    const sanitizedMessage = message.slice(0, 1000);
    const projectContext: ProjectContext | null = body.projectContext || null;

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const modelName = process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";

    // Fallback if API key is not configured
    if (!apiKey) {
      const fallbackText = getLocalAuraResponse(sanitizedMessage, projectContext);
      return NextResponse.json({
        response: fallbackText,
        source: "local_knowledge",
      });
    }

    // 1. Resolve relevant knowledge without token bloat
    const relevantKnowledge = resolveRelevantKnowledge(sanitizedMessage, projectContext);
    const systemInstruction = buildSystemInstruction(relevantKnowledge, projectContext);

    // 2. Build bounded conversation history (last 8-10 turns max)
    const rawHistory: ChatMessageInput[] = Array.isArray(body.history) ? body.history : [];
    const boundedHistory = rawHistory.slice(-10);

    const contents = [];

    for (const item of boundedHistory) {
      const textContent = (item.content || item.text || "").trim();
      if (!textContent) continue;

      const role = item.role === "user" ? "user" : "model";
      contents.push({
        role,
        parts: [{ text: textContent.slice(0, 600) }],
      });
    }

    // Append the current user message
    contents.push({
      role: "user",
      parts: [{ text: sanitizedMessage }],
    });

    // 3. Call Google Gemini via official @google/genai SDK
    const ai = new GoogleGenAI({ apiKey });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API request timed out")), 9000)
    );

    const geminiPromise = ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        temperature: 0.35,
        maxOutputTokens: 800,
      },
    });

    const result = await Promise.race([geminiPromise, timeoutPromise]);
    const responseText = result.text?.trim();

    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({
      response: responseText,
      source: "gemini",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal error";
    // Sanitized server-side error logging (never leak API keys or user secrets)
    console.error("[AURA Server API Error]:", errorMessage);

    // Seamless fallback to deterministic local intelligence
    try {
      const body = await req.clone().json().catch(() => ({}));
      const fallbackReply = getLocalAuraResponse(
        body?.message || "",
        body?.projectContext || null
      );

      return NextResponse.json({
        response: fallbackReply,
        source: "fallback",
      });
    } catch {
      return NextResponse.json({
        response: "AURA is temporarily unable to reach its AI service. Please try again in a moment.",
        source: "friendly_error",
      });
    }
  }
}