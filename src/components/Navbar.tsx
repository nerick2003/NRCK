import { navItems } from "../data";

type NavbarProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#hero" className="text-lg font-semibold text-white">
          Neri<span className="text-primary">.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-slate-300 transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          onClick={onToggleTheme}
          className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:border-primary hover:text-primary"
        >
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </nav>
    </header>
  );
}
