import { wedding, isConfigured } from "../config/wedding";
import { formatDateLong, formatTimeInIst, toLatinDigits } from "../lib/date";
import { CornerFlourish, Divider, MangoLeaf, WadaSkyline } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function Detail({
  label,
  value,
  numeric = false,
}: {
  label: string;
  value: string;
  numeric?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="font-serif text-sm tracking-[0.22em] text-gold-deep">{label}</p>
      <p
        className={`mt-1.5 text-sm leading-snug text-maroon sm:text-base ${
          numeric ? "font-numerals" : "font-serif"
        }`}
      >
        {numeric ? toLatinDigits(value) : value}
      </p>
    </div>
  );
}

export function InvitationCard() {
  const dateLabel = formatDateLong(wedding.weddingDate);
  const muhurtaLabel = wedding.muhurtaTime?.trim() || formatTimeInIst(wedding.weddingDate);
  const venueLabel = [wedding.venueName, wedding.venueAddress]
    .filter((part) => isConfigured(part))
    .join(", ");

  const hasDetails = Boolean(dateLabel || muhurtaLabel || venueLabel);
  const hasBrideParents = wedding.brideParents.length > 0;
  const hasGroomParents = wedding.groomParents.length > 0;

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="relative overflow-hidden bg-burgundy py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(198,161,91,0.14), transparent 55%)",
        }}
      />
      <GoldDust count={18} />

      <div className="relative mx-auto max-w-4xl px-4">
        <Reveal>
          <SectionHeading
            id="invitation-title"
            eyebrow="The Invitation"
            title="आमंत्रण"
            subtitle="आमच्या आनंदाच्या क्षणी आपले स्नेहाळ स्वागत आहे."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="paper double-frame relative overflow-hidden px-6 pt-10 pb-28 shadow-royal sm:px-12 sm:pt-14 sm:pb-36 border-animate">
            <CornerFlourish className="absolute top-4 left-4 h-12 w-12 text-gold-deep/60 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute top-4 right-4 h-12 w-12 scale-x-[-1] text-gold-deep/60 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute bottom-4 left-4 h-12 w-12 scale-y-[-1] text-gold-deep/60 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute right-4 bottom-4 h-12 w-12 scale-[-1] text-gold-deep/60 sm:h-16 sm:w-16" />

            <WadaSkyline className="pointer-events-none absolute inset-x-0 bottom-0 block w-full text-gold-deep/10" />

            <div className="relative text-center">
              <div className="flex items-center justify-center gap-3">
                <MangoLeaf className="h-5 w-3.5 rotate-[-22deg] text-gold-deep/60" />
                <p className="font-serif text-xs tracking-[0.14em] text-maroon sm:text-sm">
                  ॥ श्री गणेशाय नमः ॥
                </p>
                <MangoLeaf className="h-5 w-3.5 rotate-[22deg] scale-x-[-1] text-gold-deep/60" />
              </div>

              <h3 className="mt-5 font-hero text-3xl text-maroon sm:text-4xl">
                सस्नेह निमंत्रण!
              </h3>

              <Divider className="mt-4 text-gold-deep" />

              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
                श्री गणेशाच्या कृपाशीर्वादाने व वडीलधाऱ्यांच्या शुभाशीर्वादाने
              </p>

              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
                <span className="gold-foil font-bride text-4xl leading-tight sm:text-5xl">
                  {wedding.brideName}
                </span>
                <span className="gold-foil font-groom text-4xl leading-tight sm:text-5xl">
                  {wedding.groomName}
                </span>
              </div>

              <p className="mx-auto mt-4 max-w-lg font-serif text-base leading-relaxed text-maroon sm:text-lg">
                यांचा शुभविवाह सोहळा आयोजित केला आहे.
              </p>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
                या मंगलप्रसंगी आपण सहकुटुंब उपस्थित राहून वधू-वरांना शुभाशीर्वाद द्यावेत, ही नम्र
                विनंती.
              </p>

              {(hasBrideParents || hasGroomParents) && (
                <>
                  <Divider className="mt-8 text-gold-deep/80" />
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    {hasBrideParents && (
                      <div>
                        <p className="font-serif text-sm tracking-[0.22em] text-gold-deep">
                          वधूचे आई-वडील
                        </p>
                        <p className="mt-1.5 font-serif text-base text-maroon">
                          {wedding.brideParents.map((person) => person.name).join(" · ")}
                        </p>
                      </div>
                    )}
                    {hasGroomParents && (
                      <div>
                        <p className="font-serif text-sm tracking-[0.22em] text-gold-deep">
                          वराचे आई-वडील
                        </p>
                        <p className="mt-1.5 font-serif text-base text-maroon">
                          {wedding.groomParents.map((person) => person.name).join(" · ")}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {hasDetails ? (
                <div className="mx-auto mt-8 grid max-w-xl gap-4 border-y border-gold-deep/25 py-6 sm:grid-cols-3">
                  {dateLabel && <Detail label="शुभ दिनांक" value={dateLabel} numeric />}
                  {muhurtaLabel && <Detail label="मुहूर्त" value={muhurtaLabel} numeric />}
                  {venueLabel && <Detail label="स्थळ" value={venueLabel} />}
                </div>
              ) : (
                <p className="mt-8 font-serif text-sm text-ink/55 italic">
                  विवाहाचा शुभ मुहूर्त व स्थळ यथावकाश कळवले जाईल.
                </p>
              )}

              <p className="mt-8 mb-16 font-quote text-sm leading-relaxed text-maroon sm:mb-28">
                सस्नेह,
                <br />
                <span className="text-ink/75">वधू-वरांचे कुटुंबीय</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}