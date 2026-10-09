import ABOUT_DATA from "@/constants/about";

export default function AboutContent() {
  return (
    <div>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[4px] sm:tracking-[6px] text-blue-400">
        {ABOUT_DATA.sectionTitle}
      </p>

      <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
        {ABOUT_DATA.heading}
        <br />
        {ABOUT_DATA.headingSecondLine}
      </h2>

      <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-400">
        {ABOUT_DATA.description}
      </p>
    </div>
  );
}