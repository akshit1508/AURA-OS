import  HERO_DATA  from "@/constants/hero";

export default function HeroContent(){
    return(
        
        <div className="space-y-10">

            <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2">

  <span className="text-sm font-medium tracking-[4px] text-blue-300">

      {HERO_DATA.badge}

  </span>

</div>
            <p className="text-sm uppercase tracking-[6px] text-blue-400 font font-semibold">
                {HERO_DATA.title}</p>


        <h1 className="mt-3 text-7xl font-black leading-none bg-gradient-to-r from-white via-gray-100 to-blue-300 bg-clip-text text-transparent">
            {HERO_DATA.name}</h1>


        <h2 className="mt-8 text-4xl font-light leading-tight text-gray-300">{HERO_DATA.subtitle}</h2>

        <p className="mt-8 max-w-xl text-lg leading-9 text-gray-400">{HERO_DATA.description}</p>
        </div>
    );
}