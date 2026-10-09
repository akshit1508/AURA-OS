"use client";

import { useState } from "react";
import NeuralField from "./NeuralField";
import { useAuraContext } from "@/context/AuraContext";

export default function AILab() {
  const [message, setMessage] = useState("");
  const [aiState, setAiState] = useState("idle");
  const { openGeneral, handleSend } = useAuraContext();

  const handleSubmit = () => {
    if (!message.trim()) return;

    const query = message.trim();
    setMessage("");
    setAiState("idle");
    openGeneral();
    handleSend(query);
  };

  return (
    <section
      id="ai-lab"
      className="
        relative
        w-full
        px-4
        py-24
        text-white

        sm:px-6

        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}

        <div className="max-w-3xl">

          <p
            className="
              text-[9px]
              uppercase
              tracking-[4px]
              text-blue-400
            "
          >
            AURA / AI LAB
          </p>

          <h2
            className="
              mt-4
              text-4xl
              font-semibold
              tracking-tight

              sm:text-5xl

              md:text-6xl
            "
          >
            Explore the intelligence layer.
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-gray-400

              md:text-base
            "
          >
            Interact with AURA and explore an experimental
            intelligence interface built around AI,
            backend engineering, and modern digital systems.
          </p>

        </div>


        {/* ================================================= */}
        {/* NEURAL FIELD */}
        {/* ================================================= */}

        <div
          className="
            mt-12
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.015]
            backdrop-blur-xl

            md:mt-16
          "
        >

          <NeuralField aiState={aiState} />


          {/* ================================================= */}
          {/* AI INPUT */}
          {/* ================================================= */}

          <div className="px-4 pb-5 sm:px-6 sm:pb-6">

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/30
                px-4
                py-3
                backdrop-blur-xl

                sm:px-5
                sm:py-4
              "
            >

              {/* Input */}

              <input
                type="text"
                value={message}
                onChange={(e) => {

                  const value = e.target.value;

                  setMessage(value);

                  if (value.trim()) {
                    setAiState("listening");
                  } else {
                    setAiState("idle");
                  }

                }}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleSubmit();
                  }

                }}
                placeholder="Ask AURA anything..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-sm
                  text-gray-300
                  outline-none
                  placeholder:text-gray-600
                "
              />


              {/* Send Button */}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-400/20
                  bg-blue-500/10
                  text-blue-300
                  transition-all
                  duration-300

                  hover:border-blue-400/40
                  hover:bg-blue-500/20

                  disabled:cursor-not-allowed
                  disabled:opacity-30

                  sm:h-10
                  sm:w-10
                "
              >
                →
              </button>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CAPABILITY SIGNALS */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            flex
            gap-2
            overflow-x-auto
            pb-2

            sm:flex-wrap
            sm:overflow-visible
          "
        >

          {[
            "AI Reasoning",
            "Backend Systems",
            "Data Intelligence",
            "Agentic AI",
          ].map((item) => (

            <span
              key={item}
              className="
                shrink-0
                rounded-full
                border
                border-white/10
                bg-white/[0.02]
                px-3
                py-1.5
                text-[8px]
                uppercase
                tracking-[2px]
                text-gray-600
              "
            >
              {item}
            </span>

          ))}

        </div>

      </div>
    </section>
  );
}