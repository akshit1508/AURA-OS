"use client";

export default function ArchitecturePanel({ project, onClose }) {
  if (!project || !project.architecture) return null;

  const isMeso = project.id === "meso";

  return (
    <div
      className="
        mt-6
        overflow-hidden
        rounded-2xl
        border
        border-blue-400/30
        bg-[#040714]
        p-6
        shadow-[0_0_35px_rgba(59,130,246,0.08)]
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <h4 className="text-xs font-mono uppercase tracking-[3px] text-blue-300">
            {project.title} {"//"} System Architecture Topology
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono uppercase tracking-[2px] text-gray-400 hover:text-white transition-colors"
        >
          [ Close × ]
        </button>
      </div>

      {/* Architecture Topology View */}
      {isMeso ? (
        <div className="mt-6 space-y-4">
          {/* Layer 1: Client */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                Tier 01 // Presentation Layer
              </span>
              <span className="text-[9px] font-mono text-gray-500">React 19 / Next.js</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">Next.js Client Interface</p>
            <p className="mt-1 text-xs text-gray-400">
              Interactive student dashboard, daily meal polling, complaint submission, and admin operations.
            </p>
          </div>

          {/* Connection */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-blue-400/40" />
              <span className="text-[8px] font-mono tracking-widest text-blue-300/70">
                REST APIs (HTTP/JSON)
              </span>
              <div className="h-4 w-px bg-blue-400/40" />
            </div>
          </div>

          {/* Layer 2: Core Backend */}
          <div className="rounded-xl border border-blue-400/30 bg-blue-500/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                Tier 02 // Application Core
              </span>
              <span className="text-[9px] font-mono text-gray-500">Java / Spring Boot</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">Spring Boot Backend Gateway</p>
            <p className="mt-1 text-xs text-gray-400">
              Layered Controller-Service-DAO architecture handling role-based auth, complaint resolution workflows, and polling aggregator.
            </p>
          </div>

          {/* Branching Connections */}
          <div className="grid grid-cols-2 gap-4">
            {/* Branch Left: Database */}
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-blue-400/40" />
              <span className="text-[8px] font-mono tracking-widest text-blue-300/70">
                JPA / Hibernate
              </span>
              <div className="h-4 w-px bg-blue-400/40" />

              <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <p className="text-[9px] font-mono uppercase tracking-[2px] text-gray-400">
                  Relational Store
                </p>
                <p className="mt-1 text-sm font-semibold text-white">MySQL Database</p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Schemas for students, menus, ratings, votes, and complaints.
                </p>
              </div>
            </div>

            {/* Branch Right: AI Microservice */}
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-blue-400/40" />
              <span className="text-[8px] font-mono tracking-widest text-blue-300/70">
                Internal Service Call
              </span>
              <div className="h-4 w-px bg-blue-400/40" />

              <div className="w-full rounded-xl border border-blue-400/30 bg-blue-500/[0.04] p-4 text-center">
                <p className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                  Intelligence Tier
                </p>
                <p className="mt-1 text-sm font-semibold text-white">Python FastAPI Service</p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Hosts the 3 dedicated AI decision support engines:
                </p>
              </div>
            </div>
          </div>

          {/* 3 AI Sub-Engines */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 pt-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[2px] text-cyan-300">
                WHY?
              </span>
              <p className="mt-1 text-xs font-medium text-white">Root Cause Investigation</p>
              <p className="mt-1 text-[10px] text-gray-500">Analyzes dissatisfaction anomalies</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[2px] text-cyan-300">
                WHAT NEXT?
              </span>
              <p className="mt-1 text-xs font-medium text-white">Operational Forecasting</p>
              <p className="mt-1 text-[10px] text-gray-500">Predicts meal turnout & demand</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[2px] text-cyan-300">
                WHAT IF?
              </span>
              <p className="mt-1 text-xs font-medium text-white">Policy Simulation</p>
              <p className="mt-1 text-[10px] text-gray-500">Simulates menu/pricing scenarios</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {/* Layer 1: Client */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                Tier 01 // Client Layer
              </span>
              <span className="text-[9px] font-mono text-gray-500">Next.js 14+ (App Router)</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">Pharmacy Dashboard & POS Terminal</p>
            <p className="mt-1 text-xs text-gray-400">
              Interactive medicine inventory catalog, real-time checkout POS, and alert notification center.
            </p>
          </div>

          {/* Connection */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-blue-400/40" />
              <span className="text-[8px] font-mono tracking-widest text-blue-300/70">
                Stateless REST + Spring Security 6 (JWT)
              </span>
              <div className="h-4 w-px bg-blue-400/40" />
            </div>
          </div>

          {/* Layer 2: Core Services */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-blue-400/30 bg-blue-500/[0.04] p-4">
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                Service Engine A
              </span>
              <p className="mt-1 text-sm font-semibold text-white">Smart Expiry Triggers</p>
              <p className="mt-1 text-xs text-gray-400">
                Automated detection routines flagging medications approaching expiry windows & low-stock levels.
              </p>
            </div>

            <div className="rounded-xl border border-blue-400/30 bg-blue-500/[0.04] p-4">
              <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-400">
                Service Engine B
              </span>
              <p className="mt-1 text-sm font-semibold text-white">Atomic POS Billing</p>
              <p className="mt-1 text-xs text-gray-400">
                Thread-safe @Transactional stock deductions ensuring zero negative balances or concurrency race hazards.
              </p>
            </div>
          </div>

          {/* Connection */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-blue-400/40" />
              <span className="text-[8px] font-mono tracking-widest text-blue-300/70">
                Spring Data JPA Repositories
              </span>
              <div className="h-4 w-px bg-blue-400/40" />
            </div>
          </div>

          {/* Layer 3: Database */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <span className="text-[9px] font-mono uppercase tracking-[2px] text-gray-400">
              Tier 03 // Relational Persistence
            </span>
            <p className="mt-1 text-sm font-semibold text-white">MySQL Database (medivault)</p>
            <p className="mt-1 text-xs text-gray-400">
              Normalized tables for products, formulation batches, suppliers, customers, and atomic invoice items.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
