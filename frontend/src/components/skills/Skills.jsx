import SkillsHeader from "./SkillsHeader";
import SkillsControlRoom from "./SkillsControlRoom";

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 py-24 bg-[#050816]"
    >
      <SkillsHeader />

      <SkillsControlRoom />
    </section>
  );
}