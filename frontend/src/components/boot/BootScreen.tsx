"use client";

import { useEffect, useState } from "react";
import LOADING_STEPS from "@/constants/loading"

export default function BootScreen({ onComplete }: { onComplete: () => void }){
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentStep((prev)=>{
                const next = prev + 1;
                if(next >= LOADING_STEPS.length){
                    clearInterval(interval);
                    setTimeout(()=>{
                        onComplete();
                    },300)
                    return prev;
                }
                return next;
            });
        },500);
        return () =>clearInterval(interval);
    },[onComplete])
    return (
        <section className="fixed inset-0 z-[9999]  flex flex-col items-center justify-center bg-black">
            <h1 className="text-5xl font-bold text-white">
                AURA OS
            </h1>

            <p className="mt-4 text-gray-400">{LOADING_STEPS[currentStep].message}</p>

            <p className="mt-2 text-blue-400 font-semibold">{LOADING_STEPS[currentStep].progress}%</p>

            <div className="mt-8 h-2 w-80 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full  rounded-full bg-blue-500 transition-all duration-100"
                style={{width: `${LOADING_STEPS[currentStep].progress}%`}}
                ></div>
            </div>
        </section>
    )
}