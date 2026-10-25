import { Diya } from "./decor/Diya";
import { CornerFlourish, Divider, Lotus, Mandala } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";

export function Mangalacharan() {
  return (
    <section
      id="mangalacharan"
      aria-labelledby="mangalacharan-title"
      className="relative overflow-hidden bg-burgundy py-16 sm:py-24"
    >
      <Mandala className="animate-slow-spin pointer-events-none absolute top-1/2 left-1/2 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.06] sm:h-[1200px] sm:w-[1200px]" />
      <GoldDust count={14} />

      <div className="relative mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="paper double-frame relative overflow-hidden px-6 py-12 text-center sm:px-14 sm:py-16 border-animate">
            <CornerFlourish className="absolute top-3 left-3 h-12 w-12 text-gold-deep/70 sm:h-20 sm:w-20" />
            <CornerFlourish className="absolute top-3 right-3 h-12 w-12 scale-x-[-1] text-gold-deep/70 sm:h-20 sm:w-20" />
            <CornerFlourish className="absolute bottom-3 left-3 h-12 w-12 scale-y-[-1] text-gold-deep/70 sm:h-20 sm:w-20" />
            <CornerFlourish className="absolute right-3 bottom-3 h-12 w-12 scale-[-1] text-gold-deep/70 sm:h-20 sm:w-20" />

            <p className="font-serif text-sm tracking-[0.14em] text-maroon sm:text-base">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div className="relative mx-auto mt-6 flex h-20 w-24 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-gold/10 blur-md"
                aria-hidden="true"
              />
              <Lotus className="relative h-16 w-24 text-gold-deep" />
            </div>

            <h1
              id="mangalacharan-title"
              className="mt-4 font-hero text-3xl text-maroon sm:text-4xl highlight-glow"
            >
              शुभमंगल
            </h1>
            <Divider className="mt-4 text-gold-deep" />

            <div className="mt-7 font-quote text-lg leading-relaxed text-maroon sm:text-xl space-y-2 highlight-glow max-w-full break-words">
              <p className="whitespace-nowrap overflow-hidden">श्री गजानन प्रसन्न ॥ श्री खंडोबा प्रसन्न ॥</p>
              <p className="whitespace-nowrap overflow-hidden">श्री तुळजाभवानी प्रसन्न ॥ श्री सोनार सिद्ध प्रसन्न ॥</p>
            </div>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
              स.न.वि.वि. आपल्या येथे श्री. गजानन कृपेने...
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
              वडीलधाऱ्यांच्या आशीर्वादाने आणि आप्तेष्टांच्या प्रेमाने, आमच्या आयुष्यातील एक
              मंगलमय क्षण साकार होत आहे.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4 text-gold-deep/60">
              <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
              <Diya className="w-12" glow={false} />
              <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}