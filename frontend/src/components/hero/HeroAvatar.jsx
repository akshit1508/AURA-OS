import { motion } from "framer-motion";

export default function HeroAvatar() {
  return (
    <div className="relative flex h-[450px] w-[450px] items-center justify-center">

      {/* Outer Glow */}
      <div className="absolute h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Ring */}
      <div className="absolute h-72 w-72 rounded-full border border-blue-500/40"></div>

      {/* Main Orb */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 shadow-[0_0_80px_rgba(37,99,235,0.5)]"
      >
        {/* Inner Light */}
        <div className="h-16 w-16 rounded-full bg-white/70 blur-xl"></div>
      </motion.div>

    </div>
  );
}