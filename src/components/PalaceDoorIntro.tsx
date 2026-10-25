import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CornerFlourish, Divider, Lotus } from "./decor/Ornaments";
import { Diya } from "./decor/Diya";
import { GoldDust, MarigoldPetals } from "./decor/Particles";
import { Toran } from "./decor/Toran";

type IntroProps = {
  onEnter: (options?: { playMusic?: boolean }) => void;
};

const woodGrain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.22' numOctaves='4' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23w)' opacity='0.5'/%3E%3C/svg%3E\")";

function DoorPanel({ side }: { side: "left" | "right" }) {
  const seamSide = side === "left" ? "right-0" : "left-0";

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(100deg, #2b1009 0%, #451c10 20%, #5c2a17 46%, #4a1e11 74%, #260d07 100%)",
        boxShadow: "inset 0 0 140px rgba(0,0,0,0.8)",
      }}
    >
      <div
        className="absolute inset-0 opacity-70 mix-blend-overlay"
        style={{ backgroundImage: woodGrain, backgroundSize: "420px 420px" }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.38) 0 1px, rgba(255,226,180,0.04) 1px 2px, transparent 2px 86px)",
        }}
      />

      <div className="absolute inset-3 border border-gold/30 sm:inset-5" />
      <div className="absolute inset-[18px] border border-gold/15 sm:inset-7" />

      <div className="absolute left-[14%] right-[14%] top-[6%] h-[44%] rounded-t-full border border-gold/25">
        <div className="absolute inset-2 rounded-t-full border border-gold/15" />
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <Lotus className="h-9 w-14 text-gold/60" />
        </div>
        <div className="absolute inset-x-6 bottom-3 top-9 rounded-t-full border border-gold/10" />
        <div className="absolute bottom-3 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 border border-gold/20">
          <div className="absolute inset-1.5 rotate-0 border border-gold/15" />
        </div>
      </div>

      <div className="absolute left-[14%] right-[14%] top-[55%] h-[15%] rounded-md border border-gold/20">
        <div className="absolute inset-2 rounded border border-gold/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rotate-45 border border-gold/30" />
        </div>
      </div>

      <div className="absolute left-[14%] right-[14%] top-[74%] h-[15%] rounded-md border border-gold/20">
        <div className="absolute inset-2 rounded border border-gold/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rotate-45 border border-gold/30" />
        </div>
      </div>

      <div
        className={`absolute inset-y-8 ${seamSide} w-6`}
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #E5CA8B 0 1.6px, #7a4b1e 1.6px 2.4px, transparent 2.6px)",
          backgroundSize: "10px 34px",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />

      <div className={`absolute inset-y-0 ${seamSide} w-10 bg-gradient-to-r from-black/70 to-transparent ${side === "right" ? "rotate-180" : ""}`} />

      <div className="absolute left-1/2 top-[52%] -translate-x-1/2">
        <svg viewBox="0 0 70 90" className="h-20 w-16" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`brass-${side}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6E4318" />
              <stop offset="45%" stopColor="#E5CA8B" />
              <stop offset="100%" stopColor="#8F6A2F" />
            </linearGradient>
          </defs>
          <rect x="14" y="4" width="42" height="62" rx="20" fill="#3a170e" stroke={`url(#brass-${side})`} strokeWidth="1" opacity="0.9" />
          <circle cx="35" cy="42" r="17" stroke={`url(#brass-${side})`} strokeWidth="4.5" />
          <circle cx="35" cy="42" r="23" stroke="#2a0f08" strokeWidth="2" opacity="0.6" />
          <circle cx="35" cy="18" r="2.4" fill="#E5CA8B" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

export function PalaceDoorIntro({ onEnter }: IntroProps) {
  const reduced = useReducedMotion();
  const [quick, setQuick] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("av-intro-seen") === "1";
    const smallScreen = window.matchMedia("(max-width: 640px)").matches;
    setQuick(seen || smallScreen);
    sessionStorage.setItem("av-intro-seen", "1");
  }, []);

  const scale = quick ? 0.55 : 1;

  const openDelay = reduced ? 0 : 0.9 * scale;
  const openDuration = reduced ? 0 : 2.3 * scale;
  const contentBase = reduced ? 0 : 1.7 * scale;

  const doorTransition = {
    duration: openDuration,
    delay: openDelay,
    ease: [0.66, 0, 0.34, 1] as [number, number, number, number],
  };

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduced ? 0 : 1, delay: contentBase + delay, ease: "easeOut" as const },
  });

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-burgundy"
      role="region"
      aria-label="आमंत्रण प्रस्तावना"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, #7a2439 0%, #4c1427 38%, #2c0b18 72%, #1c0710 100%)",
        }}
      />

      <GoldDust count={26} />

      <div className="absolute inset-0 flex items-center justify-center px-5 py-16">
        <div className="relative w-full max-w-2xl text-center">
          <motion.p
            {...reveal(0)}
            className="font-latin text-sm tracking-[0.42em] text-gold/85 uppercase sm:text-xs"
          >
            A Royal Peshwai Wedding
          </motion.p>

          <motion.p
            {...reveal(0.12)}
            className="mt-4 font-serif text-sm tracking-[0.15em] text-gold-light sm:text-base"
          >
            ॥ श्री गणेशाय नमः ॥
          </motion.p>

          <motion.div {...reveal(0.24)} className="mt-4 flex justify-center text-gold/80">
            <Divider />
          </motion.div>

          <motion.h1
            {...reveal(0.32)}
            className="gold-foil mt-5 text-2xl leading-snug sm:text-4xl"
            style={{ textShadow: "0 0 30px rgba(198,161,91,0.25)" }}
          >
            शुभविवाह सोहळा
          </motion.h1>

          <div className="mt-6 flex flex-col items-center">
            <motion.span
              {...reveal(0.46)}
              className="gold-foil font-bride text-5xl leading-tight sm:text-7xl name-glow text-gold/95"
            >
              आकांक्षा
            </motion.span>
            <motion.span
              {...reveal(0.6)}
              className="my-1 flex items-center gap-3 font-serif text-sm tracking-[0.3em] text-gold/85"
            >
              <span className="h-px w-8 bg-gold/40" />
              <span className="font-display text-sm text-gold">♥</span>
              <span className="h-px w-8 bg-gold/40" />
            </motion.span>
            <motion.span
              {...reveal(0.72)}
              className="gold-foil font-groom text-5xl leading-tight sm:text-7xl name-glow text-gold/95"
            >
              विक्रम
            </motion.span>
          </div>

          <motion.p
            {...reveal(0.9)}
            className="mx-auto mt-6 max-w-md font-serif text-sm leading-relaxed text-ivory/90 sm:text-base"
          >
            दोन मनांचा, दोन कुटुंबांचा प्रेमळ मिलाफ...
          </motion.p>

          <motion.p
            {...reveal(1.02)}
            className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ivory/80 sm:text-sm"
          >
            आपली उपस्थिती आणि आपले शुभाशीर्वाद हेच आमच्यासाठी अनमोल आहेत.
          </motion.p>

          <motion.div {...reveal(1.18)} className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => onEnter({ playMusic: true })}
              className="btn-gold group"
            >
              <span className="text-gold-deep" aria-hidden="true">
                ❖
              </span>
              ॥ आमंत्रण पहा ॥
            </button>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex"
        style={{ perspective: "2200px" }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-1/2"
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={reduced ? false : { rotateY: 0 }}
          animate={{ rotateY: -112 }}
          transition={reduced ? { duration: 0 } : doorTransition}
        >
          <DoorPanel side="left" />
        </motion.div>
        <motion.div
          className="h-full w-1/2"
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={reduced ? false : { rotateY: 0 }}
          animate={{ rotateY: 112 }}
          transition={reduced ? { duration: 0 } : doorTransition}
        >
          <DoorPanel side="right" />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, rgba(255,216,145,0.22) 0%, rgba(255,190,105,0.08) 30%, transparent 62%)",
        }}
      />

      <MarigoldPetals count={12} className="z-20" />

      <div className="pointer-events-none absolute inset-2 z-30 border border-gold/35 sm:inset-4" />
      <div className="pointer-events-none absolute inset-[13px] z-30 border border-gold/15 sm:inset-[22px]" />
      <CornerFlourish className="pointer-events-none absolute left-2 top-2 z-30 h-14 w-14 text-gold/70 sm:left-4 sm:top-4 sm:h-20 sm:w-20" />
      <CornerFlourish className="pointer-events-none absolute right-2 top-2 z-30 h-14 w-14 scale-x-[-1] text-gold/70 sm:right-4 sm:top-4 sm:h-20 sm:w-20" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 z-30 h-14 w-14 scale-y-[-1] text-gold/70 sm:bottom-4 sm:left-4 sm:h-20 sm:w-20" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 z-30 h-14 w-14 scale-[-1] text-gold/70 sm:bottom-4 sm:right-4 sm:h-20 sm:w-20" />

      <Toran className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-16 w-full opacity-90 sm:block" />

      <Diya className="pointer-events-none absolute bottom-6 left-6 z-30 hidden w-16 opacity-90 md:block" />
      <Diya className="pointer-events-none absolute bottom-6 right-6 z-30 hidden w-16 opacity-90 md:block" />

      <button
        type="button"
        onClick={() => onEnter()}
        className="absolute right-4 top-20 z-40 rounded-full border border-gold/40 bg-burgundy/50 px-4 py-2 text-xs text-gold-light backdrop-blur transition-colors hover:border-gold/80 hover:text-cream sm:right-8 sm:top-8 sm:text-sm"
      >
        प्रस्तावना वगळा
      </button>
    </div>
  );
}