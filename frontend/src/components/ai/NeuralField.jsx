"use client";

import { useRef, useState } from "react";

const NODE_COUNT = 14;

const NODES = Array.from({ length: NODE_COUNT }, (_, index) => {
  const angle = (index / NODE_COUNT) * Math.PI * 2;
  const radius = 24 + ((index * 7) % 18);
  return {
    id: index,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius * 0.72,
    size: 2 + ((index * 3) % 1.5),
    delay: (index * 0.5) % 3,
  };
});

export default function NeuralField({ aiState }) {
  const fieldRef = useRef(null);

  const [pointer, setPointer] = useState({
    x: 50,
    y: 50,
    active: false,
  });

  const nodes = NODES;


  /* ================================================= */
  /* POINTER MOVEMENT */
  /* ================================================= */

  const handlePointerMove = (event) => {

    if (!fieldRef.current) return;

    const rect =
      fieldRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    setPointer({

      x,
      y,

      active: true,

    });

  };


  /* ================================================= */
  /* POINTER LEAVE */
  /* ================================================= */

  const handlePointerLeave = () => {

    setPointer((current) => ({

      ...current,

      active: false,

    }));

  };


  return (

    <div
      ref={fieldRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="
        relative
        h-[390px]
        w-full
        overflow-hidden

        sm:h-[440px]

        md:h-[500px]

        lg:h-[560px]
      "
    >


      {/* ================================================= */}
      {/* ATMOSPHERIC GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-52
          w-52
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/[0.05]
          blur-[70px]

          sm:h-64
          sm:w-64

          lg:h-80
          lg:w-80
        "
      />


      {/* ================================================= */}
      {/* POINTER FIELD */}
      {/* ================================================= */}

      <div
        className={`
          pointer-events-none
          absolute
          h-24
          w-24
          rounded-full
          bg-cyan-300/[0.04]
          blur-2xl
          transition-opacity
          duration-300

          ${
            pointer.active
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        style={{

          left: `${pointer.x}%`,

          top: `${pointer.y}%`,

          transform:
            "translate(-50%, -50%)",

        }}
      />


      {/* ================================================= */}
      {/* NEURAL CONNECTIONS + ENERGY FLOW */}
      {/* ================================================= */}

      <svg
        viewBox="0 0 100 100"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
        "
      >

        {/* Center → Node connections */}

        {nodes.map((node) => {

          const dx =
            node.x -
            pointer.x;

          const dy =
            node.y -
            pointer.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          const influence = pointer.active
  ? Math.max(0, 1 - distance / 25)
  : 0;

          const opacity =
            0.08 +
            influence *
              0.28;

          return (

            <line
              key={`connection-${node.id}`}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke={`rgba(103,232,249,${opacity})`}
              strokeWidth={
                0.18 +
                influence *
                  0.18
              }
            />

          );

        })}


        {/* Energy particles */}

        {nodes.map(
          (node, index) => (

            <circle
              key={`energy-${node.id}`}
              r="0.65"
              fill="rgba(103,232,249,0.9)"
            >

              <animateMotion
                dur={`${3 + (index % 4)}s`}
                repeatCount="indefinite"
                begin={`${index * 0.25}s`}
                path={`M 50 50 L ${node.x} ${node.y}`}
              />

            </circle>

          )
        )}

      </svg>


      {/* ================================================= */}
      {/* NEURAL NODES */}
      {/* ================================================= */}

      {nodes.map((node) => {

        const dx =
          node.x -
          pointer.x;

        const dy =
          node.y -
          pointer.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

       const influence = pointer.active
  ? Math.max(0, 1 - distance / 18)
  : 0;

        const scale =
          1 +
          influence *
            1.8;

        return (

          <span
            key={`node-${node.id}`}
            className="
              pointer-events-none
              absolute
              rounded-full
              bg-cyan-300
              shadow-[0_0_12px_rgba(103,232,249,0.9)]
            "
            style={{

              width:
                `${node.size}px`,

              height:
                `${node.size}px`,

              left:
                `${node.x}%`,

              top:
                `${node.y}%`,

              transform:
                `translate(-50%, -50%) scale(${scale})`,

              opacity:
                0.45 +
                influence *
                  0.55,

              transition:
                "transform 180ms ease-out, opacity 180ms ease-out",

            }}
          />

        );

      })}


      {/* ================================================= */}
      {/* CENTRAL AURA INTELLIGENCE */}
      {/* ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          flex
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
        "
      >

        {/* Outer field */}

        <div
          className="
            absolute
            h-32
            w-32
            rounded-full
            border
            border-cyan-300/10
            animate-[pulse_4s_ease-in-out_infinite]

            sm:h-40
            sm:w-40

            lg:h-48
            lg:w-48
          "
        />


        {/* Inner field */}

        <div
          className="
            absolute
            h-24
            w-24
            rounded-full
            border
            border-blue-400/20
            bg-blue-500/[0.025]
            shadow-[0_0_70px_rgba(59,130,246,0.15)]
            backdrop-blur-sm

            sm:h-28
            sm:w-28

            lg:h-32
            lg:w-32
          "
        />


        {/* Core */}

        <div
          className={`
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            bg-cyan-300/[0.06]
            shadow-[0_0_35px_rgba(103,232,249,0.28)]
            transition-all
            duration-500

            sm:h-14
            sm:w-14

            lg:h-16
            lg:w-16

            ${
              aiState === "thinking"
                ? "border-cyan-300/70 scale-110"
                : "border-cyan-300/40"
            }
          `}
        >

          <div className="text-center">

            <p
              className="
                text-[7px]
                font-medium
                uppercase
                tracking-[4px]
                text-cyan-300
              "
            >
              AURA
            </p>

            <p
              className="
                mt-1
                text-[5px]
                uppercase
                tracking-[2px]
                text-gray-500
              "
            >

              {aiState === "idle" &&
                "READY"}

              {aiState === "listening" &&
                "LISTENING"}

              {aiState === "thinking" &&
                "THINKING"}

            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* STATUS */}
      {/* ================================================= */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          flex
          -translate-x-1/2
          items-center
          gap-2
          whitespace-nowrap
        "
      >

        <span
          className={`
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-300
            shadow-[0_0_10px_rgba(103,232,249,0.9)]
            transition-all
            duration-300

            ${
              aiState === "thinking"
                ? "scale-150"
                : ""
            }
          `}
        />

        <span
          className="
            text-[7px]
            uppercase
            tracking-[3px]
            text-gray-600
          "
        >

          {aiState === "idle" &&
            "Intelligence field ready"}

          {aiState === "listening" &&
            "Listening"}

          {aiState === "thinking" &&
            "Processing"}

        </span>

      </div>

    </div>

  );
}