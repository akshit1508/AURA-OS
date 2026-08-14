export default function SkillModule({ module, onSelect, activeModule }) {
     const isActive = module.id === activeModule;

  return (
    <div
      onMouseEnter={() => onSelect(module.id)}
      onClick={()=> onSelect(module.id)}
      className={`
  group
  cursor-pointer
  rounded-xl
  border
  px-4
  py-3
  transition-all
  duration-300

  ${
    isActive
      ? "border-blue-400/40 bg-blue-500/[0.08] shadow-[0_0_25px_rgba(59,130,246,0.08)]"
      : "border-white/10 bg-white/[0.02] hover:border-blue-400/30 hover:bg-blue-500/[0.04]"
  }
`}
    >
      {/* Module Number */}

      <p className="text-[10px] tracking-[3px] text-blue-400/70">
        {module.number}
      </p>


      {/* Module Name */}

      <p className="mt-1 text-sm font-medium text-white transition-colors duration-300 group-hover:text-blue-300">
        {module.shortTitle}
      </p>


      {/* Module Status */}

      <div className="mt-2 flex items-center gap-2">

        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

        <p className="text-[9px] uppercase tracking-[2px] text-gray-500">
          {module.status}
        </p>

      </div>

    </div>
  );
}