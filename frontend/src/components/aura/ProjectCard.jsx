"use client";

export default function ProjectCard({
  title,
  description,
  technologies = [],
  github,
  live,
  label = "Featured Project",
}) {
  return (
    <div
      className="
        w-full
        max-w-[330px]
        overflow-hidden
        rounded-2xl
        border
        border-cyan-300/15
        bg-gradient-to-br
        from-cyan-300/[0.06]
        via-white/[0.025]
        to-violet-400/[0.04]
        shadow-[0_0_25px_rgba(34,211,238,0.05)]
      "
    >

      {/* TOP */}

      <div className="px-4 pt-4">

        <div
          className="
            mb-2
            text-[8px]
            uppercase
            tracking-[3px]
            text-cyan-300/60
          "
        >
          {label}
        </div>

        <h3
          className="
            text-base
            font-medium
            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-xs
            leading-5
            text-gray-400
          "
        >
          {description}
        </p>

      </div>


      {/* TECHNOLOGIES */}

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-4">

          {technologies.map((technology) => (
            <span
              key={technology}
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                px-2.5
                py-1
                text-[9px]
                text-gray-400
              "
            >
              {technology}
            </span>
          ))}

        </div>
      )}


      {/* FOOTER */}
      <div
  className="
    flex
    items-center
    gap-4
    border-t
    border-white/[0.06]
    px-4
    py-3
  "
>
  {github && (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-[10px]
        uppercase
        tracking-[2px]
        text-gray-400
        transition
        hover:text-white
      "
    >
      GitHub ↗
    </a>
  )}

  {live && (
    <a
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-[10px]
        uppercase
        tracking-[2px]
        text-cyan-300
        transition
        hover:text-cyan-200
      "
    >
      Live Demo ↗
    </a>
  )}
</div>
      <div
        className="
          border-t
          border-white/[0.06]
          px-4
          py-3
        "
      >
        <button
          type="button"
          className="
            text-[10px]
            uppercase
            tracking-[2px]
            text-cyan-300
            transition
            hover:text-cyan-200
          "
        >
          View Project →
        </button>
      </div>

    </div>
  );
}