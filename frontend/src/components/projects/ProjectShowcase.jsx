"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectPreviewFrame from "./ProjectPreviewFrame";
import ProjectPlaceholder from "./ProjectPlaceholder";
import ArchitecturePanel from "./ArchitecturePanel";
import { useAuraContext } from "@/context/AuraContext";
import PROJECT_KNOWLEDGE from "@/constants/projectKnowledge";

export default function ProjectShowcase({ project }) {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [prevProjectId, setPrevProjectId] = useState(project.id);
  const { openWithProject } = useAuraContext();

  // Reset architecture toggle when switching projects during render (React 19 pattern)
  if (prevProjectId !== project.id) {
    setPrevProjectId(project.id);
    setIsArchitectureOpen(false);
  }

  if (project.isPlaceholder) {
    return <ProjectPlaceholder project={project} />;
  }

  const isBuilt = project.status === "BUILT";
  const specs = project.engineeringSpecs || [];
  const capabilities = project.systemCapabilities || [];
  const pk = PROJECT_KNOWLEDGE[project.id] || null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* ========================================================
            1. TOP SYSTEM DOSSIER HEADER
           ======================================================== */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#040714]
            p-6
            shadow-[0_0_40px_rgba(59,130,246,0.06)]
            sm:p-8
          "
        >
          {/* Top metadata strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-[3px] text-blue-400">
                SYSTEM UNIT // {project.number}
              </span>
              <span className="hidden sm:inline font-mono text-xs text-gray-600">
                {"//"}
              </span>
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[2px] text-gray-400">
                {project.domain}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-[2px]
                  ${isBuilt ? "text-emerald-300" : "text-amber-300"}
                `}
              >
                {project.status}
              </span>
              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    isBuilt
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                  }
                `}
              />
            </div>
          </div>

          {/* Giant Editorial Title Typography */}
          <div className="mt-6">
            <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {project.titlePrefix}{" "}
              <span className="text-blue-400">{project.titleSuffix}</span>
            </h3>

            <p className="mt-2 font-mono text-xs uppercase tracking-[2px] text-gray-300 sm:text-sm">
              {project.subtitle}
            </p>

            <p className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-blue-400">
              {project.tagline}
            </p>
          </div>

          {/* Floating Product Surface */}
          <div className="mt-8">
            <ProjectPreviewFrame
              imageSrc={project.image}
              imageAlt={project.imageAlt}
              systemLabel={project.shortTitle}
            />
          </div>
        </div>

        {/* ========================================================
            2. HORIZONTAL SIGNATURE STRIP (Decision Engines / Core Services)
           ======================================================== */}
        {project.decisionEngines && (
          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.03] p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <p className="text-[10px] font-mono uppercase tracking-[4px] text-blue-300">
                {project.decisionEngines.title}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.decisionEngines.engines.map((engine) => (
                <div
                  key={engine.code}
                  className="rounded-xl border border-white/10 bg-[#040714] p-4 text-center transition-all hover:border-blue-400/40 hover:bg-blue-500/[0.04]"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[2px] text-cyan-300">
                    {engine.code}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-white">
                    {engine.label}
                  </p>
                  <p className="mt-1 text-[10px] font-mono text-gray-400">
                    {engine.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            3. EDITORIAL PROBLEM STATEMENT & SYSTEM GENESIS
           ======================================================== */}
        <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
              Problem Statement {"//"} System Genesis
            </h4>
          </div>

          <div className="mt-5">
            <p className="text-base font-medium leading-relaxed text-gray-100 sm:text-lg">
              {project.problemHeadline}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {project.problemDetail}
            </p>
          </div>
        </div>

        {/* ========================================================
            4. SYSTEM CAPABILITIES (Numbered Architectural Modules)
           ======================================================== */}
        {capabilities.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
                System Capabilities {"//"} Verified Mechanics
              </h4>
            </div>

            <div className="mt-6 space-y-4">
              {capabilities.map((cap) => (
                <div
                  key={cap.number}
                  className="group flex flex-col gap-1 border-b border-white/5 pb-4 last:border-b-0 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-blue-400">
                      {cap.number}
                    </span>
                    <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                      {cap.name}
                    </h5>
                  </div>
                  <p className="pl-7 text-xs leading-relaxed text-gray-400">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            5. OPEN ENGINEERING SPECIFICATIONS GRID
           ======================================================== */}
        {specs.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
                Engineering Specifications {"//"} Architectural Constraints
              </h4>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-white/5 bg-white/[0.015] p-3.5 transition-colors hover:border-blue-400/20"
                >
                  <p className="text-[8px] font-mono uppercase tracking-[2px] text-gray-500">
                    {spec.label}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-white">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            6. ARCHITECTURE TOPOLOGY TRIGGER & PANEL
           ======================================================== */}
        <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
                System Topology {"//"} Interactive Architecture
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setIsArchitectureOpen((prev) => !prev)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/40
                bg-blue-500/[0.08]
                px-5
                py-2
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[2px]
                text-blue-300
                transition-all
                duration-300
                hover:border-blue-400/80
                hover:bg-blue-500/[0.18]
                hover:text-white
                shadow-[0_0_20px_rgba(59,130,246,0.1)]
              "
            >
              <span>{isArchitectureOpen ? "Hide Topology [–]" : "View Topology [↓]"}</span>
            </button>
          </div>

          {/* Expandable Architecture View */}
          {isArchitectureOpen && (
            <div className="mt-6">
              <ArchitecturePanel
                project={project}
                onClose={() => setIsArchitectureOpen(false)}
              />
            </div>
          )}
        </div>

        {/* ========================================================
            7. TECHNOLOGIES & REPOSITORY ACTION
           ======================================================== */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pt-2">
          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-3.5
                  py-1
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[2px]
                  text-gray-300
                  transition-colors
                  hover:border-blue-400/40
                  hover:text-blue-200
                "
              >
                [{tech}]
              </span>
            ))}
          </div>

          {/* Verified Repository Button - Only if verified GitHub repository exists */}
          {project.github && (
            <div className="shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-blue-400/40
                  bg-blue-500/[0.08]
                  px-7
                  py-3
                  font-mono
                  text-xs
                  font-medium
                  uppercase
                  tracking-[2px]
                  text-blue-300
                  shadow-[0_0_25px_rgba(59,130,246,0.12)]
                  transition-all
                  duration-300
                  hover:border-blue-400/80
                  hover:bg-blue-500/[0.18]
                  hover:text-white
                  hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]
                "
              >
                <span>VIEW REPOSITORY</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          )}
        </div>

        {/* ========================================================
            8. AURA AI DEEP DIVE CTA
            Only shown for BUILT projects with a knowledge registry entry.
           ======================================================== */}
        {pk && (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.07]
              bg-[#040714]
              p-6
              shadow-[0_0_30px_rgba(59,130,246,0.05)]
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* LEFT: label + helper */}
              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[3px]
                    text-blue-400/70
                  "
                >
                  AURA AI / PROJECT DEEP DIVE
                </p>
                <p
                  className="
                    mt-2
                    text-sm
                    text-white/80
                  "
                >
                  Study {project.shortTitle || project.title} in depth — ask AURA about the architecture, engineering decisions, and how each system works.
                </p>
                {pk.ctaHelper && (
                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-gray-500
                    "
                  >
                    {pk.ctaHelper}
                  </p>
                )}
              </div>

              {/* RIGHT: CTA button */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    openWithProject({
                      projectId: project.id,
                      projectName: project.shortTitle || project.title,
                      contextMode: "project_deep_dive",
                    })
                  }
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-cyan-300/30
                    bg-cyan-300/[0.06]
                    px-7
                    py-3
                    font-mono
                    text-xs
                    font-medium
                    uppercase
                    tracking-[2px]
                    text-cyan-300
                    shadow-[0_0_20px_rgba(34,211,238,0.08)]
                    transition-all
                    duration-300
                    hover:border-cyan-300/70
                    hover:bg-cyan-300/[0.12]
                    hover:text-white
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.20)]
                    whitespace-nowrap
                  "
                >
                  <span>EXPLORE WITH AURA AI</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

            </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}
