/**
 * AURA OS — Gemini Knowledge & Context Resolver
 *
 * Selectively resolves verified portfolio and project facts
 * based on user query and active project context, preventing token
 * bloat while strictly enforcing grounded responses.
 */

import PROJECT_KNOWLEDGE from "@/constants/projectKnowledge";
import { PORTFOLIO_INFO } from "@/components/aura/auraKnowledge";

export interface ProjectContext {
  projectId?: string;
  projectName?: string;
  contextMode?: string;
}

export function resolveRelevantKnowledge(query: string, projectContext: ProjectContext | null): string {
  const q = (query || "").toLowerCase().trim();
  const sections: string[] = [];

  const mentionsMeso =
    q.includes("meso") ||
    q.includes("messo") ||
    q.includes("mess") ||
    q.includes("hostel") ||
    q.includes("why engine") ||
    q.includes("what next") ||
    q.includes("what if");

  const mentionsMediVault =
    q.includes("medi-vault") ||
    q.includes("medivault") ||
    q.includes("medi vault") ||
    q.includes("medical store") ||
    q.includes("pharmacy") ||
    q.includes("expiry") ||
    q.includes("billing");

  const mentionsPortfolio =
    q.includes("akshit") ||
    q.includes("bhandari") ||
    q.includes("skill") ||
    q.includes("experience") ||
    q.includes("internship") ||
    q.includes("tech-coupling") ||
    q.includes("education") ||
    q.includes("college") ||
    q.includes("contact") ||
    q.includes("resume") ||
    q.includes("about") ||
    q.includes("who are you") ||
    q.includes("who is") ||
    q.includes("projects") ||
    q.includes("built");

  // 1. Resolve MESO Knowledge if explicitly mentioned or active context without conflicting mention
  const isMesoActive = (mentionsMeso || projectContext?.projectId === "meso") && !mentionsMediVault;
  if (isMesoActive) {
    const meso = PROJECT_KNOWLEDGE.meso;
    const mesoContent = `### VERIFIED PROJECT KNOWLEDGE: ${meso.name}
- Role/Type: ${meso.shortDescription}
- Problem Statement: ${meso.problemHeadline}
- Tech Stack: ${meso.technologies.join(", ")}
- Architecture Summary: ${meso.architecture.summary}
- Tiers:
${meso.architecture.tiers.map((t) => `  * ${t.tier} (${t.tech}): ${t.description}`).join("\n")}
- AI Decision Support Layer:
  * WHY Engine (Root Cause): ${meso.aiEngines.why.summary} Note: ${meso.aiEngines.why.caution}
  * WHAT NEXT Engine (Forecasting): ${meso.aiEngines.whatNext.summary} Factors: ${meso.aiEngines.whatNext.factors.join("; ")} Note: ${meso.aiEngines.whatNext.caution}
  * WHAT IF Engine (Simulation): ${meso.aiEngines.whatIf.summary} Percentiles: ${meso.aiEngines.whatIf.p10p50p90} Note: ${meso.aiEngines.whatIf.caution}
- Key Engineering Decisions:
${meso.engineeringDecisions.map((d) => `  * Q: ${d.question}\n    A: ${d.answer}`).join("\n")}
- GitHub: ${meso.github}`;
    sections.push(mesoContent);
  }

  // 2. Resolve Medi Vault Knowledge if explicitly mentioned or active context without conflicting mention
  const isMediVaultActive = (mentionsMediVault || projectContext?.projectId === "medi-vault") && !mentionsMeso;
  if (isMediVaultActive) {
    const medi = PROJECT_KNOWLEDGE["medi-vault"];
    const mediContent = `### VERIFIED PROJECT KNOWLEDGE: ${medi.name}
- Role/Type: ${medi.shortDescription}
- Problem Statement: ${medi.problemHeadline}
- Tech Stack: ${medi.technologies.join(", ")}
- Architecture Summary: ${medi.architecture.summary}
- Tiers:
${medi.architecture.tiers.map((t) => `  * ${t.tier} (${t.tech}): ${t.description}`).join("\n")}
- Smart Expiry Monitoring: ${medi.expiryFeature.summary}
- Atomic POS Billing: ${medi.billing.summary} Why it matters: ${medi.billing.whyItMatters}
- Security: ${medi.security.stack} — ${medi.security.summary}
- Recognition / Achievements: ${medi.recognition.map((r) => `${r.title}: ${r.description}`).join(" | ")}
- Key Engineering Decisions:
${medi.engineeringDecisions.map((d) => `  * Q: ${d.question}\n    A: ${d.answer}`).join("\n")}
- GitHub: ${medi.github}`;
    sections.push(mediContent);
  }

  // 3. Resolve General Portfolio Knowledge if requested or when no specific project is active
  if (mentionsPortfolio || (!isMesoActive && !isMediVaultActive)) {
    const portfolioContent = `### VERIFIED PORTFOLIO KNOWLEDGE:
- Developer Name: ${PORTFOLIO_INFO.name}
- Role: ${PORTFOLIO_INFO.role}
- Location: ${PORTFOLIO_INFO.location}
- Education: ${PORTFOLIO_INFO.education}
- Professional Experience:
  * Backend Java Developer Intern at Tech-Coupling (Sep 2025 - Nov 2025): Built Spring Boot backend for temple services e-commerce, 10+ RESTful APIs, MySQL schema with 12+ tables.
- Featured Projects:
  * MESO: Mess Management & Student Feedback Platform with AI Decision Support Layer (Spring Boot, Python FastAPI, Next.js, MySQL).
  * Medi Vault: Medical Store Management System with automated expiry alerts and atomic POS billing (Spring Boot, Next.js, MySQL). Holds Government of India Copyright & ICI3-2024 Runner-Up.
  * Project-AURA (AURA OS): Futuristic Web OS portfolio with interactive 3D robot avatar.
- Technical Skills:
  * Languages: Java (Advanced), Python (Strong), C, C++, SQL, JavaScript.
  * Backend: Spring Framework, Spring Boot, Hibernate, REST APIs, Microservices, Spring Security, MySQL.
  * Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS.
  * AI & Data: Machine Learning, NumPy, Pandas, Matplotlib, LLMs.
- Contact: Email (${PORTFOLIO_INFO.email}), LinkedIn (${PORTFOLIO_INFO.linkedin}), GitHub (${PORTFOLIO_INFO.github}).`;
    sections.push(portfolioContent);
  }

  return sections.join("\n\n");
}

