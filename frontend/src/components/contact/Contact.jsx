"use client";
import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactSuccess from "./ContactSuccess";


export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

 
  return (
    <section
      id="contact"
      className="relative w-full px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}

        <div className="max-w-2xl">

          <p className="text-[10px] uppercase tracking-[4px] text-blue-400">
            AURA / COMMUNICATION
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build something intelligent.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400">
            Have an idea, opportunity, or project in mind?
            Let&apos;s turn it into something meaningful.
          </p>

        </div>


        {/* CONTACT INTERFACE */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-4
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.02]
            p-4
            backdrop-blur-xl
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >

          {/* LEFT SIDE */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-7
              md:p-9
            "
          >

            <p className="text-[9px] uppercase tracking-[3px] text-gray-600">
              Open Channel
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              Let&apos;s connect.
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              I&apos;m open to interesting ideas, AI projects,
              backend systems, freelance opportunities, and
              meaningful collaborations.
            </p>

            <div className="mt-10 flex items-center gap-2">

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_12px_rgba(59,130,246,0.8)]
                "
              />

              <p className="text-[9px] uppercase tracking-[3px] text-gray-500">
                Available for opportunities
              </p>

            </div>

            <div className="mt-10 space-y-4">

              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-gray-600">
                  Focus
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  AI Engineering · Backend Systems
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-gray-600">
                  Collaboration
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  Freelance · Projects · Ideas
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-gray-600">
                  Response
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  Usually within 24–48 hours
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}

           {submitted ? (
    <ContactSuccess onBack={() => setSubmitted(false)} />
  ) : (
    <ContactForm onSuccess={()=> setSubmitted(true)} />
  )}
        </div>

      </div>
    </section>
  );
}