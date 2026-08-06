import HERO_DATA from "@/constants/hero"

export default function HeroButtons(){
    return (
        <div className="mt-10 items-center flex gap-6 space-y-10">
            <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-10 py-4 font-semibold whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-[0_0_35px_rbga(37,99,235,0.5)]">
                {HERO_DATA.primaryButton}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </button>

            <button className="rounded-xl border-gray-700 border px-8 py-4 font-semibold  text-gray-300 hover:border-blue-500 hover:text-white duration-300 transition-all">
                {HERO_DATA.secondaryButton}
            </button>

        </div>
    )
}