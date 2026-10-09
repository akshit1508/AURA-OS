import HERO_SOCIALS from "@/constants/heroSocial";

export default function HeroSocial() {
  return (
    <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-6">
      {HERO_SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.35)]"
        >
          <img
            src={social.icon}
            alt={social.name}
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
          />

          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
}