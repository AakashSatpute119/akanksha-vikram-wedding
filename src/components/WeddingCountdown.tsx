import { useEffect, useState } from "react";
import { wedding } from "../config/wedding";
import {
  formatDateLong,
  getCountdown,
  parseIstDate,
  toDevDigits,
  type CountdownParts,
} from "../lib/date";
import { Mandala } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function WeddingCountdown() {
  const target = parseIstDate(wedding.weddingDate);
  const targetMs = target?.getTime() ?? null;
  const [parts, setParts] = useState<CountdownParts | null>(
    targetMs ? getCountdown(new Date(targetMs)) : null,
  );

  useEffect(() => {
    if (targetMs === null) {
      setParts(null);
      return;
    }
    const tick = () => setParts(getCountdown(new Date(targetMs)));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetMs]);

  const cells = parts
    ? [
        { label: "दिवस", value: toDevDigits(parts.days) },
        { label: "तास", value: toDevDigits(parts.hours, true) },
        { label: "मिनिटे", value: toDevDigits(parts.minutes, true) },
        { label: "सेकंद", value: toDevDigits(parts.seconds, true) },
      ]
    : [];

  const hasDate = targetMs !== null;
  const isFinished = hasDate && parts !== null && parts.total <= 0;

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="relative overflow-hidden bg-burgundy py-16 sm:py-24"
    >
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.05] sm:h-[1000px] sm:w-[1000px]" />
      <GoldDust count={16} />

      <div className="relative mx-auto max-w-4xl px-4">
        <Reveal>
          <SectionHeading
            id="countdown-title"
            eyebrow="The Auspicious Hour"
            title="आनंदाचे क्षण जवळ येत आहेत..."
            subtitle="आपल्या शुभेच्छा आणि उपस्थितीच्या प्रतीक्षेत."
          />
        </Reveal>

        <Reveal delay={0.1}>
          {hasDate && parts && !isFinished && (
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="double-frame bg-burgundy/65 px-3 py-6 shadow-royal sm:px-6 sm:py-8 border-animate-subtle">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {cells.map((cell) => (
                    <div
                      key={cell.label}
                      className="rounded-sm border border-gold/20 bg-maroon/45 px-2 py-4 text-center border-animate"
                    >
                      <p
                        className="font-display text-4xl leading-none text-gold-light sm:text-5xl"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {cell.value}
                      </p>
                      <p className="mt-3 font-serif text-sm leading-relaxed text-ivory/60 sm:text-[12px]">
                        {cell.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center font-serif text-sm text-gold-light/80">
                  {formatDateLong(wedding.weddingDate)}
                </p>
              </div>
            </div>
          )}

          {hasDate && isFinished && (
            <div className="double-frame mx-auto mt-10 max-w-xl bg-burgundy/65 px-6 py-10 text-center border-animate-subtle">
              <p className="font-display text-2xl text-gold-light sm:text-3xl highlight-glow">
                शुभविवाह संपन्न झाला!
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                आपल्या प्रेमळ उपस्थिती व शुभाशीर्वादांसाठी मनःपूर्वक धन्यवाद.
              </p>
            </div>
          )}

          {!hasDate && (
            <div className="double-frame mx-auto mt-10 max-w-xl bg-burgundy/65 px-6 py-10 text-center border-animate-subtle">
              <p className="font-display text-2xl text-gold-light sm:text-3xl highlight-glow">
                आपल्या मंगलक्षणाची प्रतीक्षा...
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                विवाहाचा शुभ मुहूर्त लवकरच जाहीर केला जाईल.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}