"use client";

import { motion } from "framer-motion";
import NavLogo from "./Navlogo";
import NavLinks from "./NavLinks";
import ResumeButton from "./ResumeButton";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
    >
      <div className="mx-auto mt-4 flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 bg-[#0b0b0d] px-6 backdrop-blur-xl px-8">
        <NavLogo />
        <NavLinks />
        <ResumeButton />
      </div>
    </motion.nav>
  );
}