"use client";


import BootScreen from "@/components/boot/BootScreen";
import Hero from "@/components/hero/Hero";
import { useState } from "react";
export default function Home() {

  const [ loading, setLoading] = useState(true);
  

  if(loading){
    return ( 
    <BootScreen onComplete={() => setLoading(false)} />
  );
  }

  return (
   
    
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-5xl font-bold"></h1>
        <Hero />
        
      </main>
    
    
  );
}
