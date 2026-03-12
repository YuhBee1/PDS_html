# Paramount Digital Services — Website

## Folder Structure

```
paramount/
├── index.html          ← Main page
├── css/
│   ├── style.css       ← Theme, layout, components
│   ├── popups.css      ← All modal / popup styles
│   └── animations.css  ← Keyframes, reveal, transitions
├── js/
│   ├── background.js   ← Animated logo background (canvas)
│   ├── popups.js       ← Popup open/close + work data
│   └── main.js         ← Cursor, counters, scroll reveal, mobile menu
└── assets/
    └── (place your logo file here)
```

---

## Adding Your Logo to the Background

### Option A — Image file (PNG / SVG recommended)
1. Drop your logo into the `assets/` folder (e.g. `assets/logo.png`).
2. Open `js/background.js` and change this line:
   ```js
   logoImageSrc : null,
   ```
   to:
   ```js
   logoImageSrc : './assets/logo.png',
   ```
3. Save and refresh — your logo will appear as the animated background.

> **Tip:** Use a white or solid-colour version of your logo on a transparent background for the best effect.

### Option B — Text mark (default)
If you prefer a text-based watermark, simply edit:
```js
logoText : 'PDS',
```
Change `'PDS'` to any text you like (e.g. your initials or brand acronym).

### Runtime swap (optional)
You can also call from the browser console:
```js
PDS_setBgLogo('./assets/my-new-logo.png');  // swap image
PDS_setBgText('PARAMOUNT');                 // switch to text mark
```

---

## Customising Content

| What to change | Where |
|---|---|
| Email / phone / WhatsApp | `index.html` → Contact popup + Footer |
| Social media links | `index.html` → Footer `.social-links` |
| Portfolio projects | `js/popups.js` → `workData` object |
| Pricing tiers | `index.html` → Rate Card section |
| Brand description | `index.html` → Hero + Footer |

---

## Background Motion Settings

In `js/background.js`, tweak the `CFG` object:

```js
particleCount : 28,    // more = denser field
minScale      : 0.10,  // smallest logo ghost
maxScale      : 0.55,  // largest logo ghost
minOpacity    : 0.018, // most transparent
maxOpacity    : 0.065, // most visible
minSpeed      : 0.12,  // slowest drift
maxSpeed      : 0.55,  // fastest drift
```

---

## Deployment

Just upload the entire `paramount/` folder to any static host:
- **Netlify / Vercel** — drag and drop the folder
- **GitHub Pages** — push and enable Pages
- **cPanel / FTP** — upload to `public_html/`

No build tools, no dependencies — pure HTML, CSS, JS.
