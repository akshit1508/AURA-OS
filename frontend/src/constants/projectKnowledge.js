/**
 * AURA OS — Project Knowledge Registry
 *
 * Verified factual information for MESO and Medi Vault.
 * Used by auraKnowledge.js to power project-aware chat responses.
 *
 * RULES:
 * - No invented statistics or fabricated claims.
 * - No hype language: not "enterprise-grade", "revolutionary", "production-scale".
 * - Accuracy over impressiveness.
 */

export const PROJECT_KNOWLEDGE = {
  meso: {
    id: "meso",
    name: "MESO",
    github: "https://github.com/akshit1508/messo",

    shortDescription:
      "MESO is an intelligent mess management platform that digitizes hostel mess operations and adds an AI decision-support layer on top of the operational data.",

    problemHeadline:
      "Manual hostel mess operations make it difficult to connect student feedback with recurring operational issues. Without structured feedback and complaint tracking, mess administration cannot anticipate meal demand or systematically resolve dissatisfaction.",

    specialty: [
      "AI Decision Support",
      "Root Cause Investigation",
      "Operational Forecasting",
      "Policy Simulation",
      "Student Preference Capture",
    ],

    systemCapabilities: [
      {
        name: "Menu and Meal Operations",
        description:
          "Digital daily menu scheduling, announcement dispatch, and historical meal tracking for administrators.",
      },
      {
        name: "Student Food Feedback",
        description:
          "Daily meal rating capture providing a real-time quality signal directly from students.",
      },
      {
        name: "Polling and Preference Capture",
        description:
          "Structured voting engine for menu rotation and dietary preference consensus among students.",
      },
      {
        name: "Complaint Lifecycle Tracking",
        description:
          "End-to-end complaint submission, administrative auditing, and status resolution workflows.",
      },
      {
        name: "AI Decision Support Layer",
        description:
          "Three dedicated reasoning engines: WHY for root-cause investigation, WHAT NEXT for turnout forecasting, and WHAT IF for policy simulation.",
      },
    ],

    aiEngines: {
      why: {
        name: "WHY — Root Cause Investigation",
        summary:
          "The WHY engine investigates what changed between two historical time periods to surface patterns associated with a rating decline or anomaly.",
        methodology:
          "It compares historical rating windows, identifies statistical deviations in serving frequency, dish pairing, and time-since-last-serving, and surfaces them as possible contributing factors with a confidence signal. The output follows the format: Observation → Evidence → Possible Contributing Factor → Confidence level.",
        caution:
          "The engine identifies statistical associations. It does not establish causation. Correlation between a dish serving pattern and a rating change does not mean the dish caused the change. Responses use language like 'the data shows', 'this pattern was associated with', or 'one possible contributing factor is'. Never: 'this caused' or 'the AI proved'.",
        example:
          "If student ratings for dinner dropped over a two-week period, the WHY engine might surface that Dal Tadka was served four times in that window with an average gap of 1.5 days, which is lower than the historical average gap of 3 days. The analysis found this pattern is associated with rating fatigue in historical data, with a moderate confidence signal.",
      },

      whatNext: {
        name: "WHAT NEXT — Operational Forecasting",
        summary:
          "The WHAT NEXT engine estimates the expected rating for a dish if it were served next, based on historical patterns.",
        factors: [
          "Historical average rating for the dish",
          "Rating variation (standard deviation)",
          "Serving frequency and recency",
          "Time since last serving",
          "Recent rating trend (last 3 to 5 servings)",
          "Meal context (breakfast, lunch, dinner)",
          "Limited-history fallback for dishes with fewer than 3 data points",
        ],
        output:
          "The result is a forecast range, not a guarantee. If the model estimates a rating around 3.9, that reflects what historical patterns suggest. It does not guarantee that students will rate the dish 3.9 on the next serving.",
        caution:
          "The forecast is directional guidance. Student preferences shift over time, and the model reflects historical data only. It is a decision-support tool, not a prediction system.",
      },

      whatIf: {
        name: "WHAT IF — Policy Simulation",
        summary:
          "The WHAT IF engine simulates how a hypothetical menu change might affect student ratings before any real change is made.",
        howItWorks:
          "A user defines a scenario: replace a dish, change a serving interval, or pair dishes differently. The engine evaluates the current scenario and the hypothetical scenario using historical data, then runs multiple simulations to build a distribution of possible outcomes.",
        output:
          "Results are expressed as percentile ranges: P10 (pessimistic case), P50 (median expectation), P90 (optimistic case). These are not guaranteed ranges. They reflect the spread of simulated outcomes given historical data.",
        p10p50p90:
          "P10 means 10% of simulated runs produced a result at or below this value. P50 is the median. P90 means 90% of runs produced a result at or below this value. A wide P10-to-P90 range signals high uncertainty. A narrow range suggests more consistent historical patterns.",
        caution:
          "The simulation does not modify the live menu, student ratings, or operational data in any way. It is a hypothetical analysis. A high P90 does not guarantee a positive outcome if the hypothetical change is implemented.",
        exampleQuestions: [
          "What happens if we replace Dal Tadka with Chana Masala?",
          "What if we increase the serving gap for Rajma from 2 days to 4 days?",
          "What if we pair two high-rated dishes on the same meal?",
        ],
      },
    },

    architecture: {
      summary:
        "MESO is a three-tier layered architecture: a Next.js / TypeScript frontend communicates with a Spring Boot 3.2.5 backend gateway via REST APIs, which in turn coordinates with a MySQL relational database via Spring Data JPA and an internal Python FastAPI AI microservice.",
      tiers: [
        {
          tier: "Tier 01 — Presentation Layer",
          tech: "Next.js / TypeScript",
          description:
            "Interactive student dashboard, daily meal polling, complaint submission forms, and administrative operational intelligence console. Communicates with Spring Boot via REST APIs over HTTP/JSON.",
        },
        {
          tier: "Tier 02 — Application Core",
          tech: "Java 17 / Spring Boot 3.2.5",
          description:
            "Layered Controller-Service-DAO architecture handling Spring Security session-based authentication & RBAC, complaint resolution workflows, menu management, and polling aggregation. Acts as the main application gateway and proxies AI requests to the FastAPI microservice.",
        },
        {
          tier: "Tier 02B — Intelligence Service",
          tech: "Python / FastAPI",
          description:
            "Dedicated AI microservice hosting the three decision-support engines: WHY (active root-cause anomaly investigation), WHAT NEXT (turnout & rating forecasting), and WHAT IF (policy simulation). Python is used because statistical and numerical analysis benefits from the Python data ecosystem. The browser never calls FastAPI directly.",
        },
        {
          tier: "Tier 03 — Relational Persistence",
          tech: "MySQL / Spring Data JPA",
          description:
            "Stores student records, daily menus, meal ratings, poll votes, and complaint records. Accessed by Spring Boot via Spring Data JPA and Hibernate.",
        },
      ],
    },

    engineeringDecisions: [
      {
        question: "Why Spring Boot?",
        answer:
          "Spring Boot was chosen as the application backend because of its strong support for RESTful API design, built-in dependency injection, and robust ecosystem for session management, role-based access control, and database integration with Hibernate/JPA. The team had existing Java expertise, making Spring Boot the practical choice for building a reliable application gateway.",
      },
      {
        question: "Why FastAPI for the AI layer?",
        answer:
          "The AI decision-support engines use statistical analysis and numerical computation. Python's data ecosystem — including NumPy and statistical libraries — is better suited for this work than Java. FastAPI provides a lightweight, async-capable service layer for exposing the AI engines as internal REST endpoints. It keeps the AI logic cleanly separated from the Spring Boot application core.",
      },
      {
        question: "Why is the AI a separate service, not embedded in Spring Boot?",
        answer:
          "Separation of concerns. The application logic (menus, complaints, auth) and the AI analysis logic have different development cycles, dependencies, and runtime needs. A separate FastAPI service allows the AI layer to evolve independently without requiring changes to the Spring Boot backend. It also keeps the Spring Boot service stateless with respect to AI computations.",
      },
      {
        question: "Why not put AI logic inside Next.js?",
        answer:
          "AI computations that depend on historical data, statistical models, and large data queries belong on the server side. Putting them in Next.js would mean either running Python in a Node.js environment (not practical) or exposing raw data to the client. A backend microservice keeps the data and computation server-side.",
      },
      {
        question: "Why session authentication rather than JWT?",
        answer:
          "For the MESO use case — an internal hostel management system — session-based auth was chosen for simplicity and server-side control. Sessions are easier to invalidate immediately (for example, if a student graduates), which is important in a multi-role system where admin privileges need to be revocable.",
      },
      {
        question: "How does the system prevent simulations from modifying live data?",
        answer:
          "The WHAT IF engine operates exclusively on a copy of historical data passed into the simulation context. It does not write to the MySQL database during a simulation run. All simulation outputs are ephemeral — they exist in memory for the duration of the API response and are never persisted.",
      },
      {
        question: "How are AI results presented safely?",
        answer:
          "AI outputs are framed as analysis and estimates, not certainties. The frontend displays confidence indicators and uncertainty ranges alongside results. The system uses language like 'the analysis found' and 'this pattern was associated with' rather than 'the AI proved' or 'this caused', to avoid misleading administrators into treating probabilistic outputs as facts.",
      },
      {
        question: "Is MESO just a mess management app?",
        answer:
          "The operational features — menu management, feedback, complaints, polling — are the data collection layer. The differentiating part of MESO is the AI decision-support layer that operates on that data. Without the AI layer, it is a digitization tool. With it, it becomes a system that can help administrators investigate patterns, estimate demand, and evaluate policy changes before acting on them.",
      },
    ],

    technologies: [
      "Spring Boot 3.2.5",
      "Java 17",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "MySQL",
      "Spring Data JPA",
      "Spring Security",
      "Python",
      "REST APIs",
    ],

    suggestedQuestions: [
      "Explain the WHY engine",
      "How does WHAT NEXT work?",
      "Explain WHAT IF",
      "Show MESO architecture",
      "Why use FastAPI?",
    ],

    ctaHelper: "Ask AURA about the AI engines, architecture, or engineering decisions.",
  },

  "medi-vault": {
    id: "medi-vault",
    name: "Medi Vault",
    github: "https://github.com/akshit1508/Medi-Vault",

    shortDescription:
      "Medi Vault is a medical store management system focused on reducing medicine wastage through automated expiry monitoring, low-stock alerts, and transactional inventory control.",

    problemHeadline:
      "Unmonitored medicine expiry windows and checkout billing mismatches cause recurring inventory losses. Traditional systems lack automated expiration warnings, low-stock triggers, and atomic transactional inventory deductions during point-of-sale checkout.",

    specialty: [
      "Automated Expiry Monitoring",
      "Inventory Visibility",
      "Atomic POS Billing",
      "Spring Security with JWT",
      "Medicine Wastage Reduction",
    ],

    systemCapabilities: [
      {
        name: "Smart Expiry Warnings",
        description:
          "The system tracks medicine expiry dates and identifies medicines approaching expiration — within 15 days — upon login, so store operators can act before stock becomes unusable.",
      },
      {
        name: "Low-Stock Safety Alerts",
        description:
          "Real-time notifications triggered when any medicine's inventory level falls below a user-defined threshold, enabling proactive restocking before stockouts occur.",
      },
      {
        name: "Atomic POS Billing",
        description:
          "Thread-safe transactional stock deductions using Spring's @Transactional annotation. When a sale is completed, inventory is reduced atomically — preventing negative stock conditions and ensuring consistency between billing records and inventory counts.",
      },
      {
        name: "Unified Product Inventory",
        description:
          "Multi-attribute medicine lookup by formulation, batch number, brand name, and alphabetical index. Supports full inventory lifecycle: add, update, track, and query.",
      },
      {
        name: "Customer and Supplier Directory",
        description:
          "Complete vendor purchasing history and patient account transaction records, enabling traceability for both supply-side and demand-side operations.",
      },
    ],

    expiryFeature: {
      summary:
        "The expiry monitoring system tracks the expiry date of every medicine in inventory. When a store operator logs in, the system automatically checks for medicines expiring within the next 15 days and displays alerts. This allows the store to take action — return to supplier, discount, or quarantine — before the stock becomes unusable.",
      purpose:
        "The broader goal is reducing avoidable medicine wastage and improving inventory visibility. Expired stock that goes unnoticed is a direct financial loss and a patient safety risk.",
      caution:
        "No verified financial figures are claimed. The feature provides visibility; how operators act on that visibility determines the outcome.",
    },

    billing: {
      summary:
        "Billing in Medi Vault is backed by a transactional flow. When a sale is processed at the POS terminal, the system deducts the sold quantity from inventory within a single database transaction using Spring's @Transactional annotation.",
      whyItMatters:
        "A sale without an atomic inventory deduction can lead to the system showing stock that has already been sold — resulting in overselling, billing discrepancies, and stock reconciliation problems. The transactional approach ensures that a completed bill always corresponds to a completed inventory update, or neither happens.",
      caution:
        "This prevents logical race conditions in sequential use. The implementation uses @Transactional for consistency; the specific concurrency guarantees depend on the underlying MySQL isolation level configuration.",
    },

    architecture: {
      summary:
        "Medi Vault is a two-tier REST API architecture: a Next.js 14+ frontend communicates with a Spring Boot 3.3.4 backend via stateless REST APIs secured with JWT, which persists to a MySQL database via Spring Data JPA.",
      tiers: [
        {
          tier: "Tier 01 — Client Layer",
          tech: "Next.js 14+ (App Router)",
          description:
            "Interactive pharmacy dashboard, POS billing terminal, medicine inventory catalog, and alert notification center. All API calls are stateless, authenticated with JWT tokens.",
        },
        {
          tier: "Tier 02 — Application Backend",
          tech: "Spring Boot 3.3.4 (Java 21 LTS)",
          description:
            "REST API server with Spring Security 6 handling JWT-based stateless authentication. Layered Controller-Service-Repository architecture. Business logic for expiry checking, stock threshold alerts, and transactional billing.",
        },
        {
          tier: "Tier 03 — Relational Persistence",
          tech: "MySQL (Spring Data JPA)",
          description:
            "Normalized tables for products, medicine batches, formulation records, supplier data, customer data, and atomic invoice line items. Accessed via Spring Data JPA repositories.",
        },
      ],
    },

    security: {
      stack: "Spring Security 6 with JWT authentication",
      summary:
        "All API endpoints are protected by Spring Security 6. Authentication is stateless — each request includes a JWT token validated server-side. Role-based access control separates what store operators and administrators can access.",
    },

    recognition: [
      {
        title: "Government of India Copyright",
        description:
          "Medi Vault has been awarded a Government of India Copyright for the software.",
      },
      {
        title: "ICI3-2024 International Conference — Runner-Up",
        description:
          "Runner-up position at the ICI3-2024 International Conference held at AITR Indore, September 2024.",
      },
    ],

    engineeringDecisions: [
      {
        question: "Why Spring Boot?",
        answer:
          "Spring Boot provides a mature ecosystem for building REST APIs with layered architecture, built-in transaction management, and strong security integration via Spring Security. For a data-heavy system like a pharmacy inventory platform, Spring Boot's JPA integration and transaction support were practical choices.",
      },
      {
        question: "Why JWT instead of sessions?",
        answer:
          "JWT enables stateless authentication, which simplifies scaling and reduces server-side session storage requirements. For a pharmacy system where the frontend and backend are decoupled, stateless JWT tokens fit the REST API architecture well.",
      },
      {
        question: "Why is billing transactional?",
        answer:
          "A sale must reduce inventory atomically. If billing and inventory deduction are separate operations, a failure between them leaves the data in an inconsistent state — money recorded but stock not reduced, or vice versa. @Transactional ensures both operations succeed or both are rolled back.",
      },
      {
        question: "What makes Medi Vault different from a basic inventory app?",
        answer:
          "Three things: the automated 15-day expiry monitoring that surfaces upcoming expiration before it becomes a loss, the low-stock threshold system that prevents stockouts through proactive alerting, and the transactional POS billing that keeps inventory consistent with sales. Together they address the core operational problem: medicine wastage and inventory visibility.",
      },
    ],

    technologies: ["Spring Boot 3.3.4", "Next.js 14+", "MySQL", "Spring Data JPA", "Spring Security 6", "JWT", "Java 21 LTS", "Tailwind CSS"],

    suggestedQuestions: [
      "How does expiry monitoring work?",
      "How does Medi Vault reduce wastage?",
      "Explain the inventory system",
      "How does billing update stock?",
      "Show the architecture",
    ],

    ctaHelper: "Ask AURA about expiry monitoring, inventory, billing, or architecture.",
  },
};

export default PROJECT_KNOWLEDGE;
