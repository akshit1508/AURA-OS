"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ArchitecturePanel from "./ArchitecturePanel";
import { useAuraContext } from "@/context/AuraContext";
import PROJECT_KNOWLEDGE from "@/constants/projectKnowledge";

export default function MesoShowcase({ project }) {
  const [activeTab, setActiveTab] = useState("intelligence");
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [activeEngine, setActiveEngine] = useState("why");
  const { openWithProject } = useAuraContext();

  const pk = PROJECT_KNOWLEDGE["meso"] || null;

  // Real verified areas of MESO
  const walkthroughTabs = [
    {
      id: "intelligence",
      label: "AI Decision Support",
      tag: "CORE DIFFERENTIATOR",
      headline: "Operational Intelligence & Feedback Telemetry",
      description:
        "The centerpiece of MESO: comparing student food satisfaction ratings across baseline periods to diagnose dissatisfaction shifts and meal performance without live data disruption.",
      hasScreenshot: true,
      screenshot: "/projects/meso.png",
      alt: "MESO Operational Intelligence Dashboard",
      subKeypoints: [
        { label: "Comparative Window", val: "Selected vs. Prior baseline analysis" },
        { label: "Meal Performance", val: "Lunch & Dinner service breakdowns" },
        { label: "Rating Distribution", val: "1★ to 5★ student distribution mapping" },
      ],
    },
    {
      id: "admin",
      label: "Admin Dashboard",
      tag: "MANAGEMENT CONSOLE",
      headline: "Central Mess Operations & Schedule Orchestration",
      description:
        "The administrative console oversees daily operational schedules, menu rotations, food announcements, and administrative audit trails from a single management command center.",
      hasScreenshot: false,
      contextNote:
        "Administrative view verified in Spring Boot backend controller routes (`/admin/dashboard`, `/admin/announcements`). Daily meal rotation and schedule publishing.",
      subKeypoints: [
        { label: "Daily Menu Scheduling", val: "Breakfast, lunch, snacks, and dinner" },
        { label: "Announcement Dispatch", val: "Broadcast notices for routine & special meals" },
        { label: "Audit & Access Control", val: "Spring Security session-based RBAC" },
      ],
    },
    {
      id: "feedback",
      label: "Student Food Feedback",
      tag: "REAL-TIME SIGNAL",
      headline: "Daily Meal Rating & Food Quality Consensus",
      description:
        "Direct student rating capture submitted per meal service. Feeds clean, timestamped numeric ratings and subjective signals directly into the statistical intelligence engine.",
      hasScreenshot: false,
      contextNote:
        "Real student rating endpoints capture meal satisfaction per student session, providing clean numerical data rather than anecdotal feedback.",
      subKeypoints: [
        { label: "Meal-Level Ratings", val: "1★ to 5★ star grading per meal interval" },
        { label: "Quality Indicator", val: "Real-time student sentiment telemetry" },
        { label: "Fatigue Detection", val: "Tracks repeated dish dissatisfaction patterns" },
      ],
    },
    {
      id: "polling",
      label: "Polling & Menu Rotation",
      tag: "STUDENT PREFERENCES",
      headline: "Democratic Menu Voting & Dietary Preference Polling",
      description:
        "Structured polling engine allowing students to vote on upcoming special menus and dietary preferences, giving the mess committee factual consensus data for menu revisions.",
      hasScreenshot: false,
      contextNote:
        "Active voting system with single-vote enforcement per authenticated student, tallying preferences for weekend menus and meal additions.",
      subKeypoints: [
        { label: "Democratic Consensus", val: "Structured voting on upcoming dishes" },
        { label: "Single-Vote Integrity", val: "Enforced via student session validation" },
        { label: "Menu Adaptation", val: "Informs admin rotation based on turnout votes" },
      ],
    },
    {
      id: "complaints",
      label: "Complaint Management",
      tag: "AUDITED WORKFLOWS",
      headline: "End-to-End Complaint Lifecycle Tracking",
      description:
        "Structured grievance lifecycle management from student submission to administrative review and verified resolution, eliminating lost complaints and verbal delays.",
      hasScreenshot: false,
      contextNote:
        "Multi-stage complaint tracking pipeline with status states (SUBMITTED → UNDER REVIEW → RESOLVED) backed by relational records in MySQL.",
      subKeypoints: [
        { label: "Structured Submission", val: "Categorized by hygiene, quality, or timing" },
        { label: "Admin Resolution Log", val: "Status transitions with admin notes" },
        { label: "Audit History", val: "Persistent database records for verification" },
      ],
    },
  ];

  const currentTab = walkthroughTabs.find((t) => t.id === activeTab) || walkthroughTabs[0];

  // AI Engines data verified against projectKnowledge.js
  const engines = [
    {
      id: "why",
      code: "01 // WHY ENGINE",
      name: "Root Cause Investigation",
      status: "ACTIVE / IMPLEMENTED",
      statusBadge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      purpose:
        "Investigates why student satisfaction dropped between two historical time windows by identifying statistically significant deviations in dish pairing and frequency.",
      inputs: [
        "Historical rating telemetry (1★ to 5★ per meal service)",
        "Selected evaluation window vs. baseline comparison period",
        "Dish serving frequency, recency, and gap intervals",
      ],
      outputs: [
        "Observation → Evidence → Contributing Factor → Confidence signal",
        "Identification of dish fatigue (e.g. repeated Dal Tadka within short interval)",
        "Noticeable rating drop classification without causal fabrication",
      ],
      caution:
        "Identifies statistical correlations, not deterministic proof. Language is strictly framed as observed patterns, never 'the AI proved'.",
    },
    {
      id: "whatNext",
      code: "02 // WHAT NEXT ENGINE",
      name: "Operational Forecasting",
      status: "PLANNED / FORMULATION STAGE",
      statusBadge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      purpose:
        "Estimates the expected rating range if a specific dish is scheduled for the upcoming meal, evaluating serving intervals, historical ratings, and trend decay.",
      inputs: [
        "Historical dish average and standard deviation (variance)",
        "Serving recency & time elapsed since last appearance",
        "Recent 3–5 serving trajectory and meal context (lunch/dinner)",
      ],
      outputs: [
        "Estimated rating band with directional guidance (e.g. ~3.9 expected)",
        "Fallback guidance for dishes with fewer than 3 historical data points",
        "Turnout sensitivity based on historical student preference trends",
      ],
      caution:
        "Directional guidance, not a certainty. Preferences shift and historical data provides statistical estimation rather than future guarantees.",
    },
    {
      id: "whatIf",
      code: "03 // WHAT IF ENGINE",
      name: "Policy Simulation",
      status: "PROTOTYPED / SANDBOXED",
      statusBadge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      purpose:
        "Allows mess administrators to simulate hypothetical menu rotations or interval adjustments in memory before modifying the real weekly menu.",
      inputs: [
        "Hypothetical schedule modifications (e.g. replace Dal with Chana Masala)",
        "Proposed serving interval changes (e.g. increase gap from 2 to 4 days)",
        "Isolated in-memory historical distribution snapshot",
      ],
      outputs: [
        "P10 (pessimistic), P50 (median), and P90 (optimistic) scenario spread",
        "Uncertainty corridor: wide spread signals high variance, narrow signals consistency",
        "Zero-mutation guarantee: zero write operations on live operational tables",
      ],
      caution:
        "Simulations run entirely in memory on isolated snapshots. Live database records are strictly unmodified.",
    },
  ];

  const currentEngine = engines.find((e) => e.id === activeEngine) || engines[0];

  return (
    <div className="space-y-16 text-white">
      {/* ===================================================================
          1. HERO: EDITORIAL ART-DIRECTED PRODUCT CASE STUDY (COBALT THEME)
         =================================================================== */}
      <section className="relative">
        {/* Soft Cobalt Ambient Glow */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 -right-12 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        {/* Top Micro-Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[3px] text-blue-400">
              CASE STUDY // {project.number}
            </span>
            <span className="font-mono text-xs text-white/20">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-gray-400">
              OPERATIONAL INTELLIGENCE &amp; DECISION SUPPORT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-blue-300">
              VERIFIED ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Editorial Heading & Two-Sentence Positioning */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-sans">
              MESO
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-[3px] text-blue-400 font-semibold sm:text-base">
              Intelligent Mess Operations &amp; AI Decision-Support Platform
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              A full-stack hostel operations system that unites student food feedback, polling, and complaint tracking with a dedicated Python statistical intelligence engine to diagnose rating fatigue and forecast meal demand.
            </p>
          </div>

          {/* Quick Actions & Meta */}
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-2.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/[0.08] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[2px] text-blue-300 transition-all hover:border-blue-400/80 hover:bg-blue-500/[0.18] hover:text-white"
                >
                  <span>Repository</span>
                  <span className="text-blue-400">↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={() =>
                  openWithProject({
                    projectId: "meso",
                    projectName: "MESO",
                    contextMode: "project_deep_dive",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/[0.1] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[2px] text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-400/[0.2] hover:text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                <span>Explore with AURA AI</span>
                <span className="text-cyan-300">→</span>
              </button>
            </div>

            <p className="font-mono text-[11px] text-gray-500 tracking-wider">
              Java 17 · Spring Boot 3.2.5 · Python FastAPI · Next.js · MySQL
            </p>
          </div>
        </div>

        {/* Real Product Screenshot in Realistic Browser Frame */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-400/20 bg-[#030712] shadow-[0_20px_60px_rgba(3,7,18,0.8),0_0_40px_rgba(59,130,246,0.12)]">
          {/* Realistic Browser Top Chrome */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#060b1e] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 hidden sm:inline-block font-mono text-[10px] text-gray-500">
                https://meso.internal/admin/intelligence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-blue-300 border border-blue-400/20">
                Live Build Capture
              </span>
              <span className="font-mono text-[10px] text-gray-500">WHY? Root Cause Engine</span>
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative aspect-[16/10] w-full bg-[#02040a]">
            <Image
              src="/projects/meso.png"
              alt="MESO Operational Intelligence Dashboard"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Frame Caption */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#050a1d] px-5 py-3">
            <p className="text-xs text-gray-300">
              <span className="font-semibold text-white">Verified UI:</span> Administrative comparative analytics comparing 2,931 student food reviews across distinct serving periods.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400">
              Figure 1.0 // Production Interface
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. PROBLEM & SYSTEM RESPONSE (EDITORIAL ASYMMETRIC LAYOUT)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left Column: The Real Operational Problem */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-red-400">01 // THE CHALLENGE</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hostel meal dissatisfaction was an invisible signal.
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Traditional hostel operations handle hundreds of meals daily relying on paper complaints or verbal student feedback. Without structured real-time preference capture, mess administration faces severe friction:
            </p>
            <ul className="space-y-3 pt-2 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-gray-200">Disconnected Feedback:</strong> Student ratings dropped without administration knowing which specific meal or serving frequency caused the decline.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-gray-200">Unmonitored Menu Fatigue:</strong> Dishes repeated too frequently (such as Dal Tadka every 1.5 days) trigger unrecorded dissatisfaction trends.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-gray-200">Grievance Backlogs:</strong> Student complaints lacked formal resolution stages, remaining unaddressed without accountability.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: MESO's Integrated Response */}
          <div className="space-y-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-400">02 // SYSTEM RESPONSE</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              An operational loop from daily plate to administrative decision.
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              MESO converts daily mess operations into an empirical feedback loop. Daily meals are published to students, ratings and complaints are gathered per authenticated session, and data feeds into statistical anomaly detection.
            </p>

            {/* Workflow Pipeline */}
            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#040817] p-4">
                <span className="font-mono text-[10px] text-blue-400">STEP 1</span>
                <p className="mt-1 text-sm font-semibold text-white">Menu &amp; Meal Dispatch</p>
                <p className="mt-1 text-xs text-gray-400">Daily scheduled breakfast, lunch, and dinner menus published via Spring Boot REST APIs.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#040817] p-4">
                <span className="font-mono text-[10px] text-cyan-400">STEP 2</span>
                <p className="mt-1 text-sm font-semibold text-white">Student Rating Capture</p>
                <p className="mt-1 text-xs text-gray-400">Authenticated students submit meal scores directly upon concluding meal services.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#040817] p-4">
                <span className="font-mono text-[10px] text-blue-400">STEP 3</span>
                <p className="mt-1 text-sm font-semibold text-white">Grievance Auditing</p>
                <p className="mt-1 text-xs text-gray-400">Formal complaints tracked through state transitions: Submitted → Under Review → Resolved.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#040817] p-4">
                <span className="font-mono text-[10px] text-cyan-400">STEP 4</span>
                <p className="mt-1 text-sm font-semibold text-white">AI Decision Support</p>
                <p className="mt-1 text-xs text-gray-400">Python FastAPI evaluates rating windows, highlighting anomalies &amp; forecasting future dish impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. INTERACTIVE PRODUCT WALKTHROUGH (TABS / SHOWCASE)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-blue-400">
              VERIFIED MODULES // PRODUCT WALKTHROUGH
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Inspect the Operational Surfaces
            </h2>
          </div>
          <p className="max-w-md text-xs text-gray-400 font-mono">
            Tab through verified application modules. Visual captures are shown where real assets exist; restrained explanatory layouts frame verified functional modules.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {walkthroughTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  rounded-xl border px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all
                  ${
                    isActive
                      ? "border-blue-400 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }
                `}
              >
                <span>{tab.label}</span>
                {tab.hasScreenshot && (
                  <span className="ml-2 rounded bg-cyan-400/20 px-1.5 py-0.5 text-[9px] text-cyan-300">
                    Live UI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Visual Presentation Area */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030614] p-2 sm:p-4">
            {currentTab.hasScreenshot ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-blue-400/30">
                <Image
                  src={currentTab.screenshot}
                  alt={currentTab.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              /* Restrained Explanatory Layout - NO FABRICATED SCREENSHOTS */
              <div className="flex flex-col justify-between rounded-xl border border-dashed border-white/15 bg-white/[0.01] p-8 text-left min-h-[320px]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[3px] text-blue-400">
                      SYSTEM MODULE SPECIFICATION
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                      VERIFIED SERVICE CODE
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white font-mono uppercase">
                    {currentTab.headline}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                    {currentTab.description}
                  </p>
                </div>

                <div className="mt-6 rounded-lg border border-white/10 bg-[#060b20] p-4">
                  <p className="font-mono text-[11px] text-blue-300 font-medium">
                    Implementation Architecture Note:
                  </p>
                  <p className="mt-1 font-mono text-xs text-gray-400">
                    {currentTab.contextNote}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Details & Specifications for this Tab */}
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[3px] text-cyan-300">
                {currentTab.tag}
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                {currentTab.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                {currentTab.description}
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              {currentTab.subKeypoints.map((pt) => (
                <div key={pt.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    {pt.label}
                  </span>
                  <p className="mt-0.5 text-xs font-semibold text-white">
                    {pt.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. AI DECISION SUPPORT WORKFLOW (WHY → WHAT NEXT → WHAT IF)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-cyan-300">
                DECISION PIPELINE // THREE ENGINES
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Connected Operational Intelligence Workflow
            </h2>
          </div>
          <p className="max-w-md text-xs text-gray-400 font-mono">
            Three specialized reasoning engines designed as an operational continuum. Strictly grounded in statistical analysis; no fabricated claims or black-box predictions.
          </p>
        </div>

        {/* Workflow Chain Visual Connectors */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {engines.map((eng, idx) => {
            const isSelected = eng.id === activeEngine;
            return (
              <button
                key={eng.id}
                type="button"
                onClick={() => setActiveEngine(eng.id)}
                className={`
                  relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all
                  ${
                    isSelected
                      ? "border-cyan-400/80 bg-blue-950/40 shadow-[0_0_30px_rgba(34,211,238,0.15)] ring-1 ring-cyan-400/50"
                      : "border-white/10 bg-[#040817] hover:border-white/20 hover:bg-white/[0.02]"
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-cyan-300">
                      {eng.code}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${eng.statusBadge}`}>
                      {eng.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {eng.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-3">
                    {eng.purpose}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="font-mono text-[10px] text-gray-500">
                    Step {idx + 1} of 3
                  </span>
                  <span className={`font-mono text-xs ${isSelected ? "text-cyan-300" : "text-gray-600"}`}>
                    {isSelected ? "Active View [✓]" : "Select [→]"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Engine Deep-Dive Inspection Panel */}
        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-[#030716] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400">
                {currentEngine.code} — DETAILED ENGINE SPECIFICATION
              </span>
              <h3 className="text-xl font-bold text-white sm:text-2xl mt-1">
                {currentEngine.name}
              </h3>
            </div>
            <span className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${currentEngine.statusBadge}`}>
              Status: {currentEngine.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left: Input & Output Contracts */}
            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-blue-300">
                  Input Telemetry Contract:
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-gray-300">
                  {currentEngine.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                  Verified Output Signal:
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-gray-300">
                  {currentEngine.outputs.map((out, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Operational Purpose & Ethical Caution */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.015] p-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
                  Operational Purpose:
                </p>
                <p className="mt-2 text-xs leading-relaxed text-gray-200">
                  {currentEngine.purpose}
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3.5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Caution &amp; Integrity Guardrail:
                </p>
                <p className="mt-1 text-xs text-amber-200/80 leading-relaxed">
                  {currentEngine.caution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SYSTEM TOPOLOGY & ARCHITECTURE (LAYERED FLOW)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-blue-400">
                SYSTEM TOPOLOGY // ARCHITECTURE FLOW
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Three-Tier Decoupled System Architecture
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsArchitectureOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/[0.08] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[2px] text-blue-300 transition-all hover:border-blue-400 hover:bg-blue-500/20 hover:text-white"
          >
            <span>{isArchitectureOpen ? "Collapse Topology [–]" : "Expand Detailed Flow [↓]"}</span>
          </button>
        </div>

        {/* Visual Architecture Flow Diagram (Always Visible High-Level Summary) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#030616] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 items-stretch">
            {/* Tier 1 */}
            <div className="flex flex-col justify-between rounded-xl border border-blue-400/30 bg-blue-500/[0.04] p-4 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-blue-400">TIER 01 // CLIENT</span>
                <h4 className="mt-2 text-sm font-bold text-white">Next.js &amp; TypeScript</h4>
                <p className="mt-1 text-xs text-gray-400">Student Dashboard, Menus, &amp; Complaints Console</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-blue-300">
                HTTP / JSON REST
              </div>
            </div>

            {/* Tier 2 */}
            <div className="flex flex-col justify-between rounded-xl border border-blue-400/50 bg-blue-600/[0.08] p-4 text-center ring-1 ring-blue-400/30">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-blue-300">TIER 02 // APPLICATION CORE</span>
                <h4 className="mt-2 text-sm font-bold text-white">Spring Boot 3.2.5 Gateway</h4>
                <p className="mt-1 text-xs text-gray-400">Session Auth, RBAC, Complaint Workflows, &amp; Proxying</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-blue-300">
                Java 17 Runtime
              </div>
            </div>

            {/* Tier 3: AI Microservice */}
            <div className="flex flex-col justify-between rounded-xl border border-cyan-400/40 bg-cyan-500/[0.06] p-4 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300">TIER 02B // INTELLIGENCE</span>
                <h4 className="mt-2 text-sm font-bold text-white">Python FastAPI Service</h4>
                <p className="mt-1 text-xs text-gray-400">Hosts WHY, WHAT NEXT, and WHAT IF reasoning engines</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-cyan-300">
                Numerical &amp; Statistical
              </div>
            </div>

            {/* Tier 4: DB */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">TIER 03 // PERSISTENCE</span>
                <h4 className="mt-2 text-sm font-bold text-white">MySQL Database</h4>
                <p className="mt-1 text-xs text-gray-400">Spring Data JPA, Hibernate, relational meal &amp; vote schemas</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-gray-400">
                Relational Storage
              </div>
            </div>
          </div>

          {/* Expandable Technical Panel */}
          {isArchitectureOpen && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <ArchitecturePanel project={project} onClose={() => setIsArchitectureOpen(false)} />
            </div>
          )}
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[1.5px] text-gray-300 transition-colors hover:border-blue-400/40 hover:text-blue-200"
              >
                [{tech}]
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Inspect Source on GitHub →
            </a>
          )}
        </div>
      </section>

      {/* ===================================================================
          6. AURA AI INTERACTIVE DEEP DIVE CTA (GLOBAL ASSISTANT HOOK)
         =================================================================== */}
      {pk && (
        <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-[#040817] to-cyan-950/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-cyan-300">
                AURA AI // KNOWLEDGE REASONING ENGINE
              </p>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Have questions about MESO&apos;s architecture or decisions?
              </h3>
              <p className="text-xs text-gray-300 sm:text-sm max-w-xl">
                Ask AURA about the WHY engine analysis, how FastAPI communicates with Spring Boot, or why session authentication was selected over JWT for this hostel deployment.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openWithProject({
                  projectId: "meso",
                  projectName: "MESO",
                  contextMode: "project_deep_dive",
                })
              }
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full border border-cyan-400/40 bg-cyan-400/[0.1] px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[2px] text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all hover:border-cyan-300 hover:bg-cyan-400/[0.2] hover:text-white"
            >
              <span>Explore with AURA AI</span>
              <span>→</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
