/* =========================================================
   WebMint — Contact form
   Service-layer design. Plug in any provider by flipping
   the flag in js/config.js -> integrations.
   ========================================================= */

/* ---------- Providers (placeholders, safe no-ops until enabled) ---------- */
const WM_Providers = {
  // 1. EmailJS
  async emailjs(data) {
    const cfg = window.WEBMINT_CONFIG.integrations.emailjs;
    if (!cfg.enabled) throw new Error("EmailJS not enabled");
    // Load script on demand
    if (!window.emailjs) {
      await new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload = res; s.onerror = rej; document.head.appendChild(s);
      });
      window.emailjs.init({ publicKey: cfg.publicKey });
    }
    return window.emailjs.send(cfg.serviceId, cfg.templateId, data);
  },

  // 2. Formspree
  async formspree(data) {
    const cfg = window.WEBMINT_CONFIG.integrations.formspree;
    if (!cfg.enabled) throw new Error("Formspree not enabled");
    const r = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Formspree failed");
    return r.json();
  },

  // 3. Netlify Forms (uses the native form-name POST)
  async netlify(data) {
    const cfg = window.WEBMINT_CONFIG.integrations.netlify;
    if (!cfg.enabled) throw new Error("Netlify Forms not enabled");
    const body = new URLSearchParams({ "form-name": "webmint-enquiry", ...data }).toString();
    const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
    if (!r.ok) throw new Error("Netlify submission failed");
    return true;
  },

  // 4. Telegram Bot
  async telegramBot(data) {
    const cfg = window.WEBMINT_CONFIG.integrations.telegramBot;
    if (!cfg.enabled) throw new Error("Telegram bot not enabled");
    const text =
      `📩 *New WebMint enquiry*\n\n` +
      Object.entries(data).map(([k, v]) => `*${k}:* ${v || "-"}`).join("\n");
    const url = `https://api.telegram.org/bot${cfg.botToken}/sendMessage`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: cfg.chatId, text, parse_mode: "Markdown" }),
    });
    if (!r.ok) throw new Error("Telegram send failed");
    return r.json();
  },

  // 5. WhatsApp Business API (server-side recommended; here we open chat)
  async whatsappApi(data) {
    // WhatsApp Business API requires a backend. Fallback: open a pre-filled chat.
    const msg = encodeURIComponent(
      `New enquiry from ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nBudget: ${data.budget}\n\n${data.message}`
    );
    window.open(`https://wa.me/${window.WEBMINT_CONFIG.contact.whatsapp}?text=${msg}`, "_blank");
    return true;
  },

  // 6. Custom Node/PHP backend
  async customBackend(data) {
    const cfg = window.WEBMINT_CONFIG.integrations.customBackend;
    if (!cfg.enabled) throw new Error("Custom backend not enabled");
    const r = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Backend rejected submission");
    return r.json();
  },
};

/* ---------- Validation ---------- */
function WM_validate(form) {
  let ok = true;
  const fields = form.querySelectorAll("[data-required]");
  fields.forEach(f => {
    const wrap = f.closest(".field");
    const val = f.value.trim();
    let bad = !val;
    if (!bad && f.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!bad && f.name === "phone") bad = !/^[+\d\s()-]{7,}$/.test(val);
    wrap?.classList.toggle("error", bad);
    if (bad) ok = false;
  });
  return ok;
}

/* ---------- Submit orchestrator ---------- */
async function WM_submit(data) {
  const int = window.WEBMINT_CONFIG.integrations;
  if (int.emailjs.enabled) return WM_Providers.emailjs(data);
  if (int.formspree.enabled) return WM_Providers.formspree(data);
  if (int.netlify.enabled) return WM_Providers.netlify(data);
  if (int.telegramBot.enabled) return WM_Providers.telegramBot(data);
  if (int.customBackend.enabled) return WM_Providers.customBackend(data);
  if (int.whatsappApi.enabled) return WM_Providers.whatsappApi(data);
  // Fallback: log locally so the form works out of the box.
  console.info("[WebMint] Enquiry (no provider enabled):", data);
  return new Promise(r => setTimeout(r, 700));
}

/* ---------- Bind ---------- */
window.WM_initContact = function () {
  const form = document.getElementById("enquiryForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const fileInput = form.querySelector('input[type="file"]');
  const fileLabel = document.getElementById("fileLabel");
  fileInput?.addEventListener("change", () => {
    fileLabel.textContent = fileInput.files[0]?.name || "Click or drop a file (optional)";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    if (!WM_validate(form)) {
      status.className = "form-status error";
      status.textContent = "Please fix the highlighted fields.";
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    delete data.file;
    if (fileInput?.files[0]) data.fileName = fileInput.files[0].name;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = "Sending…"; btn.disabled = true;
    try {
      await WM_submit(data);
      status.className = "form-status success";
      status.textContent = "Thanks! Your enquiry has been received. We'll reply within one business day.";
      form.reset();
      if (fileLabel) fileLabel.textContent = "Click or drop a file (optional)";
    } catch (err) {
      console.error(err);
      status.className = "form-status error";
      status.textContent = "Something went wrong. Please email us directly or try again.";
    } finally {
      btn.innerHTML = original; btn.disabled = false;
    }
  });
};


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
