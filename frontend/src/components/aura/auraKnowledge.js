/**
 * Local Portfolio Knowledge & Fallback Generator for AURA Chat
 * Ensures instant, complete responses even if backend or AI microservice is temporarily offline.
 *
 * Supports two modes:
 *   1. General portfolio mode (projectContext = null)
 *   2. Project deep-dive mode (projectContext.contextMode = "project_deep_dive")
 */

import PROJECT_KNOWLEDGE from "@/constants/projectKnowledge";

export const PORTFOLIO_INFO = {
  name: "Akshit Bhandari",
  role: "AI Engineer & Java Backend Developer",
  location: "Indore, Madhya Pradesh, India",
  email: "bhandariakshit137@gmail.com",
  phone: "+91-9993024921",
  linkedin: "https://linkedin.com/in/akshit-bhandari-dev",
  github: "https://github.com/akshit1508",
  education: "B.Tech in Computer Science & Information Technology from Acropolis Institute of Technology and Research (AITR), Indore (2022-2026, CGPA: 7.41)",
};

/* ============================================================
   PROJECT DEEP-DIVE RESPONSE HANDLER
============================================================ */

function getProjectDeepDiveResponse(q, projectContext) {
  const pk = PROJECT_KNOWLEDGE[projectContext.projectId];
  if (!pk) return getLocalAuraResponse(q, null);

  const isMeso = projectContext.projectId === "meso";
  const isMediVault = projectContext.projectId === "medi-vault";

  // OVERVIEW
  if (
    q.includes("what is") ||
    q.includes("tell me about") ||
    (q.includes("explain") && q.length < 20) ||
    q.includes("overview") ||
    q.includes("introduce") ||
    q.includes("summary")
  ) {
    return (
      pk.shortDescription +
      "\n\n**The core problem it solves:**\n" +
      pk.problemHeadline +
      "\n\n**Core capabilities:**\n" +
      pk.systemCapabilities.map((c) => `- **${c.name}**: ${c.description}`).join("\n") +
      (isMeso
        ? "\n\n**What makes it distinct** is the AI decision-support layer — three engines (WHY, WHAT NEXT, WHAT IF) that operate on the operational data to help administrators investigate patterns, estimate demand, and simulate policy changes."
        : "") +
      (isMediVault
        ? "\n\n**What makes it distinct** is the combination of automated expiry monitoring, low-stock alerting, and atomic transactional billing — features that directly address medicine wastage and inventory inconsistency."
        : "")
    );
  }

  // MESO: WHY ENGINE
  if (
    isMeso &&
    (q.includes("why engine") ||
      q.includes("root cause") ||
      q.includes("why?") ||
      (q.includes("why") && q.includes("engine")))
  ) {
    const why = pk.aiEngines.why;
    return `**${why.name}**\n\n${why.summary}\n\n**How it works:**\n${why.methodology}\n\n**Example:**\n${why.example}\n\n**Important caveat:**\n${why.caution}`;
  }

  // MESO: WHAT NEXT ENGINE
  if (
    isMeso &&
    (q.includes("what next") ||
      q.includes("forecast") ||
      q.includes("predict") ||
      q.includes("turnout") ||
      q.includes("next meal"))
  ) {
    const wn = pk.aiEngines.whatNext;
    return (
      `**${wn.name}**\n\n${wn.summary}\n\n**Factors used in the forecast:**\n` +
      wn.factors.map((f) => `- ${f}`).join("\n") +
      `\n\n**What the output means:**\n${wn.output}\n\n**Caveat:**\n${wn.caution}`
    );
  }

  // MESO: WHAT IF ENGINE
  if (
    isMeso &&
    (q.includes("what if") ||
      q.includes("simulation") ||
      q.includes("simulate") ||
      q.includes("scenario") ||
      q.includes("hypothetical") ||
      q.includes("p10") ||
      q.includes("p50") ||
      q.includes("p90") ||
      q.includes("percentile"))
  ) {
    const wi = pk.aiEngines.whatIf;
    return (
      `**${wi.name}**\n\n${wi.summary}\n\n**How it works:**\n${wi.howItWorks}\n\n**Understanding P10 / P50 / P90:**\n${wi.p10p50p90}\n\n**Output:**\n${wi.output}\n\n**Caution:**\n${wi.caution}\n\n**Example questions it can answer:**\n` +
      wi.exampleQuestions.map((qex) => `- "${qex}"`).join("\n")
    );
  }

  // ARCHITECTURE (both)
  if (
    q.includes("architecture") ||
    q.includes("tech stack") ||
    (q.includes("stack") && !q.includes("skill")) ||
    q.includes("system design") ||
    q.includes("tier") ||
    q.includes("layers")
  ) {
    const arch = pk.architecture;
    return (
      `**${pk.name} — System Architecture**\n\n${arch.summary}\n\n` +
      arch.tiers.map((t) => `**${t.tier}** — ${t.tech}\n${t.description}`).join("\n\n")
    );
  }

  // WHY FASTAPI (MESO)
  if (
    isMeso &&
    (q.includes("fastapi") ||
      q.includes("python service") ||
      q.includes("why python") ||
      q.includes("why fast"))
  ) {
    const dec = pk.engineeringDecisions.find((d) =>
      d.question.toLowerCase().includes("fastapi")
    );
    if (dec) return `**${dec.question}**\n\n${dec.answer}`;
  }

  // ENGINEERING DECISIONS (both)
  if (
    q.includes("decision") ||
    q.includes("why spring") ||
    q.includes("why jwt") ||
    q.includes("why session") ||
    q.includes("why transact") ||
    q.includes("how does") ||
    q.includes("how is") ||
    q.includes("different from")
  ) {
    const matched = pk.engineeringDecisions.find((d) =>
      d.question
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && q.includes(word))
    );
    if (matched) return `**${matched.question}**\n\n${matched.answer}`;

    return (
      "**Engineering Decisions for " +
      pk.name +
      ":**\n\n" +
      pk.engineeringDecisions.map((d) => `**${d.question}**\n${d.answer}`).join("\n\n")
    );
  }

  // MEDI VAULT: EXPIRY
  if (
    isMediVault &&
    (q.includes("expiry") ||
      q.includes("expiration") ||
      q.includes("expire") ||
      q.includes("wastage") ||
      q.includes("waste"))
  ) {
    const exp = pk.expiryFeature;
    return `**Medi Vault — Expiry Monitoring**\n\n${exp.summary}\n\n**Why it matters:**\n${exp.purpose}\n\n*${exp.caution}*`;
  }

  // MEDI VAULT: BILLING
  if (
    isMediVault &&
    (q.includes("billing") ||
      q.includes("pos") ||
      q.includes("checkout") ||
      q.includes("transact") ||
      q.includes("stock deduct"))
  ) {
    const bil = pk.billing;
    return `**Medi Vault — Atomic POS Billing**\n\n${bil.summary}\n\n**Why atomic transactions matter:**\n${bil.whyItMatters}\n\n*${bil.caution}*`;
  }

  // MEDI VAULT: SECURITY
  if (
    isMediVault &&
    (q.includes("security") ||
      q.includes("jwt") ||
      q.includes("auth") ||
      q.includes("login") ||
      q.includes("spring security"))
  ) {
    const sec = pk.security;
    return `**Medi Vault — Security**\n\nStack: ${sec.stack}\n\n${sec.summary}`;
  }

  // MEDI VAULT: RECOGNITION
  if (
    isMediVault &&
    (q.includes("recognition") ||
      q.includes("award") ||
      q.includes("copyright") ||
      q.includes("conference") ||
      q.includes("achievement"))
  ) {
    return (
      "**Medi Vault — Recognition**\n\n" +
      pk.recognition.map((r) => `**${r.title}**\n${r.description}`).join("\n\n")
    );
  }

  // MEDI VAULT: INVENTORY
  if (
    isMediVault &&
    (q.includes("inventory") ||
      q.includes("stock") ||
      q.includes("medicine") ||
      q.includes("product") ||
      q.includes("low stock") ||
      q.includes("alert"))
  ) {
    const caps = pk.systemCapabilities.filter(
      (c) =>
        c.name.toLowerCase().includes("expiry") ||
        c.name.toLowerCase().includes("stock") ||
        c.name.toLowerCase().includes("inventory")
    );
    const unified = pk.systemCapabilities.find((c) => c.name.includes("Unified"));
    return (
      "**Medi Vault — Inventory Management**\n\n" +
      caps.map((c) => `**${c.name}**\n${c.description}`).join("\n\n") +
      (unified ? "\n\n**" + unified.name + "**\n" + unified.description : "")
    );
  }

  // TECHNOLOGIES
  if (q.includes("technolog") || q.includes("built with") || q.includes("tools")) {
    return (
      `**${pk.name} — Technology Stack**\n\n` +
      pk.technologies.map((t) => `- ${t}`).join("\n")
    );
  }

  // GITHUB / REPO
  if (
    q.includes("github") ||
    q.includes("repo") ||
    q.includes("code") ||
    q.includes("source")
  ) {
    return `The ${pk.name} repository is available at:\n\n${pk.github}`;
  }

  // CONTEXT SWITCH: user asks about the other project
  if (
    (isMeso &&
      (q.includes("medi vault") || q.includes("medivault") || q.includes("medi-vault"))) ||
    (isMediVault && (q.includes("meso") || q.includes("mess")))
  ) {
    return getLocalAuraResponse(q, null);
  }

  // DEFAULT PROJECT FALLBACK
  return (
    `You are exploring **${pk.name}** in deep-dive mode.\n\n${pk.shortDescription}\n\nYou can ask me about:\n` +
    pk.suggestedQuestions.map((sq) => `- ${sq}`).join("\n") +
    "\n\nOr ask any specific question about the system."
  );
}

