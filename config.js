/* =========================================================
   WebMint — Global Config
   Change ONCE. Reflects everywhere.
   ========================================================= */
window.WEBMINT_CONFIG = {
  brand: {
    name: "WebMint",
    tagline: "Crafting digital experiences that convert.",
    logoText: "WebMint",
    logoMark: "◆",
    year: new Date().getFullYear(),
  },
  contact: {
    phone: "+91 9001612303",
    phoneRaw: "919001612303",
    whatsapp: "919001612303",
    email: "yogeshmahala77429@gmail.com",
    telegram: "https://t.me/iyogeshjat",
    address: "Jaipur, Rajasthan, India",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM IST",
  },
  social: {
    telegram: "https://t.me/iyogeshjat",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    github: "#",
    dribbble: "#",
  },
  footer: {
    about:
      "WebMint is a boutique web development studio building fast, elegant, conversion-focused websites for modern businesses.",
    copyright: "© {year} WebMint. All rights reserved.",
  },
  hero: {
    eyebrow: "Web Development Studio",
    title: "Websites that feel as good as they perform.",
    subtitle:
      "We design and engineer premium websites, web apps, and e‑commerce experiences that turn visitors into customers.",
    ctaPrimary: { label: "Start a project", href: "contact.html" },
    ctaSecondary: { label: "See our work", href: "portfolio.html" },
    stats: [
      { value: 120, suffix: "+", label: "Projects shipped" },
      { value: 98, suffix: "%", label: "Client satisfaction" },
      { value: 45, suffix: "+", label: "Happy clients" },
      { value: 6, suffix: "yr", label: "In business" },
    ],
  },
  /* ----- Enquiry integrations. Toggle on/off in js/contact.js ----- */
  integrations: {
    emailjs: { enabled: false, serviceId: "", templateId: "", publicKey: "" },
    formspree: { enabled: false, endpoint: "" },
    netlify: { enabled: false },
    telegramBot: { enabled: false, botToken: "", chatId: "" },
    whatsappApi: { enabled: false, phoneId: "", accessToken: "" },
    customBackend: { enabled: false, endpoint: "" },
  },
};
