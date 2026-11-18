# Sakinah — Ducooyinka Maalinlaha

Daily duas with Arabic, transliteration, English and Somali meanings, and a tasbih counter. Offline, free, no account. Made by TTMCHANGE.

## Run it on your phone tonight (Expo Go, about 5 minutes)

1. On your Android phone, install **Expo Go** from the Play Store.
2. On your computer (Node 20+):
   ```bash
   cd sakinah
   npm install
   npx expo start
   ```
3. Open Expo Go and scan the QR code. Phone and computer must be on the same Wi-Fi.
   If the networks differ, run `npx expo start --tunnel` instead.

## Build an installable APK (no Expo Go needed)

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

When the build finishes, open the link on your phone and install the APK.

## Checks

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm test            # content + logic tests
npx expo export --platform android   # full Android bundle
```

## Somali review

Every Somali meaning is a draft until reviewed. In `src/data/duas.json`, set `"somaliReviewed": true` on each dua a reviewer approves; the "Draft, awaiting review" tag then disappears for that dua.

See `docs/ARCHITECTURE.md` for the full design.
