import { Heart } from "lucide-react";
import { wedding, isConfigured } from "../config/wedding";
import { Divider, Lotus, Mandala } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Toran } from "./decor/Toran";
import { Reveal } from "./ui/Reveal";

function Portrait({
  role,
  name,
  photo,
  monogram,
  delay,
  imageClass = "",
  nameClass = "",
}: {
  role: string;
  name: string;
  photo: string;
  monogram: string;
  delay: number;
  imageClass?: string;
  nameClass?: string;
}) {
  return (
    <Reveal delay={delay} className="flex justify-center">
      <div className="w-full max-w-[248px]">
        <div className="arch border border-gold/40 bg-gradient-to-b from-maroon/70 to-burgundy/60 p-2.5 shadow-royal border-glow animate-gold-flow">
          <div className="arch relative aspect-[3/4] overflow-hidden border border-gold/25 bg-[radial-gradient(ellipse_at_50%_35%,rgba(198,161,91,0.22),rgba(61,16,33,0.9))]">
            {photo ? (
              <img
                src={photo}
                alt={`${role} ${name}`}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover ${imageClass}`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4">
                <span className="font-display text-5xl text-gold/55" aria-hidden="true">
                  {monogram}
                </span>
                <span className="font-serif text-sm text-gold/50">
                  छायाचित्र लवकरच
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/15" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className={`font-bride text-xl text-cream portrait-name-glow ${nameClass}`}>{name}</p>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-gold/70">{role}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function CoupleSection() {
  return (
    <section
      id="couple"
      aria-labelledby="couple-title"
      className="relative overflow-hidden bg-maroon py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.16), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(36,72,59,0.25), transparent 60%)",
        }}
      />
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.05] sm:h-[1050px] sm:w-[1050px]" />
      <GoldDust count={16} />
      <Toran className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full opacity-70 sm:h-20" />

      <div className="relative mx-auto max-w-5xl px-4 pt-6">
        <Reveal>
          <div className="text-center">
            <p className="font-latin text-sm tracking-[0.42em] text-gold/75 uppercase sm:text-xs">
              The Couple
            </p>
            <p className="mx-auto mt-4 max-w-xl font-serif text-base leading-relaxed text-gold-light/90 sm:text-lg">
              प्रेमाच्या सुंदर प्रवासाला मिळते आहे नात्याची नवी ओळख...
            </p>

            <h2
              id="couple-title"
              className="mt-6 flex flex-col items-center gap-1"
            >
              <span className="gold-foil font-bride text-4xl leading-tight sm:text-6xl name-glow">
                {wedding.brideName}
              </span>
              <Heart
                className="my-1 h-5 w-5 fill-gold/80 text-gold sm:h-6 sm:w-6"
                aria-hidden="true"
              />
              <span className="gold-foil font-groom text-4xl leading-tight sm:text-6xl name-glow">
                {wedding.groomName}
              </span>
            </h2>

            <Divider className="mt-6 text-gold/85" />
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:mt-12 sm:gap-6">
          <Portrait
            role="वधू"
            name={wedding.brideName}
            photo={isConfigured(wedding.bridePhoto) ? wedding.bridePhoto : ""}
            monogram="आ"
            delay={0.05}
          />

          <div className="flex flex-col items-center gap-2 text-gold/55" aria-hidden="true">
            <span className="hidden h-14 w-px bg-gold/30 sm:block" />
            <Lotus className="h-8 w-12" />
            <span className="hidden h-14 w-px bg-gold/30 sm:block" />
          </div>

          <Portrait
            role="वर"
            name={wedding.groomName}
            photo={isConfigured(wedding.groomPhoto) ? wedding.groomPhoto : ""}
            monogram="वि"
            delay={0.15}
            nameClass="font-groom"
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-quote text-lg leading-relaxed text-ivory/85 sm:text-xl">
            दोन जीव, दोन कुटुंबे, आणि आयुष्यभर जपण्याचे एक सुंदर नाते.
          </p>
        </Reveal>
      </div>
    </section>
  );
}