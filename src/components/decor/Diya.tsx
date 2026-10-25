export function Diya({ className = "", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFE3A3" stopOpacity="0.85" />
          <stop offset="38%" stopColor="#F0B45C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E39B2D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="60" y1="20" x2="60" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF8D8" />
          <stop offset="35%" stopColor="#FFD774" />
          <stop offset="75%" stopColor="#F2A32F" />
          <stop offset="100%" stopColor="#D9771B" />
        </linearGradient>
        <linearGradient id="diya-brass" x1="24" y1="70" x2="96" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6E4318" />
          <stop offset="30%" stopColor="#D9B978" />
          <stop offset="55%" stopColor="#C6A15B" />
          <stop offset="80%" stopColor="#9A6E2E" />
          <stop offset="100%" stopColor="#5C3612" />
        </linearGradient>
      </defs>

      {glow && (
        <circle cx="60" cy="52" r="58" fill="url(#diya-glow)" className="animate-flicker" />
      )}

      <g className="animate-flicker" style={{ transformOrigin: "60px 66px" }}>
        <path
          d="M60 22c8 15 13 26 13 34 0 11-6 18-13 18s-13-7-13-18c0-8 5-19 13-34Z"
          fill="url(#diya-flame)"
        />
        <path
          d="M60 39c4 8 6 13 6 17 0 6-3 10-6 10s-6-4-6-10c0-4 2-9 6-17Z"
          fill="#FFF8DC"
          opacity="0.92"
        />
      </g>

      <path d="M56 68h8l2 8H54l2-8Z" fill="#3A2415" />
      <ellipse cx="60" cy="76" rx="39" ry="8" fill="#7A4B1E" />
      <path
        d="M21 76c0 3 8 7 21 9 12 2 24 2 36 0 13-2 21-6 21-9 0 15-17 26-39 26S21 91 21 76Z"
        fill="url(#diya-brass)"
      />
      <path
        d="M27 80c8 7 58 7 66 0-5 12-17 19-33 19S32 92 27 80Z"
        fill="#C6A15B"
        opacity="0.35"
      />
      <path d="M22 76c10 5 66 5 76 0" stroke="#E5CA8B" strokeWidth="1.2" opacity="0.65" />
      <path d="M41 104h38" stroke="#8F6A2F" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}
