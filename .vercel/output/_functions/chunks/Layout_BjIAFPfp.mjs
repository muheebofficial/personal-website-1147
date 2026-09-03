import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, f as renderScript, r as renderComponent, e as renderSlot, j as renderHead } from './astro/server_BKJ5y0WX.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const $$Astro$1 = createAstro("https://muheebsulaiman.com");
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const path = Astro2.url.pathname;
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/results", label: "Results" },
    { href: "/blog", label: "Blog" },
    { href: "/ventures", label: "Ventures" }
  ];
  const serviceGroups = [
    {
      title: "Growth",
      items: [
        { href: "/services/brand-strategy-positioning", label: "Brand Strategy" },
        { href: "/services/aio-aeo-geo-seo-organic-growth", label: "SEO & Growth" },
        { href: "/services/paid-ads-performance-marketing", label: "Paid Ads" }
      ]
    },
    {
      title: "Automation",
      items: [
        { href: "/services/ai-automation-workflow-optimisation", label: "AI Automation" },
        { href: "/services/agentic-ai-automation", label: "Agentic AI" },
        { href: "/services/email-whatsapp-crm-automation", label: "CRM & WhatsApp" }
      ]
    }
  ];
  const isActive = (href) => href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
  return renderTemplate`<!-- ======= NAV ======= -->${maybeRenderHead()}<nav class="nav" role="navigation" aria-label="Main navigation" data-astro-cid-dmqpwcec> <div class="nav__inner" data-astro-cid-dmqpwcec> <a class="nav__logo" href="/" aria-label="Muheeb Sulaiman home" data-astro-cid-dmqpwcec> <img src="/logo.svg" alt="Muheeb Sulaiman" width="150" height="58" data-astro-cid-dmqpwcec> </a> <ul class="nav__links" data-astro-cid-dmqpwcec> ${links.map((l) => renderTemplate`<li data-astro-cid-dmqpwcec> <a${addAttribute(["nav__link", { active: isActive(l.href) }], "class:list")}${addAttribute(l.href, "href")}${addAttribute(isActive(l.href) ? "page" : void 0, "aria-current")} data-astro-cid-dmqpwcec>${l.label}</a> </li>`)} <li class="nav__dropdown" data-astro-cid-dmqpwcec> <a${addAttribute(["nav__link nav__link--dropdown", { active: isActive("/services") }], "class:list")} href="/services"${addAttribute(isActive("/services") ? "page" : void 0, "aria-current")} data-astro-cid-dmqpwcec> <span data-astro-cid-dmqpwcec>Services</span> <span class="nav__caret" data-astro-cid-dmqpwcec>▾</span> </a> <div class="nav__dropdown-panel" aria-label="Services submenu" data-astro-cid-dmqpwcec> <div class="nav__dropdown-grid" data-astro-cid-dmqpwcec> ${serviceGroups.map((group) => renderTemplate`<div class="nav__dropdown-group" data-astro-cid-dmqpwcec> <div class="nav__dropdown-group-title" data-astro-cid-dmqpwcec>${group.title}</div> ${group.items.map((service) => renderTemplate`<a class="nav__dropdown-item"${addAttribute(service.href, "href")} data-astro-cid-dmqpwcec>${service.label}</a>`)} </div>`)} </div> <a class="nav__dropdown-item nav__dropdown-item--cta" href="/services" data-astro-cid-dmqpwcec>All services</a> </div> </li> <li class="nav__search-item" data-astro-cid-dmqpwcec> <form class="nav__search" action="/search" method="get" role="search" data-astro-cid-dmqpwcec> <label class="sr-only" for="nav-search" data-astro-cid-dmqpwcec>Search blog and services</label> <input id="nav-search" name="q" type="search" placeholder="Search" autocomplete="off" data-astro-cid-dmqpwcec> <button type="submit" aria-label="Search blog and services" data-astro-cid-dmqpwcec>⌕</button> </form> </li> </ul> <div class="nav__cta" data-astro-cid-dmqpwcec> <a class="btn btn--ghost" href="/pricing" data-astro-cid-dmqpwcec><span data-astro-cid-dmqpwcec>Pricing</span></a> <a class="btn btn--primary" href="/contact" data-astro-cid-dmqpwcec><span data-astro-cid-dmqpwcec>Work With Me</span></a> </div> <button class="nav__hamburger" id="hamburger" type="button" aria-label="Menu" aria-controls="mobMenu" aria-expanded="false" data-astro-cid-dmqpwcec> <span data-astro-cid-dmqpwcec></span><span data-astro-cid-dmqpwcec></span><span data-astro-cid-dmqpwcec></span> </button> </div> </nav> <div class="mob-menu" id="mobMenu" data-astro-cid-dmqpwcec> ${links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} data-astro-cid-dmqpwcec>${l.label}</a>`)} <a href="/services" data-astro-cid-dmqpwcec>Services</a> <form class="mob-menu__search" action="/search" method="get" role="search" data-astro-cid-dmqpwcec> <label for="mobile-search" data-astro-cid-dmqpwcec>Search blog and services</label> <div data-astro-cid-dmqpwcec> <input id="mobile-search" name="q" type="search" placeholder="Search the site" autocomplete="off" data-astro-cid-dmqpwcec> <button type="submit" aria-label="Search blog and services" data-astro-cid-dmqpwcec>⌕</button> </div> </form> <a href="/pricing" data-astro-cid-dmqpwcec>Pricing</a> <a href="/contact" data-astro-cid-dmqpwcec>Contact</a> </div> `;
}, "C:/Users/hp/personal-website-1147/src/components/Nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`<!-- ======= FOOTER ======= -->${maybeRenderHead()}<footer class="footer" role="contentinfo"> <div class="container"> <div class="footer__inner"> <div class="footer__brand"> <div class="footer__logo-text">Muheeb <span>Sulaiman</span></div> <p>Digital Marketing Strategist. Founder of Correct Marketing NG. Building revenue systems that scale businesses through SEO, ads, AI, and automation.</p> </div> <div class="footer__col"> <h6>Navigate</h6> <ul class="footer__links"> <li><a class="footer__link" href="/">Home</a></li> <li><a class="footer__link" href="/about">About</a></li> <li><a class="footer__link" href="/services">Services</a></li> <li><a class="footer__link" href="/results">Results</a></li> <li><a class="footer__link" href="/blog">Blog</a></li> <li><a class="footer__link" href="/privacy">Privacy</a></li> </ul> </div> <div class="footer__col"> <h6>Ventures</h6> <ul class="footer__links"> <li><a class="footer__link" href="/ventures">Correct Marketing NG</a></li> <li><a class="footer__link" href="/ventures">Chef Daddy Cuisine</a></li> <li><a class="footer__link" href="/ventures">AI Projects</a></li> </ul> </div> <div class="footer__col"> <h6>Contact</h6> <ul class="footer__links"> <li><a class="footer__link" href="mailto:muheeb@muheebsulaiman.com">muheeb@muheebsulaiman.com</a></li> <li><a class="footer__link" href="tel:+2349110172901">+234 911 017 2901</a></li> <li><span class="footer__link">Lagos, Nigeria</span></li> <li> <h6>Opening Hours</h6> <span class="footer__link">Monday - Friday<br>9:00 AM - 5:00 PM</span> </li> <li style="margin-top:12px;"> <a href="https://wa.me/2349110172901?text=Hi%20Muheeb%2C%20I%27d%20like%20to%20discuss%20working%20together." target="_blank" rel="noopener" class="btn btn--primary btn--sm"><span>→ WhatsApp</span></a> </li> </ul> </div> </div> <div class="footer__bottom"> <p>© ${year} Muheeb Sulaiman. All rights reserved.</p> <p>Not just marketing — revenue systems that scale.</p> </div> </div> </footer>`;
}, "C:/Users/hp/personal-website-1147/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://muheebsulaiman.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description,
    image = "/images/correct-marketing-ng.jpg",
    type = "website"
  } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, Astro2.site).href;
  const ogImage = new URL(image, Astro2.site).href;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-7BCXN7EXMC"><\/script>', '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/favicon.svg"><title>', '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:url"', '><meta property="og:type"', '><meta property="og:site_name" content="Muheeb Sulaiman"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="sitemap" href="/sitemap-index.xml">', "", '</head> <body> <!-- Cursor --> <div class="cursor" id="cursor"></div> <div class="cursor-ring" id="cursorRing"></div> <!-- Floating WhatsApp --> <a href="https://wa.me/2349110172901?text=Hi%20Muheeb%2C%20I%27d%20like%20to%20discuss%20working%20together." target="_blank" rel="noopener" class="wa-fab" aria-label="Chat on WhatsApp"> <div class="wa-fab__ring"></div>\n\u{1F4AC}\n</a> ', " <main> ", " </main> ", " ", " </body> </html>"])), renderScript($$result, "C:/Users/hp/personal-website-1147/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), title, addAttribute(description, "content"), addAttribute(canonical, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(canonical, "content"), addAttribute(type, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderSlot($$result, $$slots["head"]), renderHead(), renderComponent($$result, "Nav", $$Nav, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "C:/Users/hp/personal-website-1147/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts"));
}, "C:/Users/hp/personal-website-1147/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
