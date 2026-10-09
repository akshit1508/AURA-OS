import { motion } from "framer-motion";

export default function HeroAvatar() {
  return (
    <div className="relative flex h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[450px] lg:w-[450px] items-center justify-center">

      {/* Outer Glow */}
      <div className="absolute h-52 w-52 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-full bg-blue-500/15 blur-3xl"></div>

      {/* Ring */}
      <div className="absolute h-48 w-48 sm:h-60 sm:w-60 lg:h-72 lg:w-72 rounded-full border border-blue-500/20"></div>

      {/* Main Orb */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 shadow-[0_0_120px_rgba(37,99,235,0.5)]"
      >
        {/* Inner Light */}
        <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full bg-white/70 blur-xl"></div>
      </motion.div>

    </div>
  );
}