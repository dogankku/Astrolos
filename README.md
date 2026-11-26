# Astrolos

Birth chart, daily horoscope and compatibility app — English (default) and Turkish (auto-selected on Turkish devices, switchable with the EN/TR button).

- Web: `index.html` (served by GitHub Pages)
- Translations: `i18n.js`
- Android app: Capacitor project in `android/`, built by `.github/workflows/android-release.yml`
- Play Store texts and graphics: `store-listing/`

## Build the Android App Bundle

The GitHub Action builds a signed `.aab` on every push to `main` (or manually from the Actions tab).
It needs these repository secrets: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.
Download the bundle from the run's **Artifacts** section and upload it to Google Play Console.

Locally: `npm ci && npm run sync`, then open `android/` in Android Studio.

Planet positions: [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT). Fonts: Fraunces & Manrope (OFL).
