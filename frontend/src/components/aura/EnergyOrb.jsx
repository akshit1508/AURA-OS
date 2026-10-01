"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";

function EnergyParticles() {
   const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.06;
  });

  const particles = Array.from({ length: 18 }, (_, index) => {
    const angle = (index / 18) * Math.PI * 2;

    const radius = 1.25 + (index % 3) * 0.12;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.65,
      z: Math.sin(angle) * radius,
      scale: 0.018 + (index % 3) * 0.012,
    };
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[
            particle.x,
            particle.y,
            particle.z,
          ]}
          scale={particle.scale}
        >
          <sphereGeometry args={[1, 12, 12]} />

          <meshBasicMaterial
            color={
              index % 4 === 0
                ? "#a78bfa"
                : "#67e8f9"
            }
          />
        </mesh>
      ))}
    </group>
  );

}

export default function EnergyOrb({ transitioning }) {
    const orb = useRef(null);

 useFrame((state, delta) => {
  if (!orb.current) return;

  orb.current.rotation.y += delta * 0.28;
  orb.current.rotation.x += delta * 0.12;

  const targetScale = transitioning ? 1.25 : 1;

  orb.current.scale.x +=
    (targetScale - orb.current.scale.x) * 0.12;

  orb.current.scale.y +=
    (targetScale - orb.current.scale.y) * 0.12;

  orb.current.scale.z +=
    (targetScale - orb.current.scale.z) * 0.12;
});

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.35}
    >
     <group
  ref={orb}
  scale={transitioning ? 1.25 : 1}
>

        {/* Outer shell */}

        <Sphere args={[1.12, 64, 64]}>
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.05}
            wireframe
          />
        </Sphere>

        {/* Main energy core */}

        <Sphere args={[0.86, 64, 64]}>
          <MeshDistortMaterial
            color="#071426"
            emissive="#0284c7"
            emissiveIntensity={1.4}
            roughness={0.14}
            metalness={0.92}
            distort={0.22}
            speed={1.4}
          />
        </Sphere>

        {/* Inner glowing core */}

        <Sphere args={[0.30, 48, 48]}>
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={7}
            roughness={0.08}
            metalness={0.85}
          />
        </Sphere>

        {/* Cyan orbit */}

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry
            args={[0.98, 0.012, 16, 100]}
          />

          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Violet orbit */}

        <mesh rotation={[0.7, 0.3, 0]}>
          <torusGeometry
            args={[1.08, 0.008, 16, 100]}
          />

          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Floating particles */}

{/* =================================================
    FLOATING ENERGY PLATFORM
================================================= */}

<group position={[0, -1.25, 0]}>

  {/* Main platform */}

  <mesh rotation={[0, 0, 0]}>
    <cylinderGeometry args={[0.52, 0.68, 0.12, 64]} />

    <meshStandardMaterial
      color="#071426"
      emissive="#0284c7"
      emissiveIntensity={1.5}
      metalness={0.95}
      roughness={0.16}
    />
  </mesh>

  {/* Cyan energy ring */}

  <mesh rotation={[0, 0, 0]}>
    <torusGeometry
      args={[0.56, 0.018, 16, 80]}
    />

    <meshBasicMaterial
      color="#67e8f9"
      transparent
      opacity={0.85}
    />
  </mesh>

  {/* Violet outer ring */}

  <mesh rotation={[0, 0, 0]}>
    <torusGeometry
      args={[0.68, 0.008, 16, 80]}
    />

    <meshBasicMaterial
      color="#a78bfa"
      transparent
      opacity={0.55}
    />
  </mesh>

  {/* Platform glow */}

  <pointLight
    position={[0, 0.1, 0]}
    intensity={2}
    distance={2}
    color="#22d3ee"
  />

</group>
        <EnergyParticles />

      </group>
    </Float>
  );

}