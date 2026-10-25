import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

type MusicPlayerProps = {
  src: string;
  autoStart: boolean;
};

export function MusicPlayer({ src, autoStart }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const attemptedAutoplay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.load();

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [src]);

  useEffect(() => {
    if (!autoStart || attemptedAutoplay.current || !available) return;
    attemptedAutoplay.current = true;
    const audio = audioRef.current;
    if (!audio) return;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked, will wait for user interaction
        setPlaying(false);
      });
    }
  }, [autoStart, available]);

  useEffect(() => {
    // Try to play on first user interaction
    const handleInteraction = () => {
      if (attemptedAutoplay.current && !playing && available) {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch(() => {});
        }
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [playing, available]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="fixed right-3 bottom-3 z-50 flex flex-col items-end gap-1.5 sm:right-5 sm:bottom-5">
      {!available && (
        <p
          role="status"
          className="max-w-[220px] rounded-lg border border-gold/25 bg-burgundy/90 px-3 py-2 text-right text-sm leading-snug text-ivory/70 shadow-royal backdrop-blur sm:text-[12px]"
        >
          संगीत फाइल उपलब्ध नाही. कृपया{" "}
          <span className="text-gold-light">public/audio/background.mp3</span> जोडा.
        </p>
      )}

      <div className="flex items-center gap-1 rounded-full border border-gold/40 bg-burgundy/85 py-1.5 pr-1.5 pl-1.5 shadow-royal backdrop-blur-md animate-soft-pulse">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "संगीत थांबवा" : "संगीत सुरू करा"}
          aria-pressed={playing}
          disabled={!available}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold-light transition-colors hover:bg-gold/25 hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!available ? (
            <Music2 className="h-4 w-4" aria-hidden="true" />
          ) : playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <div className="flex h-6 w-5 items-center justify-center gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className="w-[2px] rounded-full bg-gold-light/80"
              style={{
                height: "100%",
                transformOrigin: "center",
                animation: playing ? `wave-bar ${0.9 + bar * 0.18}s ease-in-out infinite` : "none",
                animationDelay: `${bar * 0.12}s`,
                transform: playing ? undefined : "scaleY(0.28)",
                opacity: playing ? 1 : 0.45,
              }}
            />
          ))}
        </div>

        <span className="hidden pr-1 text-[11px] tracking-wide text-gold-light/75 lg:block">
          {playing ? "संगीत सुरू आहे" : available ? "विवाह संगीत" : "संगीत बंद"}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "आवाज सुरू करा" : "आवाज बंद करा"}
          aria-pressed={muted}
          disabled={!available}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gold-light/80 transition-colors hover:bg-gold/15 hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <audio ref={audioRef} src={src} preload="auto" loop playsInline />
    </div>
  );
}