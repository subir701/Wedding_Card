# Riya & Arjun — Wedding Invitation Website 💍

A minimalist, cinematic wedding invitation site built with React + Vite + Tailwind + Framer Motion.

## Flow

1. **Hero (pinned scroll scene)** — arch background, couple's names, bride enters from the left window, groom from the right, a havan (sacred fire) flickers near their feet, marigold petals shower down. As you keep scrolling, the couple retreats back out the same side they entered from and the whole scene dissolves — a "reverse of the entrance."
2. **Pillar interlude** — a quiet architectural transition bridging into the next scene.
3. **Scratch card** — scratch to reveal the wedding date, day, time, and venue.
4. **Countdown** — live countdown to the wedding moment.
5. **Family** — 4–5 names from each side, under "With Loving Blessings Of."
6. **Venue** — embedded map with a custom mandap-styled marker overlay, "Get Directions" / "Open in Maps."
7. **Blessings & wishes** — guests can leave notes for the couple.
8. **Thank you** closing scene + floating music player + footer with "Add to Calendar."

No header/nav, no gallery, no RSVP form, no multi-event timeline — kept deliberately minimal per the brief.

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

## Dependencies used

- react, react-dom, vite — base scaffold
- tailwindcss@3, postcss, autoprefixer — styling, glassmorphism, gold gradients
- framer-motion — scroll-pinned hero choreography, reveals, digit-flip countdown
- lucide-react — icon set
- canvas-confetti — scratch-card reveal burst + thank-you fireworks

## Customize everything from one file

Edit `src/config/weddingConfig.js`:
- Bride/groom names
- Wedding date/time (drives the countdown + the .ics calendar file)
- Family members shown on each side (name + relation, 4–5 each)
- Venue name/address/Google Maps embed
- Background art paths (see below)
- Quotes, music path, colors

## About the visuals — please read

- **Hero background**: I dropped your uploaded reference image in at
  `public/assets/hero-arch-bg.png` and wired it in via
  `weddingConfig.visuals.heroArchBg`. Heads up — the file you shared is only
  **231×396px**, which will look soft/blurry at full-screen hero size. Swap in
  a higher-resolution version of the same artwork (ideally 1200px+ tall) for
  a crisp result — same filename, same folder, no code changes needed.
- **Bride & groom figures**: since I can't reproduce artwork from reference
  images or generate photoreal illustrations here, I hand-built these as
  original flat-vector SVGs — faceless, in red Benarasi-style saree with a
  bridal mukut, and white dhoti-kurta with a traditional Bengali "topor" —
  live in `src/components/illustrations/BrideIllustration.jsx` and
  `GroomIllustration.jsx`. If you have your own illustrated/photographed
  cutouts (transparent PNG, back or side view, faceless) that match your
  reference image's style more closely, they're easy to swap in: just
  replace the `<svg>` contents with an `<img src="/assets/bride.png" />`
  (same for groom) — the entrance/exit animation logic doesn't need to change.
- **Pillar background**: no asset was provided for this, so it's a simple
  illustrated placeholder (`PillarTransition.jsx`). Add your own image at
  `public/assets/pillars.png` and set `weddingConfig.visuals.pillarBg` to
  `/assets/pillars.png` to use it instead.
- **Mandap map marker**: Google's free "embed by search query" map doesn't
  support custom marker icons (that requires a paid Maps JavaScript API key +
  `google.maps.Marker`). I've overlaid a decorative mandap-styled pin on top
  of the map as a visual stand-in — it sits centered over where the map's own
  default pin appears. If you'd like a true interactive custom marker, let me
  know and I can wire up the Maps JS API version (needs your own API key).

## Deploying

**Vercel:** import the repo, framework preset "Vite", default build command works out of the box.
**Netlify:** build command `npm run build`, publish directory `dist`.

## Structure

```
src/
  components/
    Hero.jsx              pinned scroll scene: arch, couple, havan, marigolds
    PillarTransition.jsx  architectural interlude
    ScratchCard.jsx
    Countdown.jsx
    Family.jsx
    Venue.jsx
    Blessings.jsx
    ThankYou.jsx
    MusicPlayer.jsx
    Footer.jsx
    ScrollProgress.jsx
    illustrations/
      BrideIllustration.jsx
      GroomIllustration.jsx
      HavanFire.jsx
      MarigoldShower.jsx
  config/
    weddingConfig.js   single source of truth for content + asset paths
  hooks/
    useGuestName.js    (unused now that the header greeting was removed —
                        kept in case you want personalized links again later)
```

