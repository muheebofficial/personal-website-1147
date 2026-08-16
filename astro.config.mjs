// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://muheebsulaiman.com',
  // Default `build.format: 'directory'` writes /about/index.html, which Vercel
  // serves as a clean /about. `trailingSlash: 'never'` keeps canonical URLs,
  // sitemap entries, and internal links all in that same slash-free form.
  trailingSlash: 'never',
  integrations: [sitemap()],
});
