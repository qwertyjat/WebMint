/* =========================================================
   WebMint — main.js
   Bootstraps every page. Injects header/footer, hydrates config.
   ========================================================= */
(function () {
  const C = window.WEBMINT_CONFIG;

  /* ---------- Theme (dark/light) ---------- */
  const savedTheme = localStorage.getItem("wm-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  window.WM_toggleTheme = function () {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("wm-theme", next);
  };

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const l = document.getElementById("loader");
    if (l) setTimeout(() => l.classList.add("hide"), 300);
  });

  /* ---------- Inject header ---------- */
  function buildHeader() {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = [
      ["index.html", "Home"],
      ["about.html", "About"],
      ["services.html", "Services"],
      ["portfolio.html", "Portfolio"],
      ["pricing.html", "Pricing"],
      ["process.html", "Process"],
      ["blog.html", "Blog"],
      ["faq.html", "FAQ"],
    ];
    return `
    <nav class="nav" id="nav">
      <div class="container nav-inner">
        <a href="index.html" class="logo">
          <span class="logo-mark">${C.brand.logoMark}</span>
          <span>${C.brand.logoText}</span>
        </a>
        <div class="nav-links" id="navLinks">
          ${links.map(([h, l]) => `<a href="${h}" class="${path === h ? "active" : ""}">${l}</a>`).join("")}
        </div>
        <div class="nav-actions">
          <button class="icon-btn" onclick="WM_toggleTheme()" aria-label="Toggle theme">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          </button>
          <a href="contact.html" class="btn btn-primary" style="padding:10px 20px;font-size:.88rem">Get in touch</a>
          <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </nav>`;
  }

  /* ---------- Inject footer ---------- */
  function buildFooter() {
    const copy = C.footer.copyright.replace("{year}", C.brand.year);
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <span class="logo-mark">${C.brand.logoMark}</span>
              <span>${C.brand.logoText}</span>
            </a>
            <p>${C.footer.about}</p>
            <div class="social-row">
              <a href="${C.social.telegram}" aria-label="Telegram" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
              </a>
              <a href="mailto:${C.contact.email}" aria-label="Email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg></a>
              <a href="tel:${C.contact.phoneRaw}" aria-label="Phone"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></a>
              <a href="https://wa.me/${C.contact.whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.49 0 .16 5.33.15 11.89a11.87 11.87 0 001.6 5.94L0 24l6.32-1.66a11.87 11.87 0 005.68 1.45h.01c6.56 0 11.89-5.33 11.9-11.89a11.83 11.83 0 00-3.39-8.42zM12 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.87 9.87 0 01-1.51-5.27C2.11 6.43 6.55 2 12 2c2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 7c-.01 5.45-4.45 9.89-9.9 9.89z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="process.html">Process</a></li>
              <li><a href="blog.html">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="privacy-policy.html">Privacy</a></li>
              <li><a href="terms.html">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:${C.contact.phoneRaw}">${C.contact.phone}</a></li>
              <li><a href="mailto:${C.contact.email}">${C.contact.email}</a></li>
              <li><a href="${C.social.telegram}" target="_blank" rel="noopener">Telegram</a></li>
              <li style="color:var(--text-muted);font-size:.9rem">${C.contact.hours}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>${copy}</span>
          <span><a href="privacy-policy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="cookie-policy.html">Cookies</a></span>
        </div>
      </div>
    </footer>
    <button class="to-top" id="toTop" aria-label="Back to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <div class="loader" id="loader"><div class="loader-mark">${C.brand.logoMark}</div></div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const headerEl = document.getElementById("header");
    const footerEl = document.getElementById("footer");
    if (headerEl) headerEl.innerHTML = buildHeader();
    if (footerEl) footerEl.innerHTML = buildFooter();

    // dynamic year, brand refs
    document.querySelectorAll("[data-brand-name]").forEach(el => el.textContent = C.brand.name);
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = C.brand.year);
    document.querySelectorAll("[data-phone]").forEach(el => { el.textContent = C.contact.phone; el.setAttribute("href", "tel:" + C.contact.phoneRaw); });
    document.querySelectorAll("[data-email]").forEach(el => { el.textContent = C.contact.email; el.setAttribute("href", "mailto:" + C.contact.email); });
    document.querySelectorAll("[data-whatsapp]").forEach(el => el.setAttribute("href", "https://wa.me/" + C.contact.whatsapp));
    document.querySelectorAll("[data-telegram]").forEach(el => el.setAttribute("href", C.social.telegram));

    // init modules
    window.WM_initNav && window.WM_initNav();
    window.WM_initAnim && window.WM_initAnim();
  });
