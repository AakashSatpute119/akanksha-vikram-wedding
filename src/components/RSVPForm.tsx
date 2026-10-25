import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  TriangleAlert,
} from "lucide-react";
import { isConfigured, wedding } from "../config/wedding";
import { toDevDigits } from "../lib/date";
import { CornerFlourish } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Attendance = "yes" | "no" | "";
type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

type FormErrors = {
  name?: string;
  attending?: string;
  guests?: string;
  message?: string;
};

const guestOptions = Array.from({ length: 10 }, (_, index) => index + 1);

export function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attendance>("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const phoneDigits = wedding.rsvpPhone.replace(/\D/g, "");
  const waNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;
  const hasEndpoint = isConfigured(wedding.rsvpEndpoint);

  const waText = [
    `नमस्कार! मी ${name.trim() || "…"}.`,
    attending === "yes"
      ? `आकांक्षा आणि विक्रम यांच्या शुभविवाह सोहळ्यास मी उपस्थित राहीन (${guests} पाहुणे).`
      : attending === "no"
        ? "क्षमस्व, मी या शुभविवाह सोहळ्यास उपस्थित राहू शकत नाही."
        : "आकांक्षा आणि विक्रम यांच्या शुभविवाह सोहळ्याबाबत माझे उत्तर:",
    message.trim() ? `शुभेच्छा: ${message.trim()}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const waHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}` : "";
  const mailHref = isConfigured(wedding.rsvpEmail)
    ? `mailto:${wedding.rsvpEmail}?subject=${encodeURIComponent(
        "शुभविवाह सोहळा — आर.एस.व्ही.पी.",
      )}&body=${encodeURIComponent(waText)}`
    : "";

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = "कृपया आपले पूर्ण नाव लिहा.";
    }
    if (!attending) {
      next.attending = "कृपया आपले उत्तर निवडा.";
    }
    if (attending === "yes") {
      const count = Number(guests);
      if (!Number.isInteger(count) || count < 1 || count > 10) {
        next.guests = "पाहुण्यांची संख्या १ ते १० दरम्यान असावी.";
      }
    }
    if (message.length > 500) {
      next.message = "संदेश ५०० अक्षरांपेक्षा जास्त नसावा.";
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      window.setTimeout(() => {
        document.getElementById("rsvp-form-errors")?.focus();
      }, 0);
      return;
    }

    if (!hasEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(wedding.rsvpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          attending: attending === "yes",
          guests: attending === "yes" ? Number(guests) : 0,
          message: message.trim(),
          submittedAt: new Date().toISOString(),
          invitation: "akanksha-vikram",
        }),
      });

      if (!response.ok) {
        throw new Error(`RSVP request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden bg-maroon py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.14), transparent 60%)",
        }}
      />
      <GoldDust count={14} />

      <div className="relative mx-auto max-w-3xl px-4">
        <Reveal>
          <SectionHeading
            id="rsvp-title"
            eyebrow="RSVP"
            title="आपली उपस्थिती कळवा"
            subtitle="आमच्या आनंदाच्या क्षणी आपण सहभागी होणार आहात का, हे आम्हाला नक्की कळवा."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="paper double-frame relative mt-10 overflow-hidden px-6 py-9 text-ink shadow-royal sm:px-10 sm:py-12">
            <CornerFlourish className="absolute top-3 left-3 h-11 w-11 text-gold-deep/55" />
            <CornerFlourish className="absolute top-3 right-3 h-11 w-11 scale-x-[-1] text-gold-deep/55" />

            {status === "success" ? (
              <div className="py-6 text-center" role="status" aria-live="polite">
                <CheckCircle2 className="mx-auto h-12 w-12 text-heritage" aria-hidden="true" />
                <p className="mt-4 font-display text-3xl text-maroon">धन्यवाद!</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
                  {attending === "no"
                    ? "आपले उत्तर आम्हाला प्राप्त झाले आहे. आपल्या शुभेच्छांसाठी मनःपूर्वक धन्यवाद."
                    : "आपले उत्तर आम्हाला प्राप्त झाले आहे. आपल्या उपस्थितीची आम्हाला आनंदाने प्रतीक्षा आहे."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {errorList.length > 0 && (
                  <div
                    id="rsvp-form-errors"
                    tabIndex={-1}
                    role="alert"
                    className="mb-5 rounded-md border border-[#a8323f]/35 bg-[#a8323f]/8 p-3 text-sm text-[#7d1f2c]"
                  >
                    <p className="flex items-center gap-2 font-medium">
                      <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                      कृपया खालील माहिती तपासा:
                    </p>
                    <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-xs">
                      {errorList.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <label htmlFor="rsvp-name" className="mb-1.5 block text-sm font-medium text-maroon">
                    आपले पूर्ण नाव <span className="text-[#a8323f]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    required
                    onChange={(event) => setName(event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                    className={`field ${errors.name ? "field-error" : ""}`}
                    placeholder="उदा. सुहासिनी देशपांडे"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-[#8f2436]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <fieldset className="mt-5">
                  <legend className="mb-1.5 text-sm font-medium text-maroon">
                    आपण उपस्थित राहणार आहात का?{" "}
                    <span className="text-[#a8323f]" aria-hidden="true">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        attending === "yes"
                          ? "border-gold-deep/70 bg-gold/12"
                          : "border-ink/15 bg-white/45 hover:border-gold-deep/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                        className="mt-1 h-4 w-4 accent-[#651c32]"
                        aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
                      />
                      <span className="text-sm leading-relaxed text-ink">
                        होय, नक्की उपस्थित राहीन.
                      </span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        attending === "no"
                          ? "border-gold-deep/70 bg-gold/12"
                          : "border-ink/15 bg-white/45 hover:border-gold-deep/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                        className="mt-1 h-4 w-4 accent-[#651c32]"
                        aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
                      />
                      <span className="text-sm leading-relaxed text-ink">
                        क्षमस्व, उपस्थित राहता येणार नाही.
                      </span>
                    </label>
                  </div>
                  {errors.attending && (
                    <p className="mt-1.5 text-sm text-[#8f2436]">
                      {errors.attending}
                    </p>
                  )}
                </fieldset>

                {attending === "yes" && (
                  <div className="mt-5">
                    <label
                      htmlFor="rsvp-guests"
                      className="mb-1.5 block text-sm font-medium text-maroon"
                    >
                      आपल्यासोबत येणाऱ्या पाहुण्यांची संख्या
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      aria-invalid={Boolean(errors.guests)}
                      aria-describedby={errors.guests ? "rsvp-guests-error" : undefined}
                      className={`field ${errors.guests ? "field-error" : ""}`}
                    >
                      {guestOptions.map((count) => (
                        <option key={count} value={count}>
                          {toDevDigits(count)}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p id="rsvp-guests-error" className="mt-1.5 text-xs text-[#8f2436]">
                        {errors.guests}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5">
                  <label
                    htmlFor="rsvp-message"
                    className="mb-1.5 block text-sm font-medium text-maroon"
                  >
                    आपला शुभेच्छा संदेश{" "}
                    <span className="font-normal text-ink/45">(ऐच्छिक)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={4}
                    maxLength={500}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "rsvp-message-error" : "rsvp-message-hint"}
                    className={`field resize-y ${errors.message ? "field-error" : ""}`}
                    placeholder="आपल्या शुभेच्छा लिहा..."
                  />
                  <div className="mt-1 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p className="text-sm text-[#8f2436]">
                        {errors.message}
                      </p>
                    ) : (
                      <p className="text-sm text-ink/45">
                        कमाल ५०० अक्षरे
                      </p>
                    )}
                    <span className="shrink-0 text-sm text-ink/45">
                      {toDevDigits(message.length)} / {toDevDigits(500)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-gold w-full text-sm disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        पाठवत आहे...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        उत्तर पाठवा
                      </>
                    )}
                  </button>

                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-ghost-gold w-full text-sm sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      WhatsApp द्वारे कळवा
                    </a>
                  )}
                </div>

                <p className="mt-4 font-medium text-sm leading-relaxed text-ink/45">
                  आपली माहिती केवळ विवाह निमंत्रणाच्या नियोजनासाठी वापरली जाईल.
                </p>

                {status === "unconfigured" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-5 rounded-md border border-gold-deep/35 bg-gold/10 p-4 text-sm leading-relaxed text-ink/80"
                  >
                    <p>
                      आपले उत्तर अद्याप ऑनलाइन स्वीकारले जात नाही. कृपया आपले उत्तर WhatsApp
                      किंवा ईमेलद्वारे कळवा.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {waHref && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="btn-ghost-gold border-gold-deep/40 bg-transparent text-maroon hover:bg-gold-deep/10 hover:text-maroon"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          WhatsApp द्वारे पाठवा
                        </a>
                      )}
                      {mailHref && (
                        <a
                          href={mailHref}
                          className="btn-ghost-gold border-gold-deep/40 bg-transparent text-maroon hover:bg-gold-deep/10 hover:text-maroon"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          ईमेल द्वारे पाठवा
                        </a>
                      )}
                      {!waHref && !mailHref && (
                        <p className="text-xs text-ink/60">
                          कृपया आपले उत्तर कुटुंबीयांना थेट कळवा.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-5 rounded-md border border-[#a8323f]/35 bg-[#a8323f]/8 p-4 text-sm leading-relaxed text-[#7d1f2c]"
                  >
                    क्षमस्व, आपले उत्तर पाठवता आले नाही. कृपया पुन्हा प्रयत्न करा किंवा आपले
                    उत्तर थेट कुटुंबीयांना कळवा.
                  </div>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
