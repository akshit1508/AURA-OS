"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {

  // Mouse Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Movement
  const x = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  function handleMouseMove(e) {

    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);

    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >

      <motion.div
        style={{
          x,
          y,
        }}
        className="
        absolute
        h-80
        w-80
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-blue-500/10
        blur-[120px]
        "
      />

    </div>
  );
}