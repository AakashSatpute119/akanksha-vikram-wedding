export function Varmaala({
  count = 20,
  radius = 120,
  className = "",
}: {
  count?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(120 120)">
        {Array.from({ length: count }, (_, i) => {
          const t = (i / count) * Math.PI * 2;
          const x = Math.cos(t) * radius;
          const y = Math.sin(t) * radius * 0.6;
          const rotate = (i / count) * 360;
          
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${rotate})`}
            >
              <path
                d="M0 0 C5 8, 8 15, 5 22 C2 28,-2 28,-5 22 Z"
                fill="#C6A15B"
                opacity={0.9}
              />
              <circle cx="0" cy="0" r="3" fill="#F6E7BD" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function VarmaalaBackground({
  count = 15,
  radius = 100,
  className = "",
}: {
  count?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(120 120)">
        <circle cx="0" cy="0" r={radius} stroke="#C6A15B" strokeWidth="1" opacity="0.15" />
        {Array.from({ length: count }, (_, i) => {
          const t = (i / count) * Math.PI * 2;
          const x = Math.cos(t) * radius * 0.8;
          const y = Math.sin(t) * radius * 0.8 * 0.6;
          
          return (
            <g
              key={i}
              transform={`translate(${x} ${y})`}
            >
              <path
                d="M0 0 C5 8, 8 15, 5 22 C2 28,-2 28,-5 22 Z"
                fill="#C6A15B"
                opacity={0.4 + Math.random() * 0.3}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}