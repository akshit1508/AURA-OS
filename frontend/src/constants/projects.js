/**
 * AURA OS - Projects System Archive
 * Strictly verified factual data for built systems and intentional roadmap slots.
 * No fabricated statistics, no fake telemetry, no profile fallback links.
 */

export const PROJECTS_DATA = [
  {
    id: "meso",
    number: "01",
    title: "MESO",
    titlePrefix: "ME",
    titleSuffix: "SO",
    shortTitle: "MESO",
    subtitle: "INTELLIGENT MESS MANAGEMENT PLATFORM",
    tagline: "AI-ASSISTED HOSTEL OPERATIONS & DECISION SUPPORT",
    status: "BUILT",
    domain: "INTELLIGENCE / DATA / DECISION SUPPORT",
    problemHeadline:
      "Manual hostel operations make it difficult to connect student feedback with recurring operational issues.",
    problemDetail:
      "Without structured real-time preference capture and complaint lifecycle tracking, mess administration cannot anticipate meal demand or systematically resolve student dissatisfaction.",
    systemCapabilities: [
      {
        number: "01",
        name: "Menu & Meal Operations",
        description:
          "Digital daily menu scheduling, announcement dispatch, and historical meal tracking.",
      },
      {
        number: "02",
        name: "Student Food Feedback",
        description:
          "Daily meal rating capture providing real-time quality signal directly from students.",
      },
      {
        number: "03",
        name: "Polling & Preference Capture",
        description:
          "Structured voting engine for menu rotation and dietary preference consensus.",
      },
      {
        number: "04",
        name: "Complaint Lifecycle Tracking",
        description:
          "End-to-end complaint submission, administrative auditing, and status resolution workflows.",
      },
      {
        number: "05",
        name: "AI Decision Support Layer",
        description:
          "Dedicated reasoning engines for root-cause analysis, turnout forecasting, and policy simulation.",
      },
    ],
    decisionEngines: {
      title: "AI DECISION SUPPORT",
      engines: [
        { code: "01 WHY", label: "ROOT CAUSE INVESTIGATION", note: "Dissatisfaction anomaly analysis" },
        { code: "02 WHAT NEXT", label: "OPERATIONAL FORECASTING", note: "Turnout & headcount prediction" },
        { code: "03 WHAT IF", label: "POLICY SIMULATION", note: "Menu & pricing scenario modeling" },
      ],
    },
    engineeringSpecs: [
      { label: "FRONTEND", value: "Next.js / React" },
      { label: "BACKEND", value: "Spring Boot" },
      { label: "AI SERVICE", value: "FastAPI / Python" },
      { label: "DATABASE", value: "MySQL" },
      { label: "AUTH", value: "Session + Role-Based" },
      { label: "AI ENGINES", value: "3 Dedicated Services" },
    ],
    engineeringFocus: [
      "AI Decision Support",
      "Layered REST Architecture",
      "Student Preference Capture",
      "Complaint Lifecycle",
      "Role-Based Workflows",
    ],
    technologies: [
      "Spring Boot",
      "Next.js",
      "FastAPI",
      "MySQL",
      "Python",
      "Java 21",
      "REST APIs",
      "Hibernate",
    ],
    image: "/projects/meso.png",
    imageAlt: "MESO - Intelligent Mess Management Platform Interface",
    github: "https://github.com/akshit1508/messo",
    live: null,
    architecture: true,
  },
  {
    id: "medi-vault",
    number: "02",
    title: "MEDI VAULT",
    titlePrefix: "MEDI",
    titleSuffix: "VAULT",
    shortTitle: "MEDI VAULT",
    subtitle: "MEDICAL STORE MANAGEMENT SYSTEM",
    tagline: "SMART EXPIRY MONITORING & ATOMIC POS BILLING",
    status: "BUILT",
    domain: "INVENTORY / TRANSACTIONS / SECURITY / AUTOMATION",
    problemHeadline:
      "Unmonitored medicine expiry windows and checkout billing mismatches cause recurring inventory losses.",
    problemDetail:
      "Traditional retail systems lack automated 15-day expiration warnings, low-stock threshold triggers, and atomic transactional inventory deductions during point-of-sale checkout.",
    systemCapabilities: [
      {
        number: "01",
        name: "Smart Expiry Warnings",
        description:
          "Automated triggers detecting medications approaching expiration dates upon system login.",
      },
      {
        number: "02",
        name: "Low-Stock Safety Alerts",
        description:
          "Real-time notifications triggered when medication inventory levels fall below user threshold.",
      },
      {
        number: "03",
        name: "Atomic POS Billing",
        description:
          "Thread-safe @Transactional stock deductions preventing negative inventory and race hazards.",
      },
      {
        number: "04",
        name: "Unified Product Inventory",
        description:
          "Multi-attribute lookup across formulation, batch number, brand name, and A-Z alphabetical index.",
      },
      {
        number: "05",
        name: "Customer & Supplier Directory",
        description:
          "Complete vendor purchasing history records and patient account transaction directories.",
      },
    ],
    decisionEngines: {
      title: "PHARMACY COMPLIANCE & SAFETY",
      engines: [
        { code: "01 SMART EXPIRY", label: "AUTOMATED 15-DAY WARNINGS", note: "Immediate shelf-life triggers" },
        { code: "02 LOW-STOCK", label: "THRESHOLD DETECTION", note: "Safety stock level enforcement" },
        { code: "03 ATOMIC POS", label: "@TRANSACTIONAL SYNC", note: "Zero negative stock guarantee" },
      ],
    },
    engineeringSpecs: [
      { label: "FRONTEND", value: "Next.js 14+ (App Router)" },
      { label: "BACKEND", value: "Spring Boot 3.3.4 (Java 21 LTS)" },
      { label: "DATABASE", value: "MySQL (Spring Data JPA)" },
      { label: "SECURITY", value: "Spring Security 6 & JWT" },
      { label: "TRANSACTIONS", value: "Atomic @Transactional" },
      { label: "RECOGNITION", value: "Govt. of India Copyright" },
    ],
    engineeringFocus: [
      "Smart Expiry Warnings",
      "Atomic POS Billing",
      "Spring Security 6 (JWT)",
      "Drug Formulation Indexing",
      "Spring Data JPA",
    ],
    technologies: [
      "Spring Boot 3.3.4",
      "Next.js 14+",
      "MySQL",
      "Spring Data JPA",
      "Spring Security 6",
      "JWT",
      "Java 21 LTS",
      "Tailwind CSS",
    ],
    image: "/projects/medivault.png",
    imageAlt: "Medi Vault - Medical Store Management System Interface",
    github: "https://github.com/akshit1508/Medi-Vault",
    live: null,
    architecture: true,
  },
  {
    id: "next-system",
    number: "03",
    title: "NEXT SYSTEM",
    titlePrefix: "NEXT",
    titleSuffix: "SYSTEM",
    shortTitle: "NEXT SYSTEM",
    subtitle: "AGENT-BASED PROJECT",
    tagline: "AUTONOMOUS AGENT REASONING & TOOL ORCHESTRATION",
    status: "COMING SOON",
    domain: "AUTONOMOUS AGENTS // REASONING PIPELINES // TOOL EXECUTION",
    problemHeadline:
      "Autonomous multi-step reasoning workflows require grounded context, tool execution sandboxes, and reliable task planning.",
    problemDetail:
      "A dedicated agent-based architecture currently being planned to synthesize multi-step reasoning, external tool execution, and state-managed contextual memory.",
    systemCapabilities: [
      {
        number: "01",
        name: "Agent Orchestration Pipeline",
        description:
          "Multi-agent reasoning loops and goal-oriented task planning.",
      },
      {
        number: "02",
        name: "Tool Execution Sandboxing",
        description:
          "Secure tool calling interface for database, API, and code execution.",
      },
      {
        number: "03",
        name: "Contextual Memory Layer",
        description:
          "State-managed long-term and short-term context synthesis.",
      },
    ],
    decisionEngines: null,
    engineeringSpecs: [
      { label: "STATUS", value: "In Architecture Planning" },
      { label: "DOMAIN", value: "Autonomous Agent Reasoning" },
      { label: "RUNTIME", value: "Planned Python Microservice" },
      { label: "ROADMAP", value: "AURA OS Phase 2" },
    ],
    engineeringFocus: [
      "Agent Orchestration",
      "Tool Sandboxing",
      "Context Memory",
      "Reasoning Pipelines",
    ],
    technologies: [
      "Multi-Agent Pipelines",
      "Python Microservices",
      "Tool Sandboxing",
      "Context Memory",
    ],
    image: null,
    isPlaceholder: true,
    github: null,
    live: null,
  },
];

export default PROJECTS_DATA;