/* ============================================================
   PROJECT-AWARE INITIAL GREETING (Requirement 18)
============================================================ */

export function getProjectGreeting(projectId) {
  if (projectId === "meso") {
    return (
      "AURA AI\n" +
      "MESO project context loaded.\n" +
      "Ask me about the architecture, AI engines, or engineering decisions."
    );
  }

  if (projectId === "medi-vault") {
    return (
      "AURA AI\n" +
      "Medi Vault project context loaded.\n" +
      "Ask me about inventory, expiry alerts, billing, or architecture."
    );
  }

  return (
    "AURA AI\n" +
    "How can I help you explore Akshit's work?"
  );
}

/* ============================================================
   FOLLOW-UP QUESTIONS GENERATOR (Requirement 19)
   Supplies contextual follow-up questions after every response
============================================================ */

export function getFollowUpSuggestions(query, projectContext) {
  const q = (query || "").toLowerCase().trim();

  // 1. PROJECT DEEP-DIVE MODE
  if (projectContext && (projectContext.contextMode === "project_deep_dive" || projectContext.contextMode === "project")) {
    const pid = projectContext.projectId;

    if (pid === "meso") {
      if (q.includes("why engine") || q.includes("why?")) {
        return [
          "EXPLORE WHAT NEXT",
          "EXPLORE WHAT IF",
          "SYSTEM ARCHITECTURE",
          "WHY FASTAPI?",
          "HOW DOES MESO WORK?",
        ];
      }
      if (q.includes("what next") || q.includes("forecast")) {
        return [
          "EXPLORE WHAT IF",
          "EXPLORE WHY",
          "SYSTEM ARCHITECTURE",
          "WHY FASTAPI?",
        ];
      }
      if (q.includes("what if") || q.includes("simulation")) {
        return [
          "EXPLORE WHAT NEXT",
          "EXPLORE WHY",
          "SYSTEM ARCHITECTURE",
          "WHY FASTAPI?",
        ];
      }
      if (q.includes("architecture") || q.includes("tier")) {
        return [
          "WHY FASTAPI?",
          "EXPLORE WHY",
          "EXPLORE WHAT NEXT",
          "EXPLORE WHAT IF",
        ];
      }
      if (q.includes("fastapi")) {
        return [
          "SYSTEM ARCHITECTURE",
          "EXPLORE WHY",
          "EXPLORE WHAT NEXT",
          "HOW DOES MESO WORK?",
        ];
      }

      const mesoPool = [
        "EXPLORE WHY",
        "EXPLORE WHAT NEXT",
        "EXPLORE WHAT IF",
        "SYSTEM ARCHITECTURE",
        "WHY FASTAPI?",
        "HOW DOES MESO WORK?",
      ];
      return mesoPool.filter((item) => !q.includes(item.toLowerCase())).slice(0, 5);
    }

    if (pid === "medi-vault") {
      if (q.includes("expiry") || q.includes("alert")) {
        return [
          "REDUCING WASTAGE",
          "BILLING SYSTEM",
          "INVENTORY",
          "SECURITY",
          "ARCHITECTURE",
        ];
      }
      if (q.includes("wastage") || q.includes("waste")) {
        return [
          "EXPIRY ALERTS",
          "BILLING SYSTEM",
          "INVENTORY",
          "ARCHITECTURE",
        ];
      }
      if (q.includes("billing") || q.includes("pos")) {
        return [
          "EXPIRY ALERTS",
          "REDUCING WASTAGE",
          "INVENTORY",
          "ARCHITECTURE",
        ];
      }
      if (q.includes("inventory") || q.includes("stock")) {
        return [
          "EXPIRY ALERTS",
          "BILLING SYSTEM",
          "SECURITY",
          "ARCHITECTURE",
        ];
      }
      if (q.includes("security") || q.includes("jwt")) {
        return [
          "ARCHITECTURE",
          "BILLING SYSTEM",
          "EXPIRY ALERTS",
          "INVENTORY",
        ];
      }

      const mediPool = [
        "EXPIRY ALERTS",
        "REDUCING WASTAGE",
        "BILLING SYSTEM",
        "INVENTORY",
        "SECURITY",
        "ARCHITECTURE",
      ];
      return mediPool.filter((item) => !q.includes(item.toLowerCase())).slice(0, 5);
    }
  }

  // 2. GENERAL PORTFOLIO MODE
  if (q.includes("meso") || q.includes("mess")) {
    return [
      "EXPLORE WHY",
      "SYSTEM ARCHITECTURE",
      "PROJECTS",
      "TECH STACK",
    ];
  }

  if (q.includes("medi-vault") || q.includes("medivault") || q.includes("medical")) {
    return [
      "EXPIRY ALERTS",
      "ARCHITECTURE",
      "PROJECTS",
      "TECH STACK",
    ];
  }

  if (q.includes("skill") || q.includes("java") || q.includes("backend") || q.includes("tech")) {
    return [
      "PROJECTS",
      "AI ENGINEERING",
      "EXPERIENCE",
      "ABOUT AKSHIT",
    ];
  }

  if (q.includes("experience") || q.includes("internship") || q.includes("work")) {
    return [
      "PROJECTS",
      "TECH STACK",
      "AI ENGINEERING",
      "ABOUT AKSHIT",
    ];
  }

  return [
    "ABOUT AKSHIT",
    "TECH STACK",
    "PROJECTS",
    "AI ENGINEERING",
    "EXPERIENCE",
  ];
}