export function buildSystemInstruction(resolvedKnowledge: string, projectContext: ProjectContext | null): string {
  const activeProjectNote = projectContext?.projectName
    ? `The user is currently browsing from the "${projectContext.projectName}" project showcase. This is helpful background context, but does NOT restrict the conversation.`
    : `The user is exploring the general portfolio.`;

  return `You are AURA, the intelligent personal AI assistant for Akshit Bhandari's engineering portfolio (AURA OS).
Akshit is an AI Engineer and Java Backend Developer based in Indore, Madhya Pradesh, India.

CONTEXT STATUS:
${activeProjectNote}

CRITICAL OPERATIONAL RULES:
1. TRUTHFULNESS & STRICT GROUNDING:
   - For any questions regarding Akshit Bhandari, his experience, education, skills, metrics, awards, and projects (MESO, Medi Vault, AURA OS), use ONLY the VERIFIED KNOWLEDGE provided below.
   - NEVER invent or hallucinate portfolio details. Never claim unverified enterprise clients, user metrics, performance percentages, revenue, production deployments, or awards.
   - If a specific portfolio fact is not present in the verified knowledge, politely state: "I don't have that detail in Akshit's portfolio information."

2. PROJECT CONTEXT IS NEVER A RESTRICTION:
   - When project context is active, it is purely additional context.
   - For general programming, computer science, or technology questions (e.g. "What is Python?", "What is a REST API?", "How does Docker work?", "Explain machine learning"), give a direct, natural, high-quality technical explanation using your general knowledge without forcing the conversation into the active project.
   - If the user asks about another project (e.g., asking about Medi Vault while in MESO mode), explain the requested project using the verified facts.

3. CAUSATION VS CORRELATION (MESO AI LAYER):
   - In MESO, the decision-support engines (WHY, WHAT NEXT, WHAT IF) analyze historical patterns and calculate statistical confidence.
   - Use language like "the data pattern is associated with", "possible contributing factor", or "historical analysis indicates".
   - Never claim correlation as absolute causation (avoid saying "this caused the problem" or "the AI proved").

4. PROFESSIONAL, INTENTIONAL TONE:
   - Respond concisely, with clear technical accuracy and well-structured Markdown.
   - Avoid buzzword hype (no "revolutionary", "groundbreaking", or "enterprise-grade" unless verified in source facts).

==================================================
VERIFIED KNOWLEDGE BASE:
==================================================
${resolvedKnowledge}
`;
}