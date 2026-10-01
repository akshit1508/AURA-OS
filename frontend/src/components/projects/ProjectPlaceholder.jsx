"use client";

export default function ProjectPlaceholder({ project }) {
  const specs = project.engineeringSpecs || [];
  const capabilities = project.systemCapabilities || [];

  return (
    <div className="space-y-8">
      {/* Intentional System Blueprint Frame */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-dashed
          border-blue-400/25
          bg-[#040714]
          p-8
          shadow-[0_0_40px_rgba(59,130,246,0.05)]
          sm:p-12
        "
      >
        {/* Blueprint background grid lines */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)]
            bg-[size:28px_28px]
          "
        />

        {/* Technical Corner Brackets */}
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-xs text-blue-400/40">
          ┌
        </span>
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-xs text-blue-400/40">
          ┐
        </span>
        <span className="pointer-events-none absolute left-4 bottom-4 font-mono text-xs text-blue-400/40">
          └
        </span>
        <span className="pointer-events-none absolute right-4 bottom-4 font-mono text-xs text-blue-400/40">
          ┘
        </span>

        <div className="relative flex flex-col items-center justify-center text-center">
          {/* Subtle node system graphic */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-pulse" />
            <div className="absolute -inset-3 rounded-full border border-blue-400/10 border-dashed animate-[spin_24s_linear_infinite]" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/[0.08] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="font-mono text-sm font-bold text-blue-300">03</span>
            </div>
            {/* Satellite nodes */}
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
            <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-blue-400/70 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-[10px] font-mono uppercase tracking-[3px] text-amber-300/90">
              Roadmap Slot // Coming Soon
            </span>
          </div>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.titlePrefix}{" "}
            <span className="text-blue-400">{project.titleSuffix}</span>
          </h3>

          <p className="mt-1 font-mono text-xs uppercase tracking-[2px] text-blue-300">
            {project.subtitle}
          </p>

          <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
            {project.domain}
          </p>

          <div className="mx-auto mt-6 max-w-xl text-center">
            <p className="text-sm font-medium leading-relaxed text-gray-200">
              {project.problemHeadline}
            </p>
            <p className="mt-2 text-xs leading-6 text-gray-400">
              {project.problemDetail}
            </p>
          </div>

          {/* Planned Tech Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {(project.technologies || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-[10px] font-mono uppercase tracking-[2px] text-gray-400 transition-colors hover:border-blue-400/40 hover:text-blue-200"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Planned Capabilities */}
      {capabilities.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-7">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
              Planned Capabilities // Architectural Target
            </h4>
          </div>

          <div className="mt-5 space-y-4">
            {capabilities.map((cap) => (
              <div
                key={cap.number}
                className="group flex flex-col gap-1 border-b border-white/5 pb-4 last:border-b-0 transition-all hover:translate-x-1"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-blue-400/70">
                    {cap.number}
                  </span>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                    {cap.name}
                  </p>
                </div>
                <p className="pl-6 text-xs leading-relaxed text-gray-400">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engineering Blueprint Specifications */}
      <div className="rounded-2xl border border-white/10 bg-[#040714] p-6 sm:p-7">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
            Roadmap Specifications
          </h4>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {specs.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
            >
              <p className="text-[8px] font-mono uppercase tracking-[2px] text-gray-500">
                {fact.label}
              </p>
              <p className="mt-1 font-mono text-xs font-semibold text-gray-300">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
