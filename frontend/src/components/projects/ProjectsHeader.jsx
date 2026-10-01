export default function ProjectsHeader() {
  return (
    <div className="border-b border-white/10 pb-16">
      <div className="grid grid-cols-1 items-end justify-between gap-10 lg:grid-cols-[1fr_auto]">
        {/* Left Side: Editorial Typography & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
            <p className="text-[11px] font-mono uppercase tracking-[6px] text-blue-400">
              SYSTEM ARCHIVE // AURA OS
            </p>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Systems
            <br />
            <span className="text-gray-400 font-light">I&apos;ve Built</span>
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base font-mono">
            Real products, engineering decisions, and intelligent systems I&apos;ve built.
          </p>
        </div>

        {/* Right Side: Archive Status Counters (Typography & Whitespace) */}
        <div className="flex items-center gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono sm:text-4xl">02</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[3px] text-gray-500">
              Built Systems
            </p>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono sm:text-4xl">01</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[3px] text-gray-500">
              In Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
