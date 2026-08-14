export default function SkillTechnology({ skill }) {
  
  return (
    <div
      className="
        group
        flex
        min-h-[58px]
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/[0.02]
        p-3
        transition-all
        duration-300
        hover:border-blue-400/30
        hover:bg-blue-500/[0.04]
        hover:shadow-[0_0_18px_rgba(59,130,246,0.06)]
      "
    >

      {/* ICON */}

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-white/10
          bg-black/30
          transition-all
  duration-300
  group-hover:border-blue-400/20
  group-hover:bg-blue-500/[0.06]
        "
      >
        <img
          src={skill.icon}
          alt={skill.name}
          className="
            h-5
            w-5
            object-contain
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </div>


      {/* INFORMATION */}

      <div className="min-w-0">

        <p className="text-[11px] font-medium leading-4 text-gray-200">
          {skill.name}
        </p>

        <p className="mt-1 text-[8px] uppercase tracking-[2px] text-gray-600">
          {skill.level}
        </p>

      </div>

    </div>
  );
}