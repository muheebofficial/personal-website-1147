import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKJ5y0WX.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_CMXEo7_O.mjs';
import { $ as $$Layout } from '../chunks/Layout_BjIAFPfp.mjs';
import { s as services } from '../chunks/services_u_21Wsdv.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://muheebsulaiman.com");
const prerender = false;
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).map((post) => ({
    type: "Blog",
    title: post.data.title,
    description: post.data.description,
    category: post.data.tags[0] || "Insight",
    href: `/blog/${post.id}`,
    searchable: [post.data.title, post.data.description, ...post.data.tags, post.body].join(" ")
  }));
  const serviceResults = services.map((service) => ({
    type: "Service",
    title: service.title,
    description: service.intro,
    category: service.category,
    href: `/services/${service.slug}`,
    searchable: [
      service.title,
      service.intro,
      service.problem,
      service.category,
      ...service.outcomes,
      ...service.includes
    ].join(" ")
  }));
  const searchIndex = [...posts, ...serviceResults];
  const query = (Astro2.url.searchParams.get("q") || "").trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length === 0 ? [] : searchIndex.map((item) => {
    const searchable = item.searchable.toLowerCase();
    const score = terms.reduce((total, term) => {
      const titleScore = item.title.toLowerCase().includes(term) ? 5 : 0;
      const categoryScore = item.category.toLowerCase().includes(term) ? 3 : 0;
      const contentScore = searchable.includes(term) ? 1 : 0;
      return total + titleScore + categoryScore + contentScore;
    }, 0);
    return { ...item, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": query ? `Search results for ${query} | Muheeb Sulaiman` : "Search | Muheeb Sulaiman", "description": "Search Muheeb Sulaiman's blog insights and revenue-building services.", "data-astro-cid-ipsxrsrh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="search-page" data-astro-cid-ipsxrsrh> <div class="container" data-astro-cid-ipsxrsrh> <div class="label" data-astro-cid-ipsxrsrh>Search</div> <h1 class="display-lg" data-astro-cid-ipsxrsrh>Find the right <em data-astro-cid-ipsxrsrh>signal.</em></h1> <p class="search-page__intro" data-astro-cid-ipsxrsrh>Search across the blog and services for ideas, systems, and practical ways to grow.</p> <form class="search-page__form" action="/search" method="get" role="search" data-astro-cid-ipsxrsrh> <label class="sr-only" for="page-search" data-astro-cid-ipsxrsrh>Search blog and services</label> <input id="page-search" name="q" type="search"${addAttribute(query, "value")} placeholder="Try AI automation, SEO, funnels..." autocomplete="off" autofocus data-astro-cid-ipsxrsrh> <button class="btn btn--primary" type="submit" data-astro-cid-ipsxrsrh><span data-astro-cid-ipsxrsrh>Search <span aria-hidden="true" data-astro-cid-ipsxrsrh>→</span></span></button> </form> ${query && renderTemplate`<p class="search-page__summary" data-astro-cid-ipsxrsrh>${results.length} ${results.length === 1 ? "result" : "results"} for <strong data-astro-cid-ipsxrsrh>“${query}”</strong></p>`} ${query && results.length > 0 ? renderTemplate`<div class="search-results" data-astro-cid-ipsxrsrh> ${results.map((result) => renderTemplate`<a class="search-result"${addAttribute(result.href, "href")} data-astro-cid-ipsxrsrh> <div class="search-result__type" data-astro-cid-ipsxrsrh>${result.type} · ${result.category}</div> <h2 data-astro-cid-ipsxrsrh>${result.title}</h2> <p data-astro-cid-ipsxrsrh>${result.description}</p> <span class="search-result__link" data-astro-cid-ipsxrsrh>Explore <span aria-hidden="true" data-astro-cid-ipsxrsrh>→</span></span> </a>`)} </div>` : query ? renderTemplate`<div class="search-page__empty" data-astro-cid-ipsxrsrh> <h2 data-astro-cid-ipsxrsrh>No matching content yet.</h2> <p data-astro-cid-ipsxrsrh>Try a broader search such as “marketing”, “AI”, or “growth”.</p> </div>` : renderTemplate`<div class="search-page__empty" data-astro-cid-ipsxrsrh> <h2 data-astro-cid-ipsxrsrh>Search the knowledge base.</h2> <p data-astro-cid-ipsxrsrh>Use the field above to search published insights and available services.</p> </div>`} </div> </section> ` })} `;
}, "C:/Users/hp/personal-website-1147/src/pages/search.astro", void 0);

const $$file = "C:/Users/hp/personal-website-1147/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
