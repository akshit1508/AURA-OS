"use client";

export default function ProjectSelector({
  projects,
  activeProjectId,
  onSelectProject,
}) {
  return (
    <div
      role="tablist"
      aria-label="AURA OS System Archive Registry"
      className="relative space-y-3"
    >
      {/* Registry Section Tag */}
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span className="text-[10px] font-mono uppercase tracking-[3px] text-blue-400">
            Archive Index
          </span>
        </div>
        <span className="text-[9px] font-mono text-gray-500">
          [{projects.length} UNITS]
        </span>
      </div>

      {/* Rail Container */}
      <div className="relative space-y-2.5">
        {projects.map((project) => {
          const isActive = project.id === activeProjectId;
          const isComingSoon = project.status === "COMING SOON";

          return (
            <button
              key={project.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => onSelectProject(project.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectProject(project.id);
                }
              }}
              className={`
                group
                relative
                w-full
                text-left
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                outline-none
                focus-visible:ring-1
                focus-visible:ring-blue-400
                ${
                  isActive
                    ? "border-blue-400/40 bg-gradient-to-r from-blue-500/[0.08] to-transparent shadow-[0_0_30px_rgba(59,130,246,0.08)] translate-x-1"
                    : "border-white/10 bg-white/[0.015] hover:border-blue-400/30 hover:bg-white/[0.03] hover:translate-x-0.5"
                }
              `}
            >
              {/* Active Indicator Bar on Left Edge */}
              <div
                className={`
                  absolute
                  left-0
                  top-3
                  bottom-3
                  w-[3px]
                  rounded-r-full
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,1)] opacity-100"
                      : "bg-transparent opacity-0 group-hover:bg-blue-400/30 group-hover:opacity-100"
                  }
                `}
              />

              {/* Number and Status Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      text-[11px]
                      font-mono
                      font-bold
                      tracking-[2px]
                      transition-colors
                      ${
                        isActive
                          ? "text-blue-300"
                          : "text-gray-500 group-hover:text-blue-400/70"
                      }
                    `}
                  >
                    // {project.number}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`
                      h-1.5
                      w-1.5
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isComingSoon
                          ? "bg-amber-400/70"
                          : isActive
                          ? "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
                          : "bg-emerald-400/60"
                      }
                    `}
                  />
                  <span
                    className={`
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[2px]
                      transition-colors
                      ${
                        isActive
                          ? "text-blue-200"
                          : isComingSoon
                          ? "text-amber-400/80"
                          : "text-gray-500 group-hover:text-gray-400"
                      }
                    `}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Title */}
              <h3
                className={`
                  mt-2.5
                  text-sm
                  font-bold
                  tracking-wider
                  font-mono
                  uppercase
                  transition-colors
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }
                `}
              >
                {project.title}
              </h3>

              {/* Subtitle */}
              <p
                className={`
                  mt-1
                  text-[11px]
                  leading-snug
                  line-clamp-2
                  transition-colors
                  ${
                    isActive
                      ? "text-gray-300"
                      : "text-gray-500 group-hover:text-gray-400"
                  }
                `}
              >
                {project.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
