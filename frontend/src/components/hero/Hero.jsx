import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroAvatar from "./HeroAvatar";
import HeroBackground from "../hero/HeroBackground/HeroBackground";
import HeroSocial from "./HeroSocial";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#030712] py-12 lg:py-0"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 px-4 sm:px-8 lg:px-16 pt-16 lg:pt-0">
        <div className="w-full lg:w-1/2">
          <HeroContent />
          <HeroButtons />
          <HeroSocial />
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center py-6 lg:py-0">
          <HeroAvatar />
        </div>
      </div>
    </section>
  );
}