import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { services } from './data/services';
import { slugify } from './utils/slug';
import { resolveRedirect } from './lib/route-redirects.js';

export const onRequest = defineMiddleware(async (context, next) => {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    const blogRoutes = posts.map((post) => `/blog/${slugify(post.id)}`);
    const tagRoutes = [...new Set(
        posts.flatMap((post) => (post.data.tags ?? []).map((tag) => `/blog/tag/${slugify(tag)}`))
    )];
    const serviceRoutes = services.map((service) => `/services/${service.slug}`);
    const knownRoutes = [...blogRoutes, ...tagRoutes, ...serviceRoutes];

    const redirectTarget = resolveRedirect(context.url.pathname, knownRoutes);
    if (redirectTarget) {
        return context.redirect(redirectTarget, 308);
    }

    return next();
});
