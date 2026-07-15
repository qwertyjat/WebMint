# WebMint

Premium web development studio website. Pure HTML, CSS and vanilla JavaScript — no build step, no dependencies.

Open `index.html` in any browser, or deploy the folder as-is to Netlify, Vercel, GitHub Pages, or any static host.

## Folder structure

```
webmint/
├── index.html, about.html, services.html, portfolio.html,
├── pricing.html, process.html, blog.html, faq.html,
├── contact.html, privacy-policy.html, terms.html,
├── cookie-policy.html, 404.html
├── css/
│ ├── variables.css ← colors, fonts, spacing
│ ├── style.css ← all component styles
│ ├── responsive.css ← breakpoints
│ └── animations.css ← keyframes + reveal
├── js/
│ ├── config.js ← ALL text, contact info, integrations
│ ├── main.js ← header/footer injection, theme, bootstrap
│ ├── navigation.js ← sticky nav, mobile menu, back-to-top
│ ├── animations.js ← scroll reveal + animated counters
│ ├── contact.js ← form validation + provider layer
│ └── faq.js ← FAQ accordion
├── data/
│ ├── services.json, portfolio.json, testimonials.json, faq.json
├── assets/, images/, icons/
├── robots.txt, sitemap.xml
```

## The "edit one place" rule

Almost everything is controlled from **`js/config.js`**.

| Change | File | Where |
|--|--|--|
| Phone number | `js/config.js` | `contact.phone` (and `phoneRaw` — digits only) |
| Email | `js/config.js` | `contact.email` |
| WhatsApp | `js/config.js` | `contact.whatsapp` (digits only, with country code) |
| Telegram | `js/config.js` | `contact.telegram` |
| Address / hours | `js/config.js` | `contact.address`, `contact.hours` |
| Brand name / logo | `js/config.js` | `brand.name`, `brand.logoText`, `brand.logoMark` |
| Hero title / subtitle / CTAs | `js/config.js` | `hero` object |
| Hero stats / counters | `js/config.js` | `hero.stats` |
| Footer text / copyright | `js/config.js` | `footer.about`, `footer.copyright` |
| Social links | `js/config.js` | `social` object |
| Theme colors | `css/variables.css` | `--brand`, `--brand-2`, `--brand-3`, `--brand-gradient` |
| Fonts | `css/variables.css` | `--font-sans`, `--font-display` |
| Services list | `data/services.json` | Add/remove/edit any card |
| Portfolio items | `data/portfolio.json` | Add/remove/edit any project |
| Testimonials | `data/testimonials.json` | Add/remove/edit any quote |
| FAQ questions | `data/faq.json` | Add/remove/edit Q&A |
| Pricing plans | `pricing.html` | Three `.plan` cards |

## Replacing images

Drop new files into `images/` or `assets/`. Reference them by relative path (e.g. `images/hero.jpg`). Portfolio thumbnails currently render as gradient placeholders — replace the `.portfolio-thumb` block in `index.html`/`portfolio.html` with `<img src="images/…" />` if you want real images.

## Deploying

### Netlify (drag-and-drop)
1. Zip the `webmint/` folder or drag it into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done. Custom domain: **Site settings → Domain management**.

### GitHub Pages
1. Push the contents of `webmint/` to a repo.
2. Repo → **Settings → Pages → Deploy from branch → main / root**.
3. Your site is live at `https://<user>.github.io/<repo>/`.

### Vercel / Cloudflare Pages
Import the repo. No build command. Output directory: root. Done.

## Connecting the enquiry form

`js/contact.js` ships with 6 providers. Enable **one** by flipping its flag in `js/config.js → integrations`.

### 1. EmailJS
```js
emailjs: { enabled: true, serviceId: "service_xxx", templateId: "template_xxx", publicKey: "xxxxx" }
```
Create a free account at [emailjs.com](https://www.emailjs.com/), set up a service and template. Done — the form now emails you.

### 2. Formspree
```js
formspree: { enabled: true, endpoint: "https://formspree.io/f/YOUR_ID" }
```

### 3. Netlify Forms
```js
netlify: { enabled: true }
```
Add `netlify data-netlify="true" name="webmint-enquiry"` attributes to the `<form>` in `contact.html`, then deploy on Netlify.

### 4. Telegram Bot
Create a bot with [@BotFather](https://t.me/BotFather), get your chat ID from [@userinfobot](https://t.me/userinfobot):
```js
telegramBot: { enabled: true, botToken: "123:ABC", chatId: "123456789" }
```
Enquiries arrive in your Telegram chat.

### 5. WhatsApp
For a quick chat handoff, no config needed — set `whatsappApi.enabled = true` and submissions open a pre-filled `wa.me` chat. For the official Business API, run it through your `customBackend` endpoint.

### 6. Custom backend (Node / PHP)
```js
customBackend: { enabled: true, endpoint: "https://api.your-domain.com/enquiries" }
```
Your endpoint receives a JSON POST with all form fields.

## Dark mode

The theme toggle sits in the top nav. Preference is persisted in `localStorage` under `wm-theme`.

## Performance & SEO

- Lazy loading via `loading="lazy"` on any images you add.
- Every page has unique `<title>`, `<meta description>`, and Open Graph tags.
- `robots.txt` + `sitemap.xml` shipped.
- Fonts loaded via Google Fonts; swap for self-hosted for max speed.

## License

Yours to use. Attribution appreciated but not required.