/* ============================================================
   MAIN RESPONSE FUNCTION
============================================================ */

export function getLocalAuraResponse(query, projectContext) {
  const q = (query || "").toLowerCase().trim();

  // Route to project deep-dive handler if in project mode
  if (
    projectContext &&
    projectContext.projectId &&
    (projectContext.contextMode === "project" ||
      projectContext.contextMode === "project_deep_dive" ||
      !projectContext.contextMode)
  ) {
    return getProjectDeepDiveResponse(q, projectContext);
  }

  // 1. Experience & Internship
  if (
    q.includes("experience") ||
    q.includes("internship") ||
    q.includes("tech-coupling") ||
    q.includes("work") ||
    q.includes("company") ||
    q.includes("job")
  ) {
    return (
      "**Professional Experience:**\n\n" +
      "**Backend Java Developer Intern** at **Tech-Coupling** (Sep 2025 - Nov 2025)\n" +
      "Location: India\n\n" +
      "**Key Contributions:**\n" +
      "- Engineered a Spring Boot backend supporting 15+ features for a temple services e-commerce platform.\n" +
      "- Built 10+ RESTful APIs for catalog, orders, and booking workflows.\n" +
      "- Structured an optimized MySQL schema with 12+ tables.\n" +
      "- Optimized database queries and API response handling."
    );
  }

  // 2. MESO Project
  if (
    q.includes("meso") ||
    q.includes("mess") ||
    q.includes("hostel") ||
    q.includes("student feedback")
  ) {
    const pk = PROJECT_KNOWLEDGE["meso"];
    return (
      "**MESO — Intelligent Mess Management Platform**\n\n" +
      pk.shortDescription +
      "\n\n**The problem it addresses:**\n" +
      pk.problemHeadline +
      "\n\n**AI Decision Support Layer:**\n" +
      "- WHY: root-cause investigation of rating changes\n" +
      "- WHAT NEXT: forecasting expected dish ratings\n" +
      "- WHAT IF: simulating hypothetical menu policy changes\n\n" +
      "**Tech Stack:** " +
      pk.technologies.join(", ") +
      "\n\nRepository: " +
      pk.github
    );
  }

  // 3. Medi Vault Project
  if (
    q.includes("medi-vault") ||
    q.includes("medivault") ||
    q.includes("medi vault") ||
    q.includes("medical store") ||
    q.includes("pharmacy") ||
    q.includes("medicine") ||
    q.includes("expiry")
  ) {
    const pk = PROJECT_KNOWLEDGE["medi-vault"];
    return (
      "**Medi Vault — Medical Store Management System**\n\n" +
      pk.shortDescription +
      "\n\n**Key capabilities:**\n" +
      pk.systemCapabilities.map((c) => `- **${c.name}**: ${c.description}`).join("\n") +
      "\n\n**Recognition:** " +
      pk.recognition.map((r) => r.title).join(" | ") +
      "\n\n**Tech Stack:** " +
      pk.technologies.join(", ") +
      "\n\nRepository: " +
      pk.github
    );
  }

  // 4. AURA OS Project
  if (
    q.includes("aura os") ||
    q.includes("this portfolio") ||
    q.includes("operating system") ||
    q.includes("robot") ||
    q.includes("3d assistant") ||
    (q.includes("aura") && (q.includes("project") || q.includes("about") || q.includes("what is")))
  ) {
    return (
      "**Project-AURA (AURA OS)**\n\n" +
      "An intelligent, futuristic web-based portfolio operating system featuring an interactive 3D robot avatar, personal AI assistant, and modular control room.\n\n" +
      "**Architecture & Tech Stack:**\n" +
      "- **Frontend:** Next.js 15, React 19, Tailwind CSS, Three.js / React Three Fiber\n" +
      "- **Backend Gateway:** Spring Boot 3.x REST APIs with MySQL\n" +
      "- **AI Microservice:** Python FastAPI & Uvicorn for intelligent conversation and retrieval\n\n" +
      "**Features:** Cyberpunk OS boot sequence, dynamic 3D orb reacting to interactions, and multi-tier microservice integration."
    );
  }

  // 5. General Projects
  if (q.includes("project") || q.includes("projects") || q.includes("portfolio")) {
    return (
      "Here are Akshit's featured engineering projects:\n\n" +
      "**1. MESO — Intelligent Mess Management Platform**\n" +
      "Digitizes hostel mess operations with an AI decision-support layer (WHY / WHAT NEXT / WHAT IF engines). Built with Java, Spring Boot, Python FastAPI, MySQL, and Next.js.\n\n" +
      "**2. Medi Vault — Medical Store Management System**\n" +
      "Pharmacy inventory and billing system with automated expiry monitoring and atomic POS billing. Government of India Copyright holder and ICI3-2024 Runner-up.\n\n" +
      "**3. Project-AURA (AURA OS)**\n" +
      "Futuristic interactive portfolio OS featuring a 3D avatar, Next.js, Spring Boot backend, and Python FastAPI AI microservice.\n\n" +
      "Ask me about any specific project for architecture and engineering details."
    );
  }

  // 6. Backend / Java Skills
  if (
    q.includes("backend") ||
    q.includes("java") ||
    q.includes("spring") ||
    q.includes("hibernate") ||
    q.includes("mysql") ||
    q.includes("rest")
  ) {
    return (
      "**Backend Engineering Expertise:**\n\n" +
      "Akshit has extensive hands-on experience in Java Backend Development:\n" +
      "- **Frameworks:** Spring Framework, Spring Boot, Hibernate, Spring Security, Microservices\n" +
      "- **APIs:** RESTful API design following Controller-Service-DAO pattern\n" +
      "- **Databases:** MySQL schema design, query optimization, indexing\n" +
      "- **Systems Built:** MESO, Medi Vault, and temple services e-commerce at Tech-Coupling."
    );
  }

  // 7. AI & Python Skills
  if (
    q.includes("python") ||
    q.includes("ai") ||
    q.includes("machine learning") ||
    q.includes("ml") ||
    q.includes("llm") ||
    q.includes("data")
  ) {
    return (
      "**AI & Python Engineering:**\n\n" +
      "Akshit designs and integrates intelligent applications combining Python with backend architecture:\n" +
      "- **Core AI / ML:** Machine Learning, NumPy, Pandas, Matplotlib, Large Language Models (LLMs)\n" +
      "- **AI Tools:** ChatGPT, Julius AI, NotebookLM, Google AI Studio, Comet\n" +
      "- **AI Microservices:** Python FastAPI services connecting statistical analysis and ML with full-stack web applications."
    );
  }

  // 8. All Skills Overview
  if (q.includes("skill") || q.includes("skills") || q.includes("stack") || q.includes("technologies")) {
    return (
      "**Akshit Bhandari's Technical Skill Set:**\n\n" +
      "- **Languages:** Java (Advanced), Python (Strong), C, C++, SQL, JavaScript\n" +
      "- **Backend:** Spring Boot, Hibernate, REST APIs, Microservices, Spring Security, MySQL\n" +
      "- **Frontend:** React, Next.js, HTML5, CSS3, Tailwind CSS\n" +
      "- **AI & Data:** Machine Learning, NumPy, Pandas, Matplotlib, LLMs\n" +
      "- **Tools & Toolchain:** Git, GitHub, Docker, Postman, Maven, VS Code, Jupyter\n" +
      "- **Core CS:** DSA, OOP, DBMS, OS, Computer Networks, MVC Architecture, System Design"
    );
  }

  // 9. Education
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("acropolis") ||
    q.includes("cgpa") ||
    q.includes("btech")
  ) {
    return (
      "**Academic Background:**\n\n" +
      "- **Degree:** B.Tech in Computer Science & Information Technology\n" +
      "- **Institution:** Acropolis Institute of Technology and Research (AITR), Indore\n" +
      "- **Timeline:** 2022 - 2026\n" +
      "- **CGPA:** 7.41\n\n" +
      "Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, DBMS, Computer Networks, and Operating Systems."
    );
  }

  // 10. Achievements & Awards
  if (
    q.includes("achievement") ||
    q.includes("achievements") ||
    q.includes("award") ||
    q.includes("awards") ||
    q.includes("copyright") ||
    q.includes("conference") ||
    q.includes("certif")
  ) {
    return (
      "**Key Achievements & Honors:**\n\n" +
      "- Awarded Government of India Copyright for Medi Vault.\n" +
      "- Runner-up at ICI3-2024 International Conference at AITR Indore (Sep 2024).\n" +
      "- 3rd position in the Minor Project Exhibition, CSIT Department.\n" +
      "- NPTEL Certification in Programming in Java and Database Management Systems."
    );
  }

  // 11. Contact & Hiring
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("reach")
  ) {
    return (
      "**Get in Touch with Akshit Bhandari:**\n\n" +
      "- **Email:** [bhandariakshit137@gmail.com](mailto:bhandariakshit137@gmail.com)\n" +
      "- **LinkedIn:** [linkedin.com/in/akshit-bhandari-dev](https://linkedin.com/in/akshit-bhandari-dev)\n" +
      "- **GitHub:** [github.com/akshit1508](https://github.com/akshit1508)\n" +
      "- **Phone:** +91-9993024921\n" +
      "- **Location:** Indore, Madhya Pradesh, India\n\n" +
      "You can also send a direct message using the contact form at the bottom of the page."
    );
  }

  // 12. Resume
  if (q.includes("resume") || q.includes("cv")) {
    return (
      "You can view and download Akshit Bhandari's complete resume directly in this portfolio. " +
      "Click on the **Resume** button in the top navigation bar or navigate to /resume to view his full credentials, " +
      "internship at Tech-Coupling, projects (MESO, Medi Vault), and academic record."
    );
  }

  // 13. Greetings
  if (
    q.startsWith("hi") ||
    q.startsWith("hello") ||
    q.startsWith("hey") ||
    q === "aura" ||
    q.includes("who are you") ||
    q.includes("who is akshit")
  ) {
    return (
      "Hello. I am **AURA**, the AI assistant for **Akshit Bhandari**.\n\n" +
      "Akshit is an AI Engineer and Java Backend Developer based in Indore, India. I can answer questions about his:\n" +
      "- Projects — **MESO**, **Medi Vault**, **AURA OS**\n" +
      "- Technical skills — Java, Spring Boot, Python, React, MySQL, AI/ML\n" +
      "- Work experience at **Tech-Coupling**\n" +
      "- Education, achievements, and contact information\n\n" +
      "What would you like to know?"
    );
  }

  // 14. Default response
  return (
    "I'm AURA, the AI assistant for Akshit Bhandari's portfolio.\n\n" +
    "Akshit is an AI Engineer and Java Backend Developer who builds full-stack systems and intelligent applications.\n\n" +
    "You can ask me about:\n" +
    "- MESO or Medi Vault (engineering details, architecture, AI engines)\n" +
    "- Akshit's technical skills and experience\n" +
    "- Education, achievements, or how to get in touch"
  );
}