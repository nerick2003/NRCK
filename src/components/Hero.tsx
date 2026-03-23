import { useEffect, useState } from "react";

const roles = ["IT Student", "Aspiring Developer", "Future Software Engineer"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = roles[roleIndex];
    const isTyping = charIndex < currentText.length;
    const timeout = setTimeout(
      () => {
        if (isTyping) {
          setCurrentRole(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          return;
        }
        setCharIndex(0);
        setCurrentRole("");
        setRoleIndex((prev) => (prev + 1) % roles.length);
      },
      isTyping ? 90 : 1200,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, roleIndex]);

  return (
    <section id="hero" className="mx-auto flex min-h-[80vh] w-full max-w-6xl items-center px-4 py-16 md:px-8">
      <div className="hero-animate w-full">
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-primary">Hello, I'm</p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">Neric</h1>
        <h2 className="mt-4 min-h-8 text-xl text-slate-200 md:text-2xl">
          {currentRole}
          <span className="ml-1 animate-pulse text-primary">|</span>
        </h2>
        <p className="mt-6 max-w-2xl text-slate-300">
          I am an IT student building practical web applications with a focus on modern frontend
          development, smooth interactions, and user-first design.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-slate-950 shadow-glow transition hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-200 transition hover:border-primary hover:text-primary"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
