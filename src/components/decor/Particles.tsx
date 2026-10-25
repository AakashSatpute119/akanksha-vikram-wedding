const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export function GoldDust({
  count = 22,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const particles = Array.from({ length: count }, (_, i) => {
    const size = 1 + pseudoRandom(i * 3 + 1) * 2.4;
    return {
      left: pseudoRandom(i * 7 + 2) * 100,
      top: pseudoRandom(i * 11 + 5) * 100,
      size,
      duration: 14 + pseudoRandom(i * 13 + 3) * 16,
      delay: -pseudoRandom(i * 17 + 9) * 30,
      opacity: 0.25 + pseudoRandom(i * 19 + 4) * 0.55,
    };
  });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: i % 3 === 0 ? "#F6E7BD" : "#C6A15B",
            opacity: particle.opacity,
            boxShadow: "0 0 6px rgba(229, 202, 139, 0.9)",
            animation: `dust-drift ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function MarigoldPetals({
  count = 14,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: pseudoRandom(i * 5 + 2) * 100,
    size: 7 + pseudoRandom(i * 9 + 1) * 7,
    duration: 16 + pseudoRandom(i * 3 + 7) * 14,
    delay: -pseudoRandom(i * 11 + 6) * 28,
    drift: pseudoRandom(i * 13 + 3) > 0.5 ? 1 : -1,
  }));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal, i) => (
        <span
          key={i}
          className="absolute top-0 block opacity-0"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.45}px`,
            borderRadius: "62% 38% 58% 42% / 55% 62% 38% 45%",
            backgroundImage:
              petal.drift > 0
                ? "linear-gradient(140deg, #F2B24A 0%, #DE8A24 55%, #B85F14 100%)"
                : "linear-gradient(140deg, #E9A63A 0%, #CE7620 60%, #A9520F 100%)",
            boxShadow: "inset -1px -1px 2px rgba(120, 55, 8, 0.35)",
            animation: `petal-fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
