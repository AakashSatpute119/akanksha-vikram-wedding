import { Divider } from "../decor/Ornaments";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  id?: string;
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p
          className={`font-latin text-sm uppercase tracking-[0.42em] sm:text-xs ${
            onDark ? "text-gold/75" : "text-gold-deep/80"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-3 font-decorative text-3xl sm:text-4xl highlight-glow ${
          onDark ? "text-ivory" : "text-maroon"
        }`}
      >
        {title}
      </h2>
      <Divider className={`mt-4 ${onDark ? "text-gold/85" : "text-gold-deep/80"}`} />
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${
            onDark ? "text-ivory/70" : "text-ink/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}