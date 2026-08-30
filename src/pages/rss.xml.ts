import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

const escapeXml = (value: string) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
    const posts = (await getCollection('blog', ({ data }) => !data.draft))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    const origin = site ?? new URL('https://muheebsulaiman.com');
    const items = posts.map((post) => {
        const url = new URL(`/blog/${post.id}`, origin).href;
        return `<item><title>${escapeXml(post.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.pubDate.toUTCString()}</pubDate></item>`;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Muheeb Sulaiman Insights</title><link>${origin.href}</link><description>New articles on AI, marketing, and business systems.</description><language>en</language>${items}</channel></rss>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
