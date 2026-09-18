# Lokapurusha — The Jain Universe in 3D

An interactive, bilingual (English / हिन्दी) 3D journey through the Jain universe as the Cosmic Man — the **Lokapurusha** — rendered in the style of a palm-leaf manuscript on aged parchment.

Built for anyone, Jain or non-Jain, who wants to *see* and *hear* the structure of the loka: the seven hells, the middle world of humans, the heavens of the devas, and Siddhashila — the abode of liberated souls.

## What's inside

- **The 3D Lokapurusha** — a sculpted human figure in the traditional arms-akimbo pose, with the three worlds worn as ornament: seven hell-bands darkening down the legs, a mandala of the middle world at the waist (with orbiting sun and moon), sixteen heaven-bands up the torso, the Graiveyaka and Anudisha rings at the neck, and the crescent of Siddhashila above the crown.
- **26 interactive hotspots** — hover for the name, click to fly there and read a short, sourced description with measurements from the texts.
- **The Yatra** — a 10-stop guided tour with camera flights and spoken narration.
- **The Codex** — a drawer of short articles: the worlds, the classes of devas, the jiva, and the guardian deities.
- **Bilingual throughout** — every label, panel, tour stop and narration is available in English and Hindi.
- **Narrated audio (female voice)** — powered by [Sarvam AI](https://sarvam.ai) Bulbul v3 text-to-speech, with detailed, scripture-based narration for each tour stop. Falls back to the browser's built-in voice when no API key is set.

## Content fidelity

This project treats the scriptures as the authority, and follows the **Digambara** reckoning:

- **Tattvartha Sutra**, chapters 3–4 (authoritative for both Digambara and Shvetambara traditions)
- **Bhagavati Sutra**
- **Trishashti Shalaka Purusha Caritra** (Hemachandra)
- **Trilokasara** (Nemicandra) and the Digambara cosmological tradition

Where traditions differ, the Digambara reckoning is shown; where name-lists or strata counts vary between texts, the panels say so rather than presenting one version as certain. Visual proportions are illustrative — the true measurements from the texts appear in each panel's details. If something is unverifiable, it is not stated.

## Audio setup (Sarvam AI narration)

1. Create an account at [dashboard.sarvam.ai](https://dashboard.sarvam.ai) and copy your API key (the TTS API is metered — check your plan).
2. Open the app, click **Audio**, paste the key, choose a female voice (Priya and Ishita are recommended by Sarvam for Hindi and English), and save.
3. Play the Yatra — each stop is now narrated in detail. Every hotspot panel also has a **Listen** button.

Your key is stored only in your own browser (localStorage) and is sent only to `api.sarvam.ai`. It is never written to this repository, and no server of ours sits in between — the browser talks to Sarvam directly.

## Run locally

No build step — it's a static site. From the repo root:

```bash
python3 -m http.server 8000
# or: npx serve
```

Then open http://localhost:8000. (Opening `index.html` directly from disk also works, since the app uses no modules or fetches — but serving over HTTP is the tested path.)

## Testing

Open `selftest.html` in any browser — it runs 27 checks over the real app (data integrity, rendering, markers, codex, panels, tour, language switching, audio settings) and prints PASS/FAIL lines. It was used to verify this repo before publishing.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. No build command, no output directory changes needed — the repo root is the site.
4. Deploy. No environment variables are required (the API key is entered per-user in the browser).

## Tech notes

- No-build static app: plain HTML/CSS/JS (ES5-safe, `defer`-loaded in dependency order). No npm install, no bundler, nothing to compile.
- [Three.js](https://threejs.org) r128 + OrbitControls, pinned and loaded from jsDelivr with an unpkg fallback (byte-identical to the tested build).
- Cel ("toon") shading with an ink-outline inverted hull for the hand-painted manuscript look.
- Files: `js/data.js` + `js/data-hi.js` (content: English / Hindi), `js/scene.js` (3D figure + camera + markers), `js/audio.js` (Sarvam TTS pipeline + browser fallback), `js/app.js` (UI, tour, codex, settings).
- Graceful degradation: no WebGL → message; no speech synthesis and no Sarvam key → silent; reduced-motion preference respected.

## License

MIT — see [LICENSE](LICENSE). The scripture content itself belongs to everyone; the texts cited are millennia old.

**णमो सिद्धाणं** — homage to the liberated souls.
