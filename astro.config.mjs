// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://muheebsulaiman.com',
  // The project contains a dynamic API route for newsletter signup, so the site must
  // be built as a server deployment on Vercel instead of a fully static one.
  output: 'server',
  // Default `build.format: 'directory'` writes /about/index.html, which Vercel
  // serves as a clean /about. `trailingSlash: 'never'` keeps canonical URLs,
  // sitemap entries, and internal links all in that same slash-free form.
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [sitemap()],
});
