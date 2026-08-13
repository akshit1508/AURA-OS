"use client";

import BootScreen from "@/components/boot/BootScreen";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import { useEffect, useState } from "react";

export default function Home() {
  const [bootStatus, setBootStatus] = useState(null);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("auraBooted");

    if (hasBooted === "true") {
      setBootStatus("completed");
    } else {
      setBootStatus("required");
    }
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
    </>
  );
}