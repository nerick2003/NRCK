import SectionTitle from "./SectionTitle";

export default function Education() {
  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
      <div className="section-card p-6 md:p-10">
        <SectionTitle
          eyebrow="Experience / Education"
          title="Academic journey and growth"
          description="My current educational background and coursework relevant to software development."
        />
        <div className="space-y-5 text-slate-300">
          <div className="rounded-xl border border-slate-800 p-5">
            <h3 className="text-lg font-semibold text-white">Bachelor of Science in Information Technology</h3>
            <p className="mt-1 text-sm text-slate-400">Your University Name • 2023 - Present</p>
            <p className="mt-3">
              Relevant coursework: Data Structures, Database Systems, Object-Oriented Programming,
              Human-Computer Interaction, Networking, and Software Engineering.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 p-5">
            <h3 className="text-lg font-semibold text-white">Achievements</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Built multiple full-stack student projects and maintained GitHub documentation.</li>
              <li>Participated in campus coding workshops and hackathon activities.</li>
              <li>Consistently improving problem-solving through coding challenges.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
