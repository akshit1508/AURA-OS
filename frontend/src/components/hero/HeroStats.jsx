import STATS from "@/constants/heroStats";

export default function HeroStats(){
    return (
        <div className="mt-12 flex  gap-16">
            {STATS.map((stat)=>(
                <div key={stat.label} className="flex flex-col">
                    <h3 className="text-4xl font-bold text-white">{stat.value}</h3>

                    <p className="mt-1 text-base text-gray-400">{stat.label}</p>
                </div>
            ))}

        </div>
    );
}