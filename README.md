# आकांक्षा ♥ विक्रम — शुभविवाह निमंत्रण

A bilingual (Marathi-first) digital wedding invitation for **Akanksha & Vikram**, built as a single-page cinematic experience with palace-door intro, animated decorations, countdown, event timeline, venue details and RSVP.

**Live site:** https://akanksha-vikram-wedding-invitation.netlify.app/

---

## Wedding details

| | |
|---|---|
| विवाह | रविवार, १५ नोव्हेंबर २०२६ — दु. १२:०५ (शुभमुहूर्त) |
| स्थळ | नक्षत्र लॉन्स, पेणूर, मोहोळ-पंढरपूर रोड, ता. मोहोळ, जि. सोलापूर |
| हळदी / साक्षरपुडा | शनिवार, १४ नोव्हेंबर २०२६ — सांय. ०७:०० |
| प्रीती भोजन | १५ नोव्हेंबर २०२६ — अक्षता नंतर |

---

## Features

- **Palace door intro** — click-to-enter animated doors with background music opt-in
- **Mangalacharan** — Ganesh invocation and invocation verse
- **Couple section** — bride/groom portraits with family names
- **Invitation card** — formal Marathi invitation text with muhurta
- **Live countdown** to the wedding muhurta
- **Event timeline** — haldi, wedding and reception with "add to Google Calendar"
- **Venue section** — address and maps link
- **Family blessings** — parents and family names
- **RSVP form** — with WhatsApp/phone/email fallback
- **Marathi typography** — Devanagari Google Fonts plus optional AMS display fonts served from `public/fonts/`
- **Decorative animation** — toran, diya, varmaala, particles and marigold petals (framer-motion)
- **Accessibility** — `lang="mr"`, skip link, reduced-motion friendly animations, keyboard entry
- **Privacy** — `noindex` meta so the invitation is not crawled by search engines

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** (`@vitejs/plugin-react`)
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **framer-motion** for animation
- **lucide-react** for icons

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173 (falls back to 5174 if busy)
```

### Build

```bash
npm run build    # tsc --noEmit && vite build  → dist/
npm run preview  # preview the production build locally
```

---

## Project structure

```
index.html                  # Marathi <html lang="mr">, SEO/OG tags, Google Fonts
public/
  audio/background.mp3      # intro / background music
  fonts/                    # optional AMS display fonts
  images/bride.png
  images/groom.png
  favicon.svg
src/
  App.tsx                   # page composition + intro gating
  config/wedding.ts         # ← all wedding content lives here
  index.css                 # theme tokens, utilities, keyframes
  lib/date.ts               # date/muhurta helpers
  components/
    PalaceDoorIntro.tsx
    SiteNavigation.tsx
    Mangalacharan.tsx
    CoupleSection.tsx
    InvitationCard.tsx
    WeddingCountdown.tsx
    EventTimeline.tsx
    VenueSection.tsx
    FamilyBlessings.tsx
    WeddingFooter.tsx
    MusicPlayer.tsx
    RSVPForm.tsx
    WeddingGallery.tsx
    decor/                  # Toran, Diya, Varmaala, Particles, Ornaments
    ui/                     # Reveal, SectionHeading
```

---

## Customizing for another wedding

1. **Content** — edit `src/config/wedding.ts`:
   - names, date/muhurta, venue, parents, family names
   - `events[]` (dates use ISO with IST offset, e.g. `2026-11-15T12:05:00+05:30`)
   - `galleryImages[]`, `hashtag`, `backgroundMusicUrl`
   - `rsvpEndpoint`, `rsvpPhone`, `rsvpEmail`
2. **Photos** — replace `public/images/bride.png` and `public/images/groom.png`; add a couple photo and set `couplePhoto`.
3. **Theme** — colors and font tokens are in the `@theme` block in `src/index.css` (maroon/burgundy/gold/ivory palette).
4. **Music** — replace `public/audio/background.mp3`.
5. **Display fonts** — the `@font-face` declarations currently reference the five AMS families shipped in `public/fonts/`. Add more font files and `@font-face` rules there if needed.

### Values still to fill in

- `googleMapsUrl` — currently empty, so the venue map button is hidden
- `rsvpEndpoint` — empty; RSVP falls back to phone/email
- `galleryImages` — empty; the gallery section stays hidden
- `public/images/og-invitation.jpg` — referenced by the OG/Twitter meta tags but not present yet

---

## Deployment

Deployed on **Netlify**:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Any push to `master` triggers a rebuild. The site is reachable at
https://akanksha-vikram-wedding-invitation.netlify.app/

---

## License

Private family project — content and photographs belong to the families of Akanksha & Vikram.