On Wed, 15 Jul 2026, 5:11 pm Yogesh Mahala, <yogeshmahala7742@gmail.com> wrote:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact — WebMint</title>
  <meta name="description" content="Tell us about your project. We reply within one business day." />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div id="header"></div>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow reveal">Contact</span>
      <h1 class="reveal delay-1">Let's <span class="italic">build</span> something.</h1>
      <p class="reveal delay-2">Share a few details and we'll be in touch within one business day.</p>
    </div>
  </section>
  <section class="section" style="padding-top:20px">
    <div class="container">
      <div class="contact-wrap">
        <!-- Info -->
        <aside class="contact-info reveal">
          <h3>Reach us directly</h3>
          <p style="font-size:.92rem">Prefer email or a quick chat? Use whichever suits you.</p>
          <div class="info-row">
            <div class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></div>
            <div><small>Phone</small><a data-phone></a></div>
          </div>
          <div class="info-row">
            <div class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg></div>
            <div><small>Email</small><a data-email></a></div>
          </div>
          <div class="info-row">
            <div class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.49 0 .16 5.33.15 11.89a11.87 11.87 0 001.6 5.94L0 24l6.32-1.66a11.87 11.87 0 005.68 1.45h.01c6.56 0 11.89-5.33 11.9-11.89a11.83 11.83 0 00-3.39-8.42z"/></svg></div>
            <div><small>WhatsApp</small><a data-whatsapp target="_blank" rel="noopener">Message us</a></div>
          </div>
          <div class="info-row">
            <div class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg></div>
            <div><small>Telegram</small><a data-telegram target="_blank" rel="noopener">@iyogeshjat</a></div>
          </div>
          <div class="info-row">
            <div class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
            <div><small>Business hours</small><span id="bh"></span></div>
          </div>
        </aside>

        <!-- Form -->
        <form class="form reveal delay-1" id="enquiryForm" novalidate>
          <div id="formStatus" class="form-status"></div>
          <div class="form-row">
            <div class="field"><label>Name *</label><input name="name" data-required /><span class="error-msg">Please enter your name.</span></div>
            <div class="field"><label>Phone *</label><input name="phone" data-required /><span class="error-msg">Enter a valid phone.</span></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Email *</label><input name="email" type="email" data-required /><span class="error-msg">Enter a valid email.</span></div>
            <div class="field"><label>Company</label><input name="company" /></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Website (optional)</label><input name="website" placeholder="https://" /></div>
            <div class="field"><label>Service required *</label>
              <select name="service" data-required>
                <option value="">Choose a service</option>
                <option>Custom Website</option><option>Web Application</option>
                <option>E‑commerce</option><option>UI/UX Design</option>
                <option>SEO & Performance</option><option>Care & Maintenance</option>
                <option>Something else</option>
              </select>
              <span class="error-msg">Please pick a service.</span>
            </div>
          </div>
          <div class="field"><label>Budget *</label>
            <select name="budget" data-required>
              <option value="">Select a budget range</option>
              <option>Under ₹50,000</option><option>₹50,000 – ₹1,50,000</option>
              <option>₹1,50,000 – ₹5,00,000</option><option>₹5,00,000+</option>
              <option>Not sure yet</option>
            </select>
            <span class="error-msg">Please choose a budget.</span>
          </div>
          <div class="field"><label>Project details *</label>
            <textarea name="message" data-required placeholder="Tell us a bit about the project, goals, timelines, and anything else that would help us prepare."></textarea>
            <span class="error-msg">Tell us a bit about your project.</span>
          </div>
          <div class="field">
            <label>Attachment (optional)</label>
            <label class="file-drop" for="fileInput" id="fileLabel">Click or drop a file (optional)</label>
            <input type="file" id="fileInput" name="file" />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
            Send enquiry
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
          <p style="font-size:.8rem;color:var(--text-muted);text-align:center;margin:16px 0 0">By submitting you agree to our <a href="privacy-policy.html">privacy policy</a>.</p>
        </form>
      </div>
    </div>
  </section>

  <div id="footer"></div>
  <script src="js/config.js"></script><script src="js/main.js"></script>
  <script src="js/navigation.js"></script><script src="js/animations.js"></script><script src="js/contact.js"></script>
  <script>
    window.addEventListener("load", () => {
      document.getElementById("bh").textContent = window.WEBMINT_CONFIG.contact.hours;
      window.WM_initContact && window.WM_initContact();
    });
  </script>
</body>
</html>
