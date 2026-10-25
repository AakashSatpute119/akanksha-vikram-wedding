import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, wedding } from "../config/wedding";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("mangalacharan");

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        const probe = window.scrollY + 160;
        let current: string = navItems[0].id;
        for (const item of navItems) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= probe) current = item.id;
        }
        setActive(current);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-gold/25 bg-burgundy/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-gradient-to-b from-burgundy/80 to-transparent"
      }`}
    >
      {/* Animated border glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,161,91,0) 10%, rgba(229,202,139,1) 50%, rgba(198,161,91,0) 90%, transparent)",
        }}
      >
        <div className="absolute inset-0 animate-shimmer opacity-80" style={{ background: "inherit" }} />
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 relative">
        <a
          href="#mangalacharan"
          className="group flex items-center gap-2.5 z-10"
          aria-label="मुख्य पृष्ठावर जा"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold-light transition-colors group-hover:border-gold group-hover:text-cream animate-soft-pulse">
            <span className="font-display text-sm">आ</span>
          </span>
          <span className="font-display text-sm tracking-wide text-ivory sm:text-base">
            {wedding.brideName} <span className="text-gold">♥</span> {wedding.groomName}
          </span>
        </a>

        <nav aria-label="मुख्य नाविगेशन" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 text-sm transition-all duration-300 ${
                active === item.id
                  ? "text-gold-light"
                  : "text-ivory/70 hover:text-cream"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px bg-gold transition-all duration-300 ${
                  active === item.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "मेनू बंद करा" : "मेनू उघडा"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-gold-light transition-all duration-300 hover:border-gold/70 hover:text-cream hover:bg-gold/10 lg:hidden z-10"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="मोबाइल नाविगेशन"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gold/15 bg-burgundy/98 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
              <ul className="grid grid-cols-2 gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={`block rounded-md px-3 py-3 text-sm transition-all duration-200 ${
                        active === item.id
                          ? "bg-gold/12 text-gold-light border border-gold/30"
                          : "text-ivory/75 hover:bg-gold/8 hover:text-cream hover:border-gold/20 border border-transparent"
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}