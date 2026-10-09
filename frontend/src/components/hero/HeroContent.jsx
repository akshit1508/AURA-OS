import { TypeAnimation } from "react-type-animation";
import HERO_DATA from "@/constants/hero";
import HeroBadge from "./HeroBadge";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  const animationSequence = HERO_DATA.roles.flatMap((role) => [
    role,
    2000,
  ]);

  return (
    <div className="flex flex-col">
      {/* Small Heading */}
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[4px] sm:tracking-[8px] text-blue-400/90">
        {HERO_DATA.badge}
      </p>

      {/* Badge */}
      <div className="mt-4 sm:mt-6">
        <HeroBadge />
      </div>

      {/* Name */}
      <h1 className="mt-6 sm:mt-8 bg-gradient-to-r from-white via-gray-100 to-blue-300 bg-clip-text text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[0.95] text-transparent">
        {HERO_DATA.name}
      </h1>

      {/* Animated Roles */}
      <div className="mt-4 sm:mt-8 h-8 sm:h-10">
        <TypeAnimation
          sequence={animationSequence}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-300"
        />
      </div>

      {/* Subtitle */}
      <h2 className="mt-6 sm:mt-8 text-2xl sm:text-4xl lg:text-5xl font-light leading-tight text-gray-200">
        {HERO_DATA.subtitle}
      </h2>

      {/* Description */}
      <div className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-gray-400">
        {HERO_DATA.description.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <HeroStats />
      </div>
    </div>
  );
}