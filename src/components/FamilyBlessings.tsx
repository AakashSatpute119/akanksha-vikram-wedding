import { wedding } from "../config/wedding";
import { Divider, Lotus, Mandala } from "./decor/Ornaments";
import { Reveal } from "./ui/Reveal";

export function FamilyBlessings() {
  return (
    <section
      id="blessings"
      aria-labelledby="blessings-title"
      className="relative overflow-hidden bg-cream py-16 text-ink sm:py-24"
    >
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 text-gold-deep/[0.07] sm:h-[980px] sm:w-[980px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <Reveal>
          <p className="font-latin text-sm tracking-[0.42em] text-gold-deep/80 uppercase sm:text-xs">
            Blessings
          </p>
          <h2
            id="blessings-title"
            className="mt-3 font-hero text-3xl text-maroon sm:text-4xl highlight-glow"
          >
            कुटुंबाचे स्नेह व आशीर्वाद
          </h2>
          <Divider className="mt-4 text-gold-deep" />

          <div className="mx-auto mt-8 flex justify-center">
            <Lotus className="h-10 w-16 text-gold-deep/70" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-quote text-xl leading-relaxed text-maroon sm:text-2xl">
            आपली उपस्थिती, आपले प्रेम आणि आपले शुभाशीर्वाद आमच्यासाठी अनमोल आहेत.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            आपण सहकुटुंब येऊन आमच्या आनंदात भर घालावी, ही नम्र विनंती.
          </p>

          {wedding.familyNames.length > 0 && (
            <div className="mx-auto mt-9 max-w-2xl border-y border-gold-deep/25 py-6 border-animate-subtle">
              <p className="font-serif text-sm tracking-[0.28em] text-gold-deep">कुटुंबीय</p>
              <p className="mt-3 font-serif text-base leading-relaxed text-maroon sm:text-lg">
                {wedding.familyNames.join(" · ")}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}