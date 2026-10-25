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
