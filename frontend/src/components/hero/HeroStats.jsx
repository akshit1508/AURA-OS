import STATS from "@/constants/heroStats";

export default function HeroStats() {
  return (
    <div className="mt-8 sm:mt-12 flex flex-wrap gap-6 sm:gap-10 lg:gap-16">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {stat.value}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}