import { g as getCollection } from '../chunks/_astro_content_CMXEo7_O.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const GET = async ({ site }) => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const origin = site ? site.toString() : "https://muheebsulaiman.com";
  const items = posts.map((post) => {
    const url = new URL(`/blog/${post.id}`, origin).href;
    return `<item><title>${escapeXml(post.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.pubDate.toUTCString()}</pubDate></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Muheeb Sulaiman Insights</title><link>${origin}</link><description>New articles on AI, marketing, and business systems.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
