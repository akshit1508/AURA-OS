export default function ProjectDetails({
  project,
  isArchitectureOpen,
  onToggleArchitecture,
}) {
  return (
    <div className="space-y-6">
      {/* 1. THE PROBLEM */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <p className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
          The Problem
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-300">
          {project.problem}
        </p>
      </div>

      {/* 2. THE SYSTEM */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <p className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
          The System
        </p>
        <ul className="mt-4 space-y-2.5">
          {project.system.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span className="text-xs leading-5 text-gray-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. ENGINEERING FOCUS */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <p className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
          Engineering Focus
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.engineeringFocus.map((focus) => (
            <span
              key={focus}
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-3.5
                py-1.5
                text-[9px]
                font-mono
                uppercase
                tracking-[2px]
                text-gray-300
              "
            >
              {focus}
            </span>
          ))}
        </div>
      </div>

      {/* 4. SYSTEM FACTS */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <p className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
          System Facts
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {project.systemFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
            >
              <p className="text-[8px] font-mono uppercase tracking-[2px] text-gray-500">
                {fact.label}
              </p>
              <p className="mt-1 text-xs font-semibold text-white">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ACTIONS: ARCHITECTURE, GITHUB, LIVE */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {project.architecture && (
          <button
            type="button"
            onClick={onToggleArchitecture}
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-5
              py-2.5
              text-[10px]
              font-mono
              uppercase
              tracking-[2px]
              transition-all
              duration-300
              ${
                isArchitectureOpen
                  ? "border-blue-400 bg-blue-500/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  : "border-blue-400/30 bg-blue-500/[0.06] text-blue-300 hover:border-blue-400/60 hover:bg-blue-500/[0.12]"
              }
            `}
          >
            <span>{isArchitectureOpen ? "Hide Architecture [-]" : "View Architecture [↓]"}</span>
          </button>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/[0.03]
              px-5
              py-2.5
              text-[10px]
              font-mono
              uppercase
              tracking-[2px]
              text-gray-300
              transition-all
              duration-300
              hover:border-white/30
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            <span>GitHub Repository ↗</span>
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/30
              bg-emerald-500/[0.06]
              px-5
              py-2.5
              text-[10px]
              font-mono
              uppercase
              tracking-[2px]
              text-emerald-300
              transition-all
              duration-300
              hover:border-emerald-400/60
              hover:bg-emerald-500/[0.12]
            "
          >
            <span>Live System ↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
