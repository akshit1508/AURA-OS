import ABOUT_STATS from "@/constants/aboutStats";

export default function AboutStats() {
  return (
    <div className="mt-20">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {ABOUT_STATS.map((stat) => (

          <div
            key={stat.label}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-8
              text-center
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-blue-500/40
              hover:shadow-[0_0_25px_rgba(37,99,235,0.25)]
            "
          >

            <h3 className="text-4xl font-bold text-blue-400">
              {stat.number}
            </h3>

            <p className="mt-3 text-gray-300">
              {stat.label}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}