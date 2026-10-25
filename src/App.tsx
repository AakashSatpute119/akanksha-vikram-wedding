import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PalaceDoorIntro } from "./components/PalaceDoorIntro";
import { SiteNavigation } from "./components/SiteNavigation";
import { Mangalacharan } from "./components/Mangalacharan";
import { CoupleSection } from "./components/CoupleSection";
import { InvitationCard } from "./components/InvitationCard";
import { WeddingCountdown } from "./components/WeddingCountdown";
import { EventTimeline } from "./components/EventTimeline";
import { VenueSection } from "./components/VenueSection";
import { FamilyBlessings } from "./components/FamilyBlessings";
import { WeddingFooter } from "./components/WeddingFooter";
import { MusicPlayer } from "./components/MusicPlayer";
import { wedding } from "./config/wedding";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [musicRequested, setMusicRequested] = useState(true);

  useEffect(() => {
    if (entered) {
      document.body.style.overflow = "";
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [entered]);

  const handleEnter = (options?: { playMusic?: boolean }) => {
    if (options?.playMusic) {
      setMusicRequested(true);
    }
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }, 140);
  };

  return (
    <div className="relative min-h-screen bg-burgundy">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-cream focus:px-5 focus:py-2 focus:text-sm focus:text-maroon focus:shadow-royal"
      >
        मुख्य मजकुरावर जा
      </a>

      <div inert={!entered}>
        <SiteNavigation />

        <main id="main-content" tabIndex={-1} className="outline-none">
          <Mangalacharan />
          <CoupleSection />
          <InvitationCard />
          <WeddingCountdown />
          <EventTimeline />
          <VenueSection />
          <FamilyBlessings />
        </main>

        <WeddingFooter />
      </div>

      {entered && (
        <MusicPlayer src={wedding.backgroundMusicUrl} autoStart={musicRequested} />
      )}

      <AnimatePresence>
        {!entered && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100]"
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <PalaceDoorIntro onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}