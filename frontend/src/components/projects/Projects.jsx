"use client";

import { useState } from "react";
import PROJECTS_DATA from "@/constants/projects";
import ProjectsHeader from "./ProjectsHeader";
import ProjectSelector from "./ProjectSelector";
import ProjectShowcase from "./ProjectShowcase";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState("meso");

  const activeProject =
    PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  return (
    <section
      id="projects"
      className="relative w-full bg-[#050816] px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <ProjectsHeader />

        {/* Main Interface Console */}
        <div
          className="
            mt-12
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.015]
            p-4
            backdrop-blur-xl
            sm:p-6
            lg:mt-16
            lg:p-8
          "
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            {/* Left Column: Project Selector Registry */}
            <div className="lg:sticky lg:top-24 lg:self-start lg:border-r lg:border-white/10 lg:pr-8">
              <ProjectSelector
                projects={PROJECTS_DATA}
                activeProjectId={activeProjectId}
                onSelectProject={setActiveProjectId}
              />
            </div>

            {/* Right Column: Active Project Showcase */}
            <div className="min-w-0">
              <ProjectShowcase project={activeProject} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
