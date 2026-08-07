"use client";


import BootScreen from "@/components/boot/BootScreen";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import { useState } from "react";
export default function Home() {

  const [ loading, setLoading] = useState(true);
  

  if(loading){
    return ( 
    <BootScreen onComplete={() => setLoading(false)} />
  );
  }

  return (
    <>
     <main className="min-h-screen  pt-20 text-white r">
        <h1 className="text-5xl font-bold"></h1>
        <Hero />
      </main>
       <About />
    </>
    
    
  );
}
