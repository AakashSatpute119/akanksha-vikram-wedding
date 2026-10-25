export function Toran({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 19 }, (_, i) => i);

  const curveY = (t: number) => 8 * (1 - t) * (1 - t) + 2 * (1 - t) * t * 58 + 8 * t * t;

  return (
    <svg
      viewBox="0 0 760 112"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
    >
      <path
        d="M2 8C170 52 590 52 758 8"
        stroke="#C6A15B"
        strokeWidth="1.1"
        opacity="0.75"
      />
      <path
        d="M2 12C170 56 590 56 758 12"
        stroke="#8F6A2F"
        strokeWidth="0.6"
        opacity="0.4"
      />

      {leaves.map((i) => {
        const t = i / (leaves.length - 1);
        const x = 8 + t * 744;
        const y = curveY(t);
        const rotate = i % 2 === 0 ? -8 : 8;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rotate})`}>
            <path
              d="M0 0C7 11 8 27 0 41C-8 27-7 11 0 0Z"
              fill={i % 3 === 0 ? "#2C5546" : "#24483B"}
              stroke="#C6A15B"
              strokeWidth="0.5"
              opacity="0.95"
            />
            <path d="M0 4v32" stroke="#C6A15B" strokeWidth="0.4" opacity="0.45" />
          </g>
        );
      })}

      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const t = 0.08 + i * 0.14;
        const x = 8 + t * 744;
        const y = curveY(t) + 4;
        return (
          <g key={`flower-${i}`} transform={`translate(${x} ${y})`}>
            {Array.from({ length: 8 }, (_, p) => (
              <circle
                key={p}
                cx={Math.cos((p * Math.PI) / 4) * 5}
                cy={Math.sin((p * Math.PI) / 4) * 5}
                r="3.1"
                fill={p % 2 === 0 ? "#E39B2D" : "#D9771B"}
                opacity="0.95"
              />
            ))}
            <circle r="3.1" fill="#F6CE7A" />
            <circle r="1.2" fill="#8F4A16" />
          </g>
        );
      })}
    </svg>
  );
}
