type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Override default eyebrow color (default: primary accent) */
  eyebrowClassName?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  eyebrowClassName = "text-primary",
}: SectionTitleProps) {
  return (
    <div className="mb-8">
      <p className={`mb-2 text-sm uppercase tracking-[0.2em] ${eyebrowClassName}`}>{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-slate-300">{description}</p> : null}
    </div>
  );
}
