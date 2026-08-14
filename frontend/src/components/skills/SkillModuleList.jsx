import SkillModule from "./SkillModule";

export default function SkillModuleList({ modules, onSelect, activeModule}) {
  return (
    <div className="space-y-2">

      {modules.map((module) => (
        <SkillModule key={module.id} module={module} onSelect={onSelect} activeModule={activeModule} />
      ))}

    </div>
  );
}