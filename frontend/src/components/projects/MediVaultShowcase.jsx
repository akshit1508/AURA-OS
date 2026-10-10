"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ArchitecturePanel from "./ArchitecturePanel";
import { useAuraContext } from "@/context/AuraContext";
import PROJECT_KNOWLEDGE from "@/constants/projectKnowledge";

export default function MediVaultShowcase({ project }) {
  const [activeStep, setActiveStep] = useState("inventory");
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const { openWithProject } = useAuraContext();

  const pk = PROJECT_KNOWLEDGE["medi-vault"] || null;

  // Real verified pharmacy operational workflow sequence
  const workflowSteps = [
    {
      id: "inventory",
      stepNum: "01",
      name: "Drug Inventory Cataloging",
      headline: "Multi-Attribute Formulation & Stock Registry",
      badge: "STOCK INTEGRITY",
      badgeStyle: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      description:
        "Every incoming drug is cataloged by formulation, unique batch number, brand name, unit cost, and manufacturing/expiry dates. Eliminates inventory obscurity and provides instant search across the store catalog.",
      hasRealScreenshot: true,
      screenshot: "/projects/medivault.png",
      alt: "Medi Vault Pharmacy Dashboard and Inventory Status",
      keyMetrics: [
        { label: "Attribute Depth", val: "Formulation, batch, stock, expiry & price" },
        { label: "Search Indexing", val: "A–Z brand name, formulation & batch search" },
        { label: "Database Layer", val: "Spring Data JPA relational mappings" },
      ],
      workflowExplanation:
        "Real-time Inventory Status grid visibly tracks products (Augmentin, Azithral, Benadryl, Humalog, Cipcal, Dolo) with specific batch codes and live unit balances.",
    },
    {
      id: "expiry",
      stepNum: "02",
      name: "Automated Expiry & Safety Alerts",
      headline: "15-Day Critical Expiry Detection & Low-Stock Thresholds",
      badge: "PATIENT SAFETY // LOSS REDUCTION",
      badgeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      description:
        "Automated monitoring runs upon system login to identify medications expiring within the upcoming 15-day window. Paired with user-configured low-stock thresholds to prevent sudden stockouts.",
      hasRealScreenshot: false,
      contextNote:
        "Verified in dashboard metrics: 'Expiring in 15 Days (5 Drugs)' and 'Low Stock Warnings (4 Items)'. Direct alerts notify operators before shelf-life expires.",
      keyMetrics: [
        { label: "Threshold Warning", val: "Automated 15-day shelf-life trigger" },
        { label: "Low-Stock Radar", val: "Threshold alerts when stock dips below quota" },
        { label: "Loss Mitigation", val: "Enables early supplier return or quarantine" },
      ],
      workflowExplanation:
        "Rather than discovering expired drugs during customer checkout, the system actively raises immediate expiry notices upon login to preserve store revenue and safety.",
    },
    {
      id: "billing",
      stepNum: "03",
      name: "Point-of-Sale Checkout",
      headline: "Atomic @Transactional Stock Deduction",
      badge: "ATOMIC TRANSACTIONS",
      badgeStyle: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      description:
        "Point-of-sale checkout processing where item billing and inventory decrements execute inside a single Spring @Transactional block. Prevents inventory drift, race conditions, and negative stock balances.",
      hasRealScreenshot: false,
      contextNote:
        "Verified in UI action button: 'Launch POS Billing' and backend transactional service layers coordinating invoice line-items with stock updates.",
      keyMetrics: [
        { label: "Concurrency Control", val: "Thread-safe @Transactional stock reduction" },
        { label: "Negative Stock Shield", val: "Zero negative stock guarantee on invoice commit" },
        { label: "Invoice History", val: "Customer receipts tied to batch line items" },
      ],
      workflowExplanation:
        "If a checkout transaction fails or is cancelled mid-flight, database state rolls back cleanly. Invoices are committed only when stock deductions successfully finish.",
    },
    {
      id: "directory",
      stepNum: "04",
      name: "Traceability & Governance",
      headline: "Customer & Supplier Transaction Histories",
      badge: "COMPLIANCE & AUDIT",
      badgeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      description:
        "Maintains audit-compliant records of vendor procurement batches and customer purchase logs. Supports regulatory compliance and drug traceability.",
      hasRealScreenshot: false,
      contextNote:
        "Supported by Spring Security 6 with JWT authentication, ensuring only verified pharmacists and administrators access transaction ledgers.",
      keyMetrics: [
        { label: "Authentication", val: "Stateless JWT via Spring Security 6" },
        { label: "National Copyright", val: "Govt. of India Copyright Awarded" },
        { label: "Conference Recognition", val: "Runner-Up at ICI3-2024 International Conference" },
      ],
      workflowExplanation:
        "Enables full traceability from supplier invoice entry to customer retail dispensing with permanent database transaction logs.",
    },
  ];

  const currentWorkflow = workflowSteps.find((s) => s.id === activeStep) || workflowSteps[0];

  return (
    <div className="space-y-16 text-white">
      {/* ===================================================================
          1. HERO: PHARMACY WORKFLOW EDITORIAL SHOWCASE (TEAL/EMERALD THEME)
         =================================================================== */}
      <section className="relative">
        {/* Soft Teal / Emerald Ambient Glow */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-96 w-96 rounded-full bg-teal-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 -right-12 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

        {/* Top Micro-Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[3px] text-teal-400">
              CASE STUDY // {project.number}
            </span>
            <span className="font-mono text-xs text-white/20">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-gray-400">
              PHARMACY OPERATIONS &amp; INVENTORY CONTROL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-emerald-300">
              GOVT. COPYRIGHT AWARDED
            </span>
          </div>
        </div>

        {/* Editorial Heading & Pharmacy Positioning */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-sans">
              Medi Vault
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-[3px] text-teal-400 font-semibold sm:text-base">
              Smart Expiry Monitoring &amp; Atomic POS Billing Platform
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              A specialized medical store management system engineered to prevent pharmaceutical inventory losses through automated 15-day shelf-life warnings, low-stock threshold triggers, and thread-safe atomic checkout deductions.
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
                  className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/[0.08] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[2px] text-teal-300 transition-all hover:border-teal-400/80 hover:bg-teal-500/[0.18] hover:text-white"
                >
                  <span>Repository</span>
                  <span className="text-teal-400">↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={() =>
                  openWithProject({
                    projectId: "medi-vault",
                    projectName: "Medi Vault",
                    contextMode: "project_deep_dive",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/[0.1] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[2px] text-emerald-200 transition-all hover:border-emerald-300 hover:bg-emerald-400/[0.2] hover:text-white shadow-[0_0_20px_rgba(52,211,153,0.15)]"
              >
                <span>Explore with AURA AI</span>
                <span className="text-emerald-300">→</span>
              </button>
            </div>

            <p className="font-mono text-[11px] text-gray-500 tracking-wider">
              Java 21 LTS · Spring Boot 3.3.4 · Spring Security 6 (JWT) · Next.js 14+ · MySQL
            </p>
          </div>
        </div>

        {/* Real Product Screenshot in Realistic Browser Frame */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-teal-400/20 bg-[#030712] shadow-[0_20px_60px_rgba(3,7,18,0.8),0_0_40px_rgba(20,184,166,0.12)]">
          {/* Realistic Browser Top Chrome */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#041212] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 hidden sm:inline-block font-mono text-[10px] text-gray-500">
                https://medivault.internal/pharmacy/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-teal-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal-300 border border-teal-400/20">
                Live Build Capture
              </span>
              <span className="font-mono text-[10px] text-gray-500">Pharmacy Operations Console</span>
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative aspect-[16/10] w-full bg-[#02040a]">
            <Image
              src="/projects/medivault.png"
              alt="Medi Vault Pharmacy Operations Interface"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Frame Caption */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#031111] px-5 py-3">
            <p className="text-xs text-gray-300">
              <span className="font-semibold text-white">Verified UI:</span> Live pharmacy overview displaying 12 active inventory items, 5 approaching expiry within 15 days, low-stock warnings, and immediate POS billing launcher.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400">
              Figure 1.0 // Production Interface
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. PHARMACY OPERATIONAL SEQUENCE (THE 4 WORKFLOW STAGES)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.9)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-teal-400">
                PHARMACY WORKFLOW // OPERATIONAL LIFECYCLE
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              End-to-End Medicine Lifecycle
            </h2>
          </div>
          <p className="max-w-md text-xs text-gray-400 font-mono">
            Follow the operational sequence from batch receipt to checkout deduction. Built specifically around clinical pharmacy safety and inventory accountability.
          </p>
        </div>

        {/* Workflow Sequence Rail (Numbered Connected Pipeline) */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step) => {
            const isSelected = step.id === activeStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`
                  relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all
                  ${
                    isSelected
                      ? "border-teal-400/80 bg-teal-950/40 shadow-[0_0_25px_rgba(20,184,166,0.15)] ring-1 ring-teal-400/50"
                      : "border-white/10 bg-[#020b0b] hover:border-white/20 hover:bg-white/[0.02]"
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-400">
                      STAGE {step.stepNum}
                    </span>
                    <span className={`rounded-full border px-2 py-0.2 font-mono text-[8px] uppercase tracking-wider ${step.badgeStyle}`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-white">
                    {step.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                    {step.headline}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="font-mono text-[9px] text-gray-500">
                    Step {step.stepNum} of 04
                  </span>
                  <span className={`font-mono text-xs ${isSelected ? "text-teal-300" : "text-gray-600"}`}>
                    {isSelected ? "Inspecting [✓]" : "View [→]"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Walkthrough Surface */}
        <div className="mt-6 rounded-2xl border border-teal-500/20 bg-[#020d0d] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Visual or Explanatory Box */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#010808] p-2 sm:p-4">
              {currentWorkflow.hasRealScreenshot ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-teal-400/30">
                  <Image
                    src={currentWorkflow.screenshot}
                    alt={currentWorkflow.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                /* Restrained Explanatory Blueprint Layout */
                <div className="flex flex-col justify-between rounded-lg border border-dashed border-teal-400/25 bg-teal-950/[0.1] p-6 text-left min-h-[280px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[3px] text-teal-400">
                        STAGE {currentWorkflow.stepNum} // VERIFIED BEHAVIOR
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">
                        SPRING SERVICE LOGIC
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-white font-mono uppercase">
                      {currentWorkflow.headline}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                      {currentWorkflow.description}
                    </p>
                  </div>

                  <div className="mt-6 rounded-lg border border-white/10 bg-[#041414] p-3.5">
                    <p className="font-mono text-[11px] text-teal-300 font-medium">
                      Operational Workflow Note:
                    </p>
                    <p className="mt-1 font-mono text-xs text-gray-400">
                      {currentWorkflow.contextNote}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stage Specifications & Impact */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[3px] text-teal-300">
                  {currentWorkflow.badge}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  {currentWorkflow.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {currentWorkflow.workflowExplanation}
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                {currentWorkflow.keyMetrics.map((km) => (
                  <div key={km.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                      {km.label}
                    </span>
                    <p className="mt-0.5 text-xs font-semibold text-white">
                      {km.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. PROBLEM & OPERATIONAL RESPONSE (PHARMACY FOCUSED)
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: The Real Pharmacy Problem */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400">01 // THE CLINICAL CHALLENGE</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Unnoticed expiry dates cause direct financial loss &amp; patient risk.
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Medical stores stock thousands of SKUs across differing formulations and batch runs. Traditional retail software relies on manual physical shelf checks, leading to critical failure modes:
            </p>
            <ul className="space-y-3 pt-2 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span><strong className="text-gray-200">Undetected Expiry Windows:</strong> Drugs expire unnoticed on back shelves, rendering them unsellable and generating direct inventory write-offs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span><strong className="text-gray-200">Checkout Stock Discrepancies:</strong> Non-transactional checkout systems record payment without atomic inventory locks, producing negative counts and race conditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span><strong className="text-gray-200">Critical Stockouts:</strong> Essential prescription drugs run out without advance low-stock threshold warning.</span>
              </li>
            </ul>
          </div>

          {/* Right: Medi Vault Solution Architecture */}
          <div className="space-y-4 rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-950/20 to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-teal-400">02 // MEDI VAULT SOLUTION</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Automated triggers &amp; transactional safety guarantees.
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              Medi Vault was specifically engineered to replace passive inventory logs with proactive alerts and transactional guarantees.
            </p>

            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#021010] p-4">
                <span className="font-mono text-[10px] text-teal-400">SAFETY SHIELD 1</span>
                <p className="mt-1 text-sm font-semibold text-white">15-Day Early Alert</p>
                <p className="mt-1 text-xs text-gray-400">Routine checks on login isolate drugs entering their final 15-day shelf-life window for timely return.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#021010] p-4">
                <span className="font-mono text-[10px] text-emerald-400">SAFETY SHIELD 2</span>
                <p className="mt-1 text-sm font-semibold text-white">Atomic @Transactional POS</p>
                <p className="mt-1 text-xs text-gray-400">Stock decrements occur in the exact database transaction as billing, ensuring zero mismatch.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#021010] p-4">
                <span className="font-mono text-[10px] text-teal-400">SAFETY SHIELD 3</span>
                <p className="mt-1 text-sm font-semibold text-white">Low-Stock Radar</p>
                <p className="mt-1 text-xs text-gray-400">Dynamic warning when inventory units dip below safety thresholds, triggering reorders.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#021010] p-4">
                <span className="font-mono text-[10px] text-emerald-400">SAFETY SHIELD 4</span>
                <p className="mt-1 text-sm font-semibold text-white">Spring Security 6 &amp; JWT</p>
                <p className="mt-1 text-xs text-gray-400">Stateless JWT tokens secure checkout operations and audit logs against unauthorized tampering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. RECOGNITION & CREDENTIALS STRIP
         =================================================================== */}
      <section className="rounded-2xl border border-emerald-500/20 bg-emerald-950/[0.08] p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-emerald-300">
            OFFICIAL RECOGNITION // VERIFIED ACHIEVEMENTS
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#020e0e] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              INTELLECTUAL PROPERTY
            </span>
            <h4 className="mt-1.5 text-base font-bold text-white">
              Government of India Copyright
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Awarded an official Government of India Copyright for the Medi-Vault Medical Store Management System software.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#020e0e] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400">
              RESEARCH &amp; PRESENTATION
            </span>
            <h4 className="mt-1.5 text-base font-bold text-white">
              ICI3-2024 International Conference — Runner-Up
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Secured runner-up honors at the ICI3-2024 International Conference held at AITR Indore, September 2024.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SYSTEM ARCHITECTURE & TOPOLOGY
         =================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-teal-400">
                SYSTEM TOPOLOGY // ARCHITECTURE FLOW
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Two-Tier Secure Enterprise Architecture
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsArchitectureOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/[0.08] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[2px] text-teal-300 transition-all hover:border-teal-400 hover:bg-teal-500/20 hover:text-white"
          >
            <span>{isArchitectureOpen ? "Collapse Topology [–]" : "Expand Detailed Flow [↓]"}</span>
          </button>
        </div>

        {/* High-Level Architecture Flow Diagram */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#010c0c] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
            {/* Client Tier */}
            <div className="flex flex-col justify-between rounded-xl border border-teal-400/30 bg-teal-500/[0.04] p-5 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-teal-400">TIER 01 // CLIENT</span>
                <h4 className="mt-2 text-sm font-bold text-white">Next.js 14+ (App Router)</h4>
                <p className="mt-1 text-xs text-gray-400">Pharmacy Dashboard, POS Terminal, Expiry Radar, &amp; Inventory Lookup</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-teal-300">
                Stateless REST + JWT
              </div>
            </div>

            {/* Core Services Tier */}
            <div className="flex flex-col justify-between rounded-xl border border-teal-400/50 bg-teal-600/[0.08] p-5 text-center ring-1 ring-teal-400/30">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-teal-300">TIER 02 // APPLICATION CORE</span>
                <h4 className="mt-2 text-sm font-bold text-white">Spring Boot 3.3.4 (Java 21 LTS)</h4>
                <p className="mt-1 text-xs text-gray-400">Spring Security 6, JWT Filter, Expiry Triggers &amp; @Transactional Billing</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-emerald-300">
                Atomic Transactions
              </div>
            </div>

            {/* Relational Store */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">TIER 03 // PERSISTENCE</span>
                <h4 className="mt-2 text-sm font-bold text-white">MySQL (medivault)</h4>
                <p className="mt-1 text-xs text-gray-400">Spring Data JPA repositories: products, formulations, batches, and invoices</p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-2 font-mono text-[10px] text-gray-400">
                Relational Consistency
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
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[1.5px] text-gray-300 transition-colors hover:border-teal-400/40 hover:text-teal-200"
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
              className="font-mono text-xs text-teal-400 hover:text-teal-300 transition-colors"
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
        <section className="rounded-2xl border border-teal-500/20 bg-gradient-to-r from-teal-950/40 via-[#020e0e] to-emerald-950/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-teal-300">
                AURA AI // KNOWLEDGE REASONING ENGINE
              </p>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Have questions about Medi Vault&apos;s architecture or safety controls?
              </h3>
              <p className="text-xs text-gray-300 sm:text-sm max-w-xl">
                Ask AURA how the 15-day expiry warning triggers work, why @Transactional billing prevents negative inventory, or how Spring Security 6 with JWT protects the pharmacy API endpoints.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openWithProject({
                  projectId: "medi-vault",
                  projectName: "Medi Vault",
                  contextMode: "project_deep_dive",
                })
              }
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full border border-teal-400/40 bg-teal-400/[0.1] px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[2px] text-teal-200 shadow-[0_0_25px_rgba(20,184,166,0.15)] transition-all hover:border-teal-300 hover:bg-teal-400/[0.2] hover:text-white"
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
