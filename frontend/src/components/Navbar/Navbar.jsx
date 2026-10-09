"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavLogo from "./Navlogo";
import NavLinks from "./NavLinks";
import ResumeButton from "./ResumeButton";
import NAV_LINKS from "@/constants/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mt-4 flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0b0b0d]/90 px-4 sm:px-6 backdrop-blur-xl">
        <NavLogo />
        <NavLinks />

        <div className="flex items-center gap-2 sm:gap-3">
          <ResumeButton />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-cyan-400/40 hover:text-cyan-300"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#080d1a]/95 p-3 shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-mono uppercase tracking-[2px] text-gray-300 transition-all hover:bg-blue-500/10 hover:text-cyan-300"
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] text-cyan-400/60">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}