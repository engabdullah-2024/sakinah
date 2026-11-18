# Sakinah: system design

Sakinah is an offline Android app of authentic duas with Arabic, transliteration, English and Somali meanings, plus a tasbih counter. It has no backend, no database server, no account and no network calls.

## 1. Requirements

**Functional**
- Browse 77 duas in 12 categories; read each with Arabic, transliteration, English, Somali, virtue and source.
- Read a category in sequence (Prev / Next) with a per-dua repeat counter that saves today's progress.
- Favorites, search (English, Somali, transliteration, Arabic without vowel marks), dua of the day.
- Tasbih counter with 6 dhikr, targets 33 / 99 / 100, rounds, timer, undo, reset, vibration.
- Settings: meanings language, transliteration, Arabic size, theme (light / dark / system), haptics, default target, reset.
- Home shows the Hijri date, the right adhkar for the time of day, and today's progress.

**Non-functional**
- Works fully offline; all content is bundled.
- Never crashes on bad data: content and stored state are validated, with safe fallbacks.
- Accessible: labelled controls, 44 px+ touch targets, readable contrast, scalable text (capped).
- Somali meanings ship as reviewed only after a qualified reviewer approves them (`somaliReviewed`).

## 2. Architecture

```
src/
  app/                 Expo Router screens (file = route)
    (tabs)/            Home, Favorites, Settings + notched tab bar
    dua/[id].tsx       Reader (param list = category id | favorites)
    category/[id].tsx  Category with progress and list
    categories.tsx     All categories
    tasbih.tsx, search.tsx, developer.tsx
  components/          AppText/ArabicText, Icon, Controls, Decor, NotchedTabBar
  data/                duas.json (content), duas.ts (validated loader), categories, dhikr, types
  lib/                 arabic (search), dates, hijri, storage, haptics  — pure, unit tested
  state/AppState.tsx   Single context: settings, favorites, today's progress, stats
  theme/               tokens (design system) + useTheme (light/dark)
```

**Data flow**: `duas.json` → validated once in `data/duas.ts` → read-only to screens. User data lives in `AppState` and persists to AsyncStorage (`sakinah:v1:*`) after hydration. Every read is shape-checked; corrupt data falls back to defaults.

**Progress model**: `{ day: 'YYYY-MM-DD', counts: { duaId: n } }`. Counts reset automatically on a new local day. A day where any dua is completed or any dhikr counted is an "active day"; the streak is consecutive active days.

**Hijri date**: `Intl` Umm al-Qura calendar when the JS engine supports it, else the tabular Islamic calendar (can differ by a day).

## 3. Key decisions

| Decision | Choice | Why |
|---|---|---|
| Styling | React Native StyleSheet + typed tokens | NativeWind/Uniwind support for SDK 58 / RN 0.88 was not confirmed; a runtime styling crash was not an acceptable risk. Tokens mirror the canvas design. |
| Icons | Custom SVG via react-native-svg | React Icons does not run in React Native; one consistent stroke set. |
| Storage | AsyncStorage JSON | Tiny data, no queries needed; works in Expo Go. |
| Content | Bundled JSON | Offline, versioned with the app, testable in CI. |
| Fonts | Scheherazade New, Cormorant Garamond, Hanken Grotesk | Clear harakat; brand serif; readable Somali UI text. Only 8 weights bundled. |

## 4. Content and review

- Morning/evening adhkar: Arabic, English, transliteration, counts and virtues from
  Seen-Arabic/Morning-And-Evening-Adhkar-DB (MIT). Corrected "All-Seeing" → "All-Hearing" in me-20; removed a weak-chain virtue on me-17.
- Other categories written from Hisnul Muslim with full references.
- **All Somali meanings are drafts** (`somaliReviewed: false`) and show a "Draft, awaiting review" tag in the reader. After review, set `somaliReviewed: true` for each approved dua.

## 5. Testing

- `npm run typecheck` — TypeScript strict
- `npm run lint` — ESLint (expo config, React hooks rules)
- `npm test` — content integrity + search, dates, Hijri, streak
- `npx expo export --platform android` — full Metro + Hermes bundle

## 6. Out of scope for v1

Audio, notifications, prayer times (would need location), cloud sync, accounts.
