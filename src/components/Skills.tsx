import { skills } from "../data";
import SectionTitle from "./SectionTitle";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
      <div className="section-card p-6 md:p-10">
        <SectionTitle
          eyebrow="Skills"
          title="Tech stack and core strengths"
          description="A snapshot of the technologies I use to build responsive, modern web apps."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item rounded-xl border border-slate-800 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-200">{skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800">
                <div
                  className="skill-progress h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                  data-level={skill.level}
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
