// Copies the web app files into www/ for the Android build.
import { rmSync, mkdirSync, cpSync } from 'node:fs';
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of ['index.html', 'i18n.js', 'privacy.html', 'vendor']) cpSync(f, `www/${f}`, { recursive: true });
console.log('www/ ready');
