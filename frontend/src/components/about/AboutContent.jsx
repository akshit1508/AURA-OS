import ABOUT_DATA from "@/constants/about";

export default function AboutContent() {
  return (
    <div>

      <p className="text-sm font-semibold uppercase tracking-[6px] text-blue-400">
        {ABOUT_DATA.sectionTitle}
      </p>

      <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
       {ABOUT_DATA.heading}
        <br />
        {ABOUT_DATA.headingSecondLine}
      </h2>

      <p className="mt-8 text-lg leading-8 text-gray-400">
       {ABOUT_DATA.description}
      </p>

    </div>
  );
}