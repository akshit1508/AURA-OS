"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectPreviewFrame({
  imageSrc,
  imageAlt,
  systemLabel,
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#040714]
        shadow-[0_0_40px_rgba(59,130,246,0.06)]
        transition-all
        duration-300
        hover:border-blue-400/30
        hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]
      "
    >
      {/* Top Technical Metadata Bar - NO browser window controls */}
      <div
        className="
          flex
          h-10
          items-center
          justify-between
          border-b
          border-white/10
          bg-white/[0.02]
          px-4
          sm:px-5
        "
      >
        {/* Left: Technical Label */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-blue-400 font-bold">+</span>
          <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gray-400">
            SYSTEM INTERFACE // VERIFIED BUILD
          </span>
        </div>

        {/* Center: System Descriptor */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[2px] text-blue-400/80">
          <span>[ {systemLabel} ]</span>
        </div>

        {/* Right: Telemetry / Status indicator */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-[2px] text-blue-300">
            ACTIVE SURFACE
          </span>
        </div>
      </div>

      {/* Screenshot Frame Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#02040a]">
        {/* Corner Crosshairs */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] text-blue-400/30">
          +
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-10 font-mono text-[10px] text-blue-400/30">
          +
        </div>
        <div className="pointer-events-none absolute left-3 bottom-3 z-10 font-mono text-[10px] text-blue-400/30">
          +
        </div>
        <div className="pointer-events-none absolute right-3 bottom-3 z-10 font-mono text-[10px] text-blue-400/30">
          +
        </div>

        {!imageError && imageSrc ? (
          <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.012]">
            <Image
              src={imageSrc}
              alt={imageAlt || "Project Screenshot"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
              className="object-cover object-top"
              onError={() => setImageError(true)}
              priority
            />
          </div>
        ) : (
          /* Graceful System Standby if screenshot is being placed in /projects/ */
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/[0.05] text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="mt-4 text-[11px] font-mono uppercase tracking-[3px] text-blue-300">
              {systemLabel} System Preview Surface
            </p>
            <p className="mt-1.5 max-w-sm font-mono text-xs text-gray-500 leading-relaxed">
              Place verified build capture in{" "}
              <code className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-blue-300">
                {imageSrc}
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
