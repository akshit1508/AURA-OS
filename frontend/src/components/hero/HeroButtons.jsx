import HERO_DATA from "@/constants/hero";

export default function HeroButtons() {
  return (
    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
      <a
        href="#projects"
        className="group flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 sm:px-10 py-3.5 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.5)]"
      >
        <span>{HERO_DATA.primaryButton}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>

      <a
        href="#contact"
        className="flex items-center justify-center rounded-xl border border-gray-700 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-sm sm:text-base text-gray-300 whitespace-nowrap hover:border-blue-500 hover:text-white duration-300 transition-all"
      >
        {HERO_DATA.secondaryButton}
      </a>
    </div>
  );
}