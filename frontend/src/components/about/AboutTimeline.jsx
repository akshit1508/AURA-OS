"use client";

import { useState } from "react";
import ABOUT_TIMELINE from "@/constants/aboutTimeline";

export default function AboutTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentMilestone = ABOUT_TIMELINE[activeIndex];

  return (
    <section className="mt-32">

      {/* Heading */}
      <div className="mb-20 text-center">

        <p className="text-sm font-semibold uppercase tracking-[6px] text-blue-400">
          System Evolution
        </p>

        <h2 className="mt-4 text-5xl font-bold text-white">
          Every Milestone Shaped My Journey
        </h2>

      </div>

      {/* Main Layout */}
      <div className="grid gap-16 xl:grid-cols-[360px_1fr]">

        {/* ================= LEFT SIDE ================= */}
<div className="space-y-2">

          {/* Vertical Line */}


          {ABOUT_TIMELINE.map((item, index) => (

            <div
  key={item.year}
  onMouseEnter={() => setActiveIndex(index)}
  className={`
    cursor-pointer
    border-l-4
    pl-6
    py-6
    transition-all
    duration-300

    ${
      activeIndex === index
        ? "border-blue-400 bg-blue-500/10"
        : "border-white/10"
    }
  `}
>

              {/* Year */}

              <p
                className={`
                  text-[11px]
                  uppercase
                  tracking-[4px]
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "text-blue-400"
                      : "text-gray-500"
                  }
                `}
              >
                {item.year}
              </p>

              {/* Title */}

              <h3
                className={`
                  mt-1
                  text-lg
                  font-semibold
                  leading-6
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "text-white"
                      : "text-gray-400"
                  }
                `}
              >
                {item.title}
              </h3>

              {/* Active Indicator */}

              {activeIndex === index && (
                <div className="mt-3 h-[2px] w-16 rounded-full bg-blue-500" />
              )}

            </div>

          ))}

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

          {/* Top */}

          <div className="mb-8 flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[4px] text-blue-400">
                {currentMilestone.year}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                {currentMilestone.title}
              </h2>
         

              <p className="mt-3 text-xl text-blue-300">
                {currentMilestone.subtitle}
              </p>

            </div>

            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-300">
              Phase {activeIndex + 1}
            </span>

          </div>

          {/* Description */}

          <p className="leading-8 text-gray-400">
            {currentMilestone.description}
          </p>

          <div className="my-8 h-px bg-white/10" />

          {/* Technologies */}

          <div>

            <h4 className="text-xs uppercase tracking-[5px] text-blue-400">
              Technologies
            </h4>

            <div className="mt-5 flex flex-wrap gap-3">

              {currentMilestone.technologies.map((tech) => (

                <div
                  key={tech}
                  className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2"
                >

                  <span className="h-2 w-2 rounded-full bg-blue-400"></span>

                  <span className="text-sm text-blue-200">
                    {tech}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="my-8 h-px bg-white/10" />

          {/* Achievement */}

          <div>

            <h4 className="text-xs uppercase tracking-[5px] text-blue-400">
              Key Outcome
            </h4>

            <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">

              <p className="leading-8 text-gray-300">
                {currentMilestone.achievement}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}