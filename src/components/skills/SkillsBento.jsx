import SkillGroup from "./SkillGroup";

export default function SkillsBento() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">

      <SkillGroup
        title="Core Technologies"
        className="lg:col-span-2"
        skills={[
          "React.js",
          "JavaScript",
          "HTML5",
          "CSS3",
        ]}
      />

      <SkillGroup
        title="Currently Exploring"
        skills={[
          "Next.js",
          "Tailwind CSS",
          "React Three Fiber",
        ]}
      />

      <SkillGroup
        title="Other Skills"
        className="lg:col-span-3"
        skills={[
          "WordPress",
          "UI Design",
          "Generative AI",
          "MS Excel",
          "No-Code Platforms",
        ]}
      />

    </div>
  );
}