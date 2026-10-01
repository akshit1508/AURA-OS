"use client";

import Contact from "@/components/contact/Contact";
import BootScreen from "@/components/boot/BootScreen";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import AILab from "@/components/ai/AILab";
import { useEffect, useState } from "react";
import Skills from "@/components/skills/Skills";

export default function Home() {
  const [bootStatus, setBootStatus] = useState<string | null>(null);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("auraBooted");
    const status = hasBooted === "true" ? "completed" : "required";
    const timer = setTimeout(() => {
      setBootStatus(status);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function handleBootComplete() {
    sessionStorage.setItem("auraBooted", "true");
    setBootStatus("completed");
  }

  // Storage check hone tak kuch render nahi karo
  if (bootStatus === null) {
    return null;
  }

  // Boot required hai
  if (bootStatus === "required") {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  // Boot already complete hai
  return (
    <>
      <main className="min-h-screen pt-20 text-white">
        <Hero />
      </main>

      <About />
      <Projects />
      <Skills />
      <AILab />
      <Contact />
    </>
  );
}