import SkillTechnology from "./SkillTechnology";

export default function SkillLivePannel({ module }) {

  if (!module) {
    return (
      <div className="mt-8">

        <p className="text-[9px] uppercase tracking-[3px] text-gray-600">
          System Status
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Select a module to inspect its capabilities.
        </p>

      </div>
    );
  }

  return (
    <div className="mt-6">

      {/* Panel Header */}

      <div className="flex items-center justify-between">

        <p className="text-[10px] uppercase tracking-[3px] text-blue-400">
          Live Module
        </p>

        <div className="flex items-center gap-2">

          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

          <span className="text-[9px] uppercase tracking-[2px] text-gray-500">
            Active
          </span>

        </div>

      </div>


      {/* Module Identity */}

      <p className="mt-8 text-[9px] uppercase tracking-[3px] text-gray-600">
        Module {module.number}
      </p>

      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {module.title}
      </h3>


      {/* Divider */}

      <div className="mt-5 h-px w-full bg-white/10" />


      {/* Description */}

      <p className="mt-5 text-xs leading-6 text-gray-400">
        {module.description}
      </p>


      {/* Capability Stack */}

      <div className="mt-7">

        <p className="text-[9px] uppercase tracking-[3px] text-gray-500">
          Capability Stack
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">

          {module.skills.map((skill) => (
            <SkillTechnology
              key={skill.name}
              skill={skill}
            />
          ))}

        </div>

      </div>

    </div>
  );
}