import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { wedding } from "../config/wedding";
import { Mandala } from "./decor/Ornaments";
import { GoldDust } from "./decor/Particles";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const placeholderTiles = [
  { label: "वधू", ratio: "aspect-[3/4]" },
  { label: "वर", ratio: "aspect-square" },
  { label: "साखरपुडा", ratio: "aspect-[4/5]" },
  { label: "पैठणी व दागिने", ratio: "aspect-square" },
  { label: "मंडप सजावट", ratio: "aspect-[3/4]" },
  { label: "आठवणी", ratio: "aspect-[4/5]" },
];

export function WeddingGallery() {
  const images = wedding.galleryImages;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  const step = (delta: number) => {
    setOpenIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + delta + images.length) % images.length;
    });
  };

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, images.length]);

  const activeImage = openIndex !== null ? images[openIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-burgundy py-16 sm:py-24"
    >
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.04] sm:h-[980px] sm:w-[980px]" />
      <GoldDust count={12} />

      <div className="relative mx-auto max-w-5xl px-4">
        <Reveal>
          <SectionHeading
            id="gallery-title"
            eyebrow="Moments"
            title="छायाचित्रांची झलक"
            subtitle="आमच्या आठवणींची काही सुंदर क्षणचित्रे."
          />
        </Reveal>

        {images.length > 0 ? (
          <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4">
            {images.map((image, index) => (
              <div key={image.src} className="mb-3 break-inside-avoid sm:mb-4">
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setOpenIndex(index);
                  }}
                  className="group block w-full overflow-hidden rounded-sm border border-gold/25 bg-maroon/40"
                  aria-label={`छायाचित्र उघडा: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </button>
                {image.caption && (
                  <p className="mt-2 px-1 text-center text-[11px] text-ivory/55">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4">
            {placeholderTiles.map((tile, index) => (
              <div key={tile.label} className="mb-3 break-inside-avoid sm:mb-4">
                <div
                  className={`relative flex ${tile.ratio} items-center justify-center overflow-hidden rounded-sm border border-gold/20 bg-gradient-to-br from-maroon/70 to-burgundy/80`}
                >
                  <Mandala
                    className="absolute inset-0 h-full w-full text-gold/[0.09]"
                    />
                  <div className="relative flex flex-col items-center gap-2 px-3 text-center">
                    <ImageIcon className="h-5 w-5 text-gold/60" aria-hidden="true" />
                    <span className="font-serif text-sm text-ivory/70">{tile.label}</span>
                    <span className="font-serif text-sm text-gold/45">
                      छायाचित्र लवकरच
                    </span>
                  </div>
                  <span className="sr-only">
                    छायाचित्र {index + 1} — {tile.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <p className="mt-6 text-center text-xs text-ivory/50">
            छायाचित्रे लवकरच येथे जोडली जातील.
          </p>
        )}
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-burgundy/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="छायाचित्र पहा"
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="छायाचित्र बंद करा"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-colors hover:border-gold hover:text-cream"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  aria-label="मागील छायाचित्र"
                  className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-colors hover:border-gold hover:text-cream sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  aria-label="पुढील छायाचित्र"
                  className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-colors hover:border-gold hover:text-cream sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.figure
              className="flex max-h-full max-w-4xl flex-col items-center"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[76vh] w-auto max-w-full rounded-sm border border-gold/30 object-contain shadow-royal"
              />
              {(activeImage.caption || activeImage.alt) && (
                <figcaption className="mt-4 max-w-xl text-center font-serif text-sm text-ivory/80">
                  {activeImage.caption || activeImage.alt}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
