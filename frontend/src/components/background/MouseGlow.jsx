"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
  });

  function handleMouseMove(e) {
    mouseX.set(e.clientX - 250);
    mouseY.set(e.clientY - 250);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"
      />
    </div>
  );
}