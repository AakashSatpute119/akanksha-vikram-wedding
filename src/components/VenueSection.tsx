import { Car, MapPin, Navigation, TrainFront, CalendarDays } from "lucide-react";
import { isConfigured, wedding } from "../config/wedding";
import {
  buildMapsEmbedUrl,
  buildMapsSearchUrl,
  formatDateLong,
  formatTimeInIst,
} from "../lib/date";
import { CornerFlourish } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function VenueSection() {
  const hasVenue = isConfigured(wedding.venueName) || isConfigured(wedding.venueAddress);
  const query = [wedding.venueName, wedding.venueAddress].filter(isConfigured).join(", ");
  const mapsLink = isConfigured(wedding.googleMapsUrl)
    ? wedding.googleMapsUrl
    : query
      ? buildMapsSearchUrl(query)
      : "";
  const dateLabel = formatDateLong(wedding.weddingDate);
  const timeLabel = wedding.muhurtaTime?.trim() || formatTimeInIst(wedding.weddingDate);

  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="relative overflow-hidden bg-maroon py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(36,72,59,0.3), transparent 60%)",
        }}
      />
      <GoldDust count={12} />

      <div className="relative mx-auto max-w-5xl px-4">
        <Reveal>
          <SectionHeading
            id="venue-title"
            eyebrow="The Venue"
            title="विवाहाचे स्थळ"
            subtitle="आपल्या आगमनाची आम्हाला आतुरतेने प्रतीक्षा आहे."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="double-frame relative h-full bg-cream/95 p-6 text-ink shadow-royal sm:p-8 border-animate-subtle card-hover">
              <CornerFlourish className="absolute top-3 right-3 h-12 w-12 scale-x-[-1] text-gold-deep/50" />

              <p className="font-serif text-sm tracking-[0.28em] text-gold-deep">स्थळ</p>
              <h3 className="mt-2 font-decorative text-2xl text-maroon sm:text-3xl highlight-glow">
                {isConfigured(wedding.venueName) ? wedding.venueName : "स्थळाची माहिती लवकरच"}
              </h3>

              {isConfigured(wedding.venueAddress) && (
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/70">
                  {wedding.venueAddress}
                </p>
              )}

              {(dateLabel || timeLabel) && (
                <div className="mt-5 flex items-start gap-3 border-t border-gold-deep/20 pt-4">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <p className="text-sm text-ink/75">
                    {[dateLabel, timeLabel].filter(Boolean).join(" · ")}
                  </p>
                </div>
              )}

              {isConfigured(wedding.parkingInfo) && (
                <div className="mt-4 flex items-start gap-3 border-t border-gold-deep/20 pt-4">
                  <Car className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-ink/70">{wedding.parkingInfo}</p>
                </div>
              )}

              {isConfigured(wedding.travelInfo) && (
                <div className="mt-4 flex items-start gap-3 border-t border-gold-deep/20 pt-4">
                  <TrainFront className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-ink/70">{wedding.travelInfo}</p>
                </div>
              )}

              {!hasVenue && (
                <p className="mt-5 border-t border-gold-deep/20 pt-4 text-sm leading-relaxed text-ink/55">
                  विवाहस्थळाचा पत्ता व नकाशाची माहिती यथावकाश येथे प्रसिद्ध केली जाईल.
                </p>
              )}

              {mapsLink && (
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold mt-6 text-sm"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Google Maps मध्ये मार्ग पहा
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="double-frame relative min-h-[300px] overflow-hidden bg-burgundy/70 border-animate-subtle">
              {query ? (
                <iframe
                  title="विवाहस्थळाचा नकाशा"
                  src={buildMapsEmbedUrl(query)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[300px] w-full border-0 opacity-95"
                />
              ) : (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 px-8 text-center">
                  <MapPin className="h-7 w-7 text-gold/60" aria-hidden="true" />
                  <p className="font-serif text-sm text-ivory/60">
                    नकाशाची झलक लवकरच येथे दिसेल.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}