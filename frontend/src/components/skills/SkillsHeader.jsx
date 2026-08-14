import SKILL_MODULES from "@/constants/skills";

export default function SkillsHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">

      <p className="text-[10px] font-medium uppercase tracking-[5px] text-blue-400">
        Capability Matrix // AURA OS
      </p>

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        AURA{" "}
        <span className="text-blue-400">
          SKILLS
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
        The technology stack behind my engineering journey.
      </p>

      <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-3">

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">

          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

          <span className="text-[10px] uppercase tracking-[2px] text-gray-500">
            {SKILL_MODULES.length} Modules
          </span>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">

          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

          <span className="text-[10px] uppercase tracking-[2px] text-gray-500">
            System Online
          </span>

        </div>

      </div>

    </div>
  );
}