import { ArrowUp, Heart } from "lucide-react";
import { wedding } from "../config/wedding";
import { Diya } from "./decor/Diya";
import { CornerFlourish, Divider, Mandala } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";

export function WeddingFooter() {
  const familyLine =
    wedding.familyNames.length > 0
      ? wedding.familyNames.join(" · ")
      : "वधू-वरांचे कुटुंबीय";

  return (
    <footer className="relative overflow-hidden bg-[#2a0a14] pt-16 pb-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.16), transparent 62%)",
        }}
      />
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.05] sm:h-[1100px] sm:w-[1100px]" />
      <GoldDust count={18} />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="double-frame relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14 border-animate">
          <CornerFlourish className="absolute top-4 left-4 h-12 w-12 text-gold/60 sm:h-16 sm:w-16" />
          <CornerFlourish className="absolute top-4 right-4 h-12 w-12 scale-x-[-1] text-gold/60 sm:h-16 sm:w-16" />
          <CornerFlourish className="absolute bottom-4 left-4 h-12 w-12 scale-y-[-1] text-gold/60 sm:h-16 sm:w-16" />
          <CornerFlourish className="absolute right-4 bottom-4 h-12 w-12 scale-[-1] text-gold/60 sm:h-16 sm:w-16" />

          <Diya className="mx-auto w-14" glow={false} />

          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ivory/85 sm:text-xl">
            आपल्या प्रेमळ उपस्थितीने आणि शुभाशीर्वादाने आमचा आनंद द्विगुणित करा.
          </p>

          <Divider className="mt-8 text-gold/80" />

          <p className="mt-6 font-serif text-sm tracking-[0.32em] text-gold/70">सस्नेह निमंत्रक</p>
          <p className="mt-2 font-serif text-base text-gold-light">{familyLine}</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="gold-foil font-bride text-2xl sm:text-4xl name-glow">
              {wedding.brideName}
            </span>
            <Heart className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            <span className="gold-foil font-groom text-2xl sm:text-4xl name-glow">
              {wedding.groomName}
            </span>
          </div>

          <p className="mt-4 font-serif text-sm text-gold/70">{wedding.hashtag}</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          <a
            href="#mangalacharan"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs text-gold-light/85 transition-colors hover:border-gold/70 hover:text-cream"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            पुन्हा सुरुवातीला जा
          </a>

          <p className="text-center font-medium text-sm leading-relaxed text-ivory/35">
            ॥ शुभं भवतु ॥
          </p>
        </div>
      </div>
    </footer>
  );
}