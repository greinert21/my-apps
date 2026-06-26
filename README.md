# my-apps

Matt's personal apps — plain HTML, no build step, hosted on GitHub Pages.

**Live site:** https://greinert21.github.io/my-apps/

| App | URL | Status |
|---|---|---|
| 🏋️ Workout Tracker | [/workout/](https://greinert21.github.io/my-apps/workout/) | Live |
| 🐟 Fillet & Fire | [/fillet-fire/](https://greinert21.github.io/my-apps/fillet-fire/) | Live |
| 🎣 StrikeZone | [/strikezone/](https://greinert21.github.io/my-apps/strikezone/) | Live |
| 🌱 GardenMap | [/garden/](https://greinert21.github.io/my-apps/garden/) | Live |

## Workout Tracker

Mobile-first workout logger built for iPhone (add to Home Screen for the app-like experience).

- **Local-first:** every workout saves to the device immediately (`localStorage`) — works offline at the gym via a small service worker.
- **Features:** Matt's Mon–Fri superset program (2 blocks × 3 exercises × 3 rounds, 25-min sessions) with a circuit engine — the app highlights the next exercise, auto-advances as sets are logged, and auto-starts the between-rounds rest timer. Plus: "today's workout" suggestion, session countdown, last-time hints, PR detection, history, progress charts (top set / est. 1RM / volume), JSON backup/restore.
- **Notion sync:** the Sync button is stubbed until the relay function is deployed (step 4 of the plan). The app POSTs unsynced sessions as JSON to a configurable relay URL that holds the Notion API key.

### Roadmap (from the project brief)

1. ✅ Build app with local saving + stubbed sync
2. ⬅️ Test phone-in-hand, tune layout
3. Create the Notion "Workout Log" database
4. Deploy relay function (Cloudflare Workers / Netlify Functions) and connect sync

## GardenMap

Whole-property planner (~1 acre). A draggable/resizable **fence** marks the
30′ × 70′ vegetable enclosure; fruit trees, berries, grapes, and mushroom logs
place anywhere inside or outside it. Pick a plant, click the map, and it drops a
footprint sized to that plant's spacing — lay out the whole place and see how it
fits. Categorized plant palette (~32 presets), Plant/Erase/Fence tools, zoom +
Fit, undo, live counts, JSON backup, and PNG export. Single static file, all
state in `localStorage`.

## Updating

Everything is static — edit a file, commit, push (or edit directly on github.com), and Pages redeploys automatically in ~1 minute.
