import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroAvatar from "./HeroAvatar";
import HeroBackground from "../hero/HeroBackground/HeroBackground";
import HeroSocial from "./HeroSocial";
export default function Hero(){
    return (
   <section
   id="home"
    className="relative min-h-screen overflow-hidden bg-[#030712]">
    <HeroBackground />
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-8 lg:px-16">
     <div className=" lg:w-1/2">
        <HeroContent />
        <HeroButtons />
        <HeroSocial />
    </div>
   <div className="flex w-7/12 justify-center">
     <HeroAvatar />
   </div>
   </div>
   </section>
    )
}