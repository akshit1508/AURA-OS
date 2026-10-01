"use client";

import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
} from "@react-three/drei";

import EnergyOrb from "./EnergyOrb";
import AuraRobot from "./AuraRobot";

export default function AuraScene({
  hovered,
  transitioning,
  open,
  onHover,
  onLeave,
  onClick,
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`
        fixed
        z-[101]
        cursor-pointer

        transition-all
        duration-500
        ease-out

        ${
          open
            ? `
              right-5
              top-[92px]

              h-[220px]

              w-[min(440px,calc(100vw-40px))]

              pointer-events-none
            `
            : `
              bottom-6
              right-6

              h-[120px]
              w-[120px]

              pointer-events-auto
            `
        }
      `}
    >

      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 40,
        }}

        dpr={1}

        gl={{
          antialias: false,
          powerPreference: "low-power",
        }}
      >

        <ambientLight intensity={0.18} />

        <pointLight
          position={[2.5, 2, 3]}
          intensity={10}
          color="#22d3ee"
        />

        <pointLight
          position={[-2, -1, 2]}
          intensity={7}
          color="#2563eb"
        />

        <pointLight
          position={[0, -2, -2]}
          intensity={8}
          color="#8b5cf6"
        />

        {hovered ? (
          <AuraRobot
            transitioning={transitioning}
          />
        ) : (
          <EnergyOrb
            transitioning={transitioning}
          />
        )}

        <Environment preset="night" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />

      </Canvas>

      {/* =================================================
          ONLINE INDICATOR
          Only visible in closed state
      ================================================= */}

      {!open && (
        <span
          className="
            pointer-events-none

            absolute
            right-2
            top-2

            h-2.5
            w-2.5

            rounded-full

            bg-cyan-300

            shadow-[0_0_12px_rgba(103,232,249,1)]

            animate-pulse
          "
        />
      )}

    </div>
  );
}