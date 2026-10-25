type SvgProps = {
  className?: string;
};

export function Divider({ className = "" }: SvgProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold/50 to-gold/80 sm:w-24" />
      <svg viewBox="0 0 52 28" className="h-5 w-10 shrink-0" fill="none" stroke="currentColor">
        <path d="M20 14c-6 0-8-7-13-7-3 0-4 2-5 4" strokeWidth="0.9" opacity="0.85" />
        <path d="M32 14c6 0 8-7 13-7 3 0 4 2 5 4" strokeWidth="0.9" opacity="0.85" />
        <path d="M26 8.5 31.5 14 26 19.5 20.5 14 26 8.5Z" strokeWidth="1" />
        <circle cx="26" cy="14" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="6" cy="11" r="1" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="46" cy="11" r="1" fill="currentColor" stroke="none" opacity="0.7" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent via-gold/50 to-gold/80 sm:w-24" />
    </div>
  );
}

export function Mandala({ className = "" }: SvgProps) {
  const petals = Array.from({ length: 24 }, (_, i) => i);
  const innerPetals = Array.from({ length: 12 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="196" strokeWidth="0.5" opacity="0.5" />
      <circle cx="200" cy="200" r="178" strokeWidth="0.7" opacity="0.35" />
      <circle cx="200" cy="200" r="120" strokeWidth="0.6" opacity="0.4" />
      <circle cx="200" cy="200" r="58" strokeWidth="0.6" opacity="0.5" />
      {petals.map((i) => (
        <g key={i} transform={`rotate(${i * 15} 200 200)`}>
          <path
            d="M200 22c10 22 12 40 0 56-12-16-10-34 0-56Z"
            strokeWidth="0.8"
            opacity="0.55"
          />
          <path d="M200 88v14" strokeWidth="0.6" opacity="0.4" />
        </g>
      ))}
      {innerPetals.map((i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 30 + 15} 200 200)`}>
          <path
            d="M200 128c7 14 8 26 0 38-8-12-7-24 0-38Z"
            strokeWidth="0.9"
            opacity="0.7"
          />
        </g>
      ))}
      <circle cx="200" cy="200" r="10" strokeWidth="0.8" opacity="0.7" />
      <circle cx="200" cy="200" r="2.4" fill="currentColor" stroke="none" opacity="0.8" />
      <circle cx="200" cy="36" r="2" fill="currentColor" stroke="none" opacity="0.8" />
      <circle cx="200" cy="364" r="2" fill="currentColor" stroke="none" opacity="0.8" />
      <circle cx="36" cy="200" r="2" fill="currentColor" stroke="none" opacity="0.8" />
      <circle cx="364" cy="200" r="2" fill="currentColor" stroke="none" opacity="0.8" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }: SvgProps) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden="true">
      <path d="M2 74V22A20 20 0 0 1 22 2h52" stroke="currentColor" strokeWidth="1" opacity="0.85" />
      <path
        d="M10 74V26a16 16 0 0 1 16-16h48"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <path d="M22 70c0-26 22-48 48-48" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
      <path
        d="M38 60c8-4 12-12 12-22 8 6 10 16 4 24"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <path
        d="M60 38c4 8 12 12 22 12-6 8-16 10-24 4"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <circle cx="22" cy="22" r="2.4" fill="currentColor" />
      <circle cx="14" cy="50" r="1.3" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="14" r="1.3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Lotus({ className = "" }: SvgProps) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M60 62C46 56 34 44 32 28c14 6 24 18 28 34Z" opacity="0.75" />
        <path d="M60 62c14-6 26-18 28-34-14 6-24 18-28 34Z" opacity="0.75" />
        <path d="M60 64C48 50 44 34 48 18c10 12 14 28 12 46Z" opacity="0.9" />
        <path d="M60 64c12-14 16-30 12-46-10 12-14 28-12 46Z" opacity="0.9" />
        <path d="M60 66C54 52 54 34 60 20c6 14 6 32 0 46Z" opacity="1" />
        <path d="M28 66c8-4 18-4 26 0M66 66c8-4 18-4 26 0" opacity="0.5" />
      </g>
      <circle cx="60" cy="68" r="2" fill="currentColor" />
    </svg>
  );
}

export function GaneshSymbol({ className = "" }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d="M60 11c5 8 6 14 0 20-6-6-5-12 0-20Z"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.5"
          transform={`rotate(${i * 22.5} 60 60)`}
        />
      ))}
      <path
        d="M60 38c-12 0-20 9-20 21 0 12 8 21 20 21"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M60 38c12 0 20 9 20 21 0 9-5 17-13 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M60 50v18c0 6 5 9 9 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M60 52c-3-8 1-13 6-15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="60" cy="44" r="2" fill="currentColor" />
      <path d="M42 82c6 5 12 7 18 7s12-2 18-7" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}

export function ArchOrnament({ className = "" }: SvgProps) {
  return (
    <svg viewBox="0 0 600 120" fill="none" className={className} aria-hidden="true">
      <path
        d="M300 12c-96 0-174 34-234 84"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M300 12c96 0 174 34 234 84"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M300 26c-82 0-150 28-204 70"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.3"
      />
      <path
        d="M300 26c82 0 150 28 204 70"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.3"
      />
      <path d="M300 4l6 8-6 8-6-8 6-8Z" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="300" cy="12" r="1.6" fill="currentColor" />
      <circle cx="66" cy="96" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="534" cy="96" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/**
 * Filled silhouette of a Peshwa-era wada / temple skyline:
 * central shikhara with kalash, flanking domes and crenellated wings.
 * Windows are punched out with a mask so the shape reads on any background.
 */
export function WadaSkyline({ className = "" }: SvgProps) {
  const windows = [
    "M78 84h14v12a7 7 0 0 1-14 0Z",
    "M118 84h14v12a7 7 0 0 1-14 0Z",
    "M158 84h14v12a7 7 0 0 1-14 0Z",
    "M208 84h14v12a7 7 0 0 1-14 0Z",
    "M578 84h14v12a7 7 0 0 1-14 0Z",
    "M628 84h14v12a7 7 0 0 1-14 0Z",
    "M668 84h14v12a7 7 0 0 1-14 0Z",
    "M708 84h14v12a7 7 0 0 1-14 0Z",
    "M362 86h12v12a6 6 0 0 1-12 0Z",
    "M394 86h12v12a6 6 0 0 1-12 0Z",
    "M426 86h12v12a6 6 0 0 1-12 0Z",
    "M262 92h12v10a6 6 0 0 1-12 0Z",
    "M526 92h12v10a6 6 0 0 1-12 0Z",
  ];

  return (
    <svg viewBox="0 0 800 110" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <mask id="wada-skyline-mask">
          <g fill="white">
            <rect x="0" y="100" width="800" height="10" />

            {/* far-end stepped blocks */}
            <rect x="14" y="90" width="34" height="10" />
            <rect x="22" y="84" width="18" height="6" />
            <rect x="752" y="90" width="34" height="10" />
            <rect x="760" y="84" width="18" height="6" />

            {/* left wing with cornice */}
            <rect x="60" y="76" width="180" height="24" />
            <rect x="54" y="72" width="192" height="4" />

            {/* left dome shrine */}
            <rect x="256" y="92" width="28" height="8" />
            <path d="M250 92a20 15 0 0 1 40 0Z" />
            <circle cx="270" cy="74" r="2" />

            {/* central temple: stepped tiers + ogee cap */}
            <rect x="334" y="84" width="132" height="16" />
            <rect x="346" y="72" width="108" height="12" />
            <rect x="356" y="60" width="88" height="12" />
            <rect x="366" y="48" width="68" height="12" />
            <rect x="376" y="36" width="48" height="12" />
            <path d="M376 36c4-8 10-14 24-22 14 8 20 14 24 22Z" />
            <rect x="398" y="9" width="4" height="5" />
            <circle cx="400" cy="7" r="3.2" />
            <path d="M400 0v6M400 0l9 3-9 3Z" />

            {/* right dome shrine */}
            <rect x="516" y="92" width="28" height="8" />
            <path d="M510 92a20 15 0 0 1 40-3Z" />
            <circle cx="530" cy="74" r="2" />

            {/* right wing with cornice */}
            <rect x="560" y="76" width="180" height="24" />
            <rect x="554" y="72" width="192" height="4" />
          </g>
          <g fill="black">
            {windows.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </mask>
      </defs>
      <rect width="800" height="110" fill="currentColor" mask="url(#wada-skyline-mask)" />
    </svg>
  );
}

/** Mango-leaf (आंबा) motif used in Marathi torans — pairs well as a small accent. */
export function MangoLeaf({ className = "" }: SvgProps) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M30 4C12 26 6 60 30 96 54 60 48 26 30 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M30 16C18 34 14 60 30 84 46 60 42 34 30 16Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <path d="M30 18v64" stroke="currentColor" strokeWidth="0.9" opacity="0.85" />
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.55">
        <path d="M30 38c-5 4-8 9-9 15M30 38c5 4 8 9 9 15" />
        <path d="M30 56c-5 4-8 9-9 15M30 56c5 4 8 9 9 15" />
      </g>
      <circle cx="30" cy="6" r="1.6" fill="currentColor" />
    </svg>
  );
}
