import { CalendarPlus, MapPin } from "lucide-react";
import { wedding, type WeddingEvent } from "../config/wedding";
import {
  buildCalendarUrl,
  buildMapsSearchUrl,
  formatDateLong,
  formatTimeInIst,
  parseIstDate,
  toDevDigits,
  toLatinDigits,
} from "../lib/date";
import { CornerFlourish } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const dateLabel = formatDateLong(event.date);
  const timeLabel = event.startTime?.trim() || formatTimeInIst(event.date);
  const venue = event.venue?.trim() ?? "";
  const mapQuery =
    venue || [wedding.venueName, wedding.venueAddress].filter(Boolean).join(", ");
  const mapsUrl = event.mapsUrl?.trim() || (mapQuery ? buildMapsSearchUrl(mapQuery) : "");
  const start = parseIstDate(event.date);
  const calendarUrl =
    event.addToCalendar && start
      ? buildCalendarUrl({
          title: `${event.name} — ${wedding.brideName} व ${wedding.groomName}`,
          date: start,
          details: event.description ?? "",
          location: mapQuery,
        })
      : "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-gold/25 bg-gradient-to-b from-maroon/60 to-burgundy/85 p-6 shadow-royal transition-all duration-500 card-hover border-animate">
      <CornerFlourish className="absolute top-2 right-2 h-10 w-10 text-gold/35" />

      {event.image && (
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          decoding="async"
          className="mb-5 h-44 w-full rounded-sm object-cover"
        />
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-[11px] text-gold-light">
          {toDevDigits(index + 1, true)}
        </span>
        {(dateLabel || timeLabel) && (
          <p className="font-numerals text-[11px] tracking-[0.18em] text-gold/75">
            {toLatinDigits([dateLabel, timeLabel].filter(Boolean).join(" · "))}
          </p>
        )}
      </div>

      <h3 className="mt-3 font-hero text-2xl text-cream highlight-glow">{event.name}</h3>

      {event.description && (
        <p className="mt-2 text-sm leading-relaxed text-ivory/70">{event.description}</p>
      )}

      {venue && (
        <p className="mt-4 flex items-start gap-2 text-sm text-ivory/65">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
          <span>{venue}</span>
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2 pt-1">
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-gold"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            स्थळ पहा
          </a>
        )}
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-gold"
          >
            <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
            कॅलेंडरमध्ये जोडा
          </a>
        )}
      </div>
    </article>
  );
}

export function EventTimeline() {
  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="relative overflow-hidden bg-maroon py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.12), transparent 55%)",
        }}
      />
      <GoldDust count={14} />

      <div className="relative mx-auto max-w-5xl px-4">
        <Reveal>
          <SectionHeading
            id="events-title"
            eyebrow="Ceremonies"
            title="विवाह सोहळ्याचे कार्यक्रम"
            subtitle="प्रत्येक विधी हा आपल्या सहभागाने अधिक मंगलमय होतो."
          />
        </Reveal>

        {wedding.events.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wedding.events.map((event, index) => (
              <Reveal key={event.id} delay={index * 0.06}>
                <EventCard event={event} index={index} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1}>
            <div className="double-frame mx-auto mt-10 max-w-xl bg-burgundy/60 px-6 py-10 text-center border-animate-subtle">
              <p className="font-hero text-2xl text-gold-light highlight-glow">
                कार्यक्रमाचे वेळापत्रक लवकरच...
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                हळद, मेहंदी, संगीत, सीमांत पूजन व शुभविवाह यांचे सविस्तर वेळापत्रक येथे
                प्रसिद्ध केले जाईल.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}