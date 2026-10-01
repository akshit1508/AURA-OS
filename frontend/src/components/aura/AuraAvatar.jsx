"use client";

export default function AuraAvatar() {
  return (
    <div
      className="
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
      "
    >
      {/* Outer glow */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-cyan-300/30
          bg-cyan-300/[0.04]
          shadow-[0_0_18px_rgba(34,211,238,0.18)]
          animate-pulse
        "
      />

      {/* Inner core */}

      <div
        className="
          relative
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          border
          border-cyan-300/40
          bg-[#07131c]
          text-[8px]
          font-semibold
          tracking-[1px]
          text-cyan-300
          shadow-[inset_0_0_10px_rgba(34,211,238,0.12)]
        "
      >
        A
      </div>

      {/* Orbit dot */}

      <span
        className="
          absolute
          -right-0.5
          top-1
          h-1.5
          w-1.5
          rounded-full
          bg-cyan-300
          shadow-[0_0_8px_rgba(34,211,238,0.9)]
        "
      />
    </div>
  );
}