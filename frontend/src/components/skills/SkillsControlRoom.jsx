"use client";
import SKILL_MODULES from "@/constants/skills";
import SkillModuleList from "./SkillModuleList";
import SkillLivePannel from "./SkillLivePannel";
import { useState } from "react";

export default function SkillsControlRoom() {

    const [activeModule, setActiveModule] = useState(SKILL_MODULES[0]?.id || null);
    const selectedModule = SKILL_MODULES.find(
  (module) => module.id === activeModule
);
  return (
    <div className="mx-auto mt-10 w-full max-w-7xl">

      <div
        className="
          grid
          grid-cols-1
          gap-4
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.02]
          p-3
          lg:p-4
          backdrop-blur-xl
          lg:grid-cols-[270px_minmax(0,1fr)_350px]
        "
      >

        {/* LEFT — SYSTEM MODULES */}

       <div className="min-h-0 lg:min-h-[460px] rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">

  <p className="text-[10px] uppercase tracking-[3px] text-blue-400">
    System Modules
  </p>

  <div className="mt-6">
    <SkillModuleList
      modules={SKILL_MODULES}
      onSelect={setActiveModule}
      activeModule={activeModule}
    />
  </div>

</div>


        {/* CENTER — AURA ENGINE */}

       <div className="flex min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-5">

  <div className="relative flex flex-col items-center text-center">

    {/* Core Label */}

    <p className="text-[10px] uppercase tracking-[4px] text-blue-400">
      Core Interface
    </p>


    {/* AURA CORE */}

<div className="relative mt-8 [perspective:900px]">
      {/* Outer Orbit Ring */}

     <div 
  className="
    absolute
    -inset-7
    rounded-full
    border
    border-blue-400/30
    shadow-[0_0_25px_rgba(59,130,246,0.12)]
    animate-[spin_18s_linear_infinite]
  "
>
  <div
    className="
      absolute
      right-1/2
      top-0
      h-2
      w-2
      translate-x-1/2
      rounded-full
      bg-cyan-300
      shadow-[0_0_18px_rgba(103,232,249,0.9)]
    "
  />
</div>


      {/* Second Ring */}

      <div
  className="
    absolute
    -inset-4
    rounded-full
    border
    border-cyan-300/30
    shadow-[0_0_20px_rgba(103,232,249,0.10)]
    animate-[spin_12s_linear_infinite_reverse]
  "
/>


      {/* Main Core */}

      <div
        className="
          relative
          flex
          h-40
          w-40
          items-center
          justify-center
          rounded-full
          border
          border-blue-400/40
          bg-blue-500/[0.08]
          shadow-[0_0_100px_rgba(59,130,246,0.22)]
          [transform-style:preserve-3d]
          animate-[pulse_4s_ease-in-out_infinite]
        "
      >

       <div className="[transform:translateZ(35px)] text-center">

  <p className="text-[10px] tracking-[5px] text-blue-300">
    AURA
  </p>

  <h3 className="mt-1 text-xl font-semibold uppercase tracking-[2px] text-white">
    {selectedModule
      ? selectedModule.shortTitle
      : "ENGINE"}
  </h3>

  <p className="mt-2 text-[8px] uppercase tracking-[3px] text-gray-600">
    System Active
  </p>

</div>

      </div>


      {/* Small Orbit Point */}

      

    </div>


    {/* Active Module Information */}

    <p className="mt-10 text-xs text-gray-500">
      {selectedModule
        ? selectedModule.title
        : "Capability control interface"}
    </p>

  </div>

</div>

        {/* RIGHT — LIVE MODULE */}

        <div className="min-h-0 lg:min-h-[420px] rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">

          <p className="text-[10px] uppercase tracking-[3px] text-blue-400">
          </p>


            <SkillLivePannel module={selectedModule} />

          </div>

        </div>

      </div>

  );
}