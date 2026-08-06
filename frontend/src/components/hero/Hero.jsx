import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroAvatar from "./HeroAvatar";
import HeroBackground from "../background/HeroBackground";
export default function Hero(){
    return (
   <section
   onMouseMove={handleMouseMove}
    className="relative min-h-screen overflow-hidden bg-[#030712]">
    <HeroBackground />
    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8 lg:px-16">
     <div className=" w-5/12">
        <HeroContent />
        <HeroButtons />
    </div>

   <div className="flex w-7/12 justify-center">
     <HeroAvatar />
   </div>
   </div>
   </section>
    )
}