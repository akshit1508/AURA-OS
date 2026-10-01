"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
export default function AuraRobot({ transitioning }) {
  const robot = useRef(null);
  const hud = useRef(null);

  useFrame((state, delta) => {
  if (!robot.current) return;

  robot.current.rotation.y += delta * 0.12;

  robot.current.position.y =
    Math.sin(state.clock.elapsedTime * 1.2) * 0.05;

  const targetScale = transitioning ? 0.65 : 1;

  robot.current.scale.x +=
    (targetScale - robot.current.scale.x) * 0.12;

  robot.current.scale.y +=
    (targetScale - robot.current.scale.y) * 0.12;

  robot.current.scale.z +=
    (targetScale - robot.current.scale.z) * 0.12;

  if (hud.current) {
    hud.current.rotation.z += delta * 0.25;
    hud.current.rotation.y += delta * 0.08;
  }
});

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.08}
      floatIntensity={0.25}
    >
    <group
  ref={robot}
  scale={transitioning ? 0.65 : 1}
>
        {/* =================================================
    HOLOGRAPHIC AI HUD
================================================= */}

<group
  ref={hud}
  rotation={[0.35, 0, 0]}
>

  {/* Main holographic ring */}

  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry
      args={[1.18, 0.012, 16, 100]}
    />

    <meshBasicMaterial
      color="#22d3ee"
      transparent
      opacity={0.65}
    />
  </mesh>

  {/* Outer violet ring */}

  <mesh rotation={[Math.PI / 2, 0.3, 0]}>
    <torusGeometry
      args={[1.38, 0.007, 16, 100]}
    />

    <meshBasicMaterial
      color="#a78bfa"
      transparent
      opacity={0.45}
    />
  </mesh>

  {/* Vertical scanning ring */}

  <mesh rotation={[0, Math.PI / 2, 0]}>
    <torusGeometry
      args={[1.12, 0.006, 16, 100]}
    />

    <meshBasicMaterial
      color="#38bdf8"
      transparent
      opacity={0.35}
    />
  </mesh>

</group>

        {/* =================================================
            ROBOT HEAD
        ================================================= */}

        <mesh scale={[1, 0.92, 0.9]}>
          <sphereGeometry args={[0.85, 64, 64]} />

          <meshStandardMaterial
            color="#b8c7d9"
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>

        {/* =================================================
            DARK FACE VISOR
        ================================================= */}

        <mesh position={[0, 0.02, 0.72]}>
          <sphereGeometry args={[0.59, 48, 48]} />

          <meshStandardMaterial
            color="#020617"
            metalness={0.9}
            roughness={0.08}
            emissive="#06111c"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* =================================================
            LEFT EYE
        ================================================= */}

        <mesh position={[-0.21, 0.10, 1.24]}>
          <sphereGeometry args={[0.085, 24, 24]} />

          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={8}
          />
        </mesh>

        {/* =================================================
            RIGHT EYE
        ================================================= */}

        <mesh position={[0.21, 0.10, 1.24]}>
          <sphereGeometry args={[0.085, 24, 24]} />

          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={8}
          />
        </mesh>

        {/* =================================================
            EYE GLOW
        ================================================= */}

        <pointLight
          position={[0, 0.1, 1.4]}
          intensity={1.8}
          distance={2}
          color="#22d3ee"
        />

        {/* =================================================
            MOUTH / COMMUNICATION BAR
        ================================================= */}

        <mesh position={[0, -0.19, 1.27]}>
          <boxGeometry args={[0.22, 0.025, 0.025]} />

          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={7}
          />
        </mesh>

        {/* =================================================
            LEFT EAR MODULE
        ================================================= */}

        <group position={[-0.82, 0, 0]}>

          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.20, 0.20, 0.16, 32]} />

            <meshStandardMaterial
              color="#64748b"
              metalness={1}
              roughness={0.14}
            />
          </mesh>

          <mesh position={[-0.11, 0, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />

            <meshStandardMaterial
              color="#67e8f9"
              emissive="#22d3ee"
              emissiveIntensity={6}
            />
          </mesh>

        </group>

        {/* =================================================
            RIGHT EAR MODULE
        ================================================= */}

        <group position={[0.82, 0, 0]}>

          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.20, 0.20, 0.16, 32]} />

            <meshStandardMaterial
              color="#64748b"
              metalness={1}
              roughness={0.14}
            />
          </mesh>

          <mesh position={[0.11, 0, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />

            <meshStandardMaterial
              color="#67e8f9"
              emissive="#22d3ee"
              emissiveIntensity={6}
            />
          </mesh>

        </group>

        {/* =================================================
            NECK
        ================================================= */}

        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.28, 0.34, 0.25, 48]} />

          <meshStandardMaterial
            color="#334155"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* =================================================
            LEVITATING AI BASE
        ================================================= */}

        <mesh position={[0, -0.94, 0]}>
          <cylinderGeometry args={[0.42, 0.55, 0.12, 64]} />

          <meshStandardMaterial
            color="#0f172a"
            metalness={1}
            roughness={0.12}
            emissive="#0369a1"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Base cyan ring */}

        <mesh position={[0, -0.99, 0]}>
          <torusGeometry
            args={[0.48, 0.014, 16, 80]}
          />

          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Base violet ring */}

        <mesh position={[0, -1.01, 0]}>
          <torusGeometry
            args={[0.58, 0.008, 16, 80]}
          />

          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.55}
          />
        </mesh>

      </group>
    </Float>
  );
}
