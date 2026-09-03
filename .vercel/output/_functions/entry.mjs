import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DA52BwnW.mjs';
import { manifest } from './manifest_DidJw4KJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/ai-automation.astro.mjs');
const _page4 = () => import('./pages/api/subscribe.astro.mjs');
const _page5 = () => import('./pages/blog/tag/_tag_.astro.mjs');
const _page6 = () => import('./pages/blog/_slug_.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/contact.astro.mjs');
const _page9 = () => import('./pages/pricing.astro.mjs');
const _page10 = () => import('./pages/privacy.astro.mjs');
const _page11 = () => import('./pages/results.astro.mjs');
const _page12 = () => import('./pages/rss.xml.astro.mjs');
const _page13 = () => import('./pages/services/_slug_.astro.mjs');
const _page14 = () => import('./pages/services.astro.mjs');
const _page15 = () => import('./pages/ventures.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/ai-automation.astro", _page3],
    ["src/pages/api/subscribe.ts", _page4],
    ["src/pages/blog/tag/[tag].astro", _page5],
    ["src/pages/blog/[slug].astro", _page6],
    ["src/pages/blog/index.astro", _page7],
    ["src/pages/contact.astro", _page8],
    ["src/pages/pricing.astro", _page9],
    ["src/pages/privacy.astro", _page10],
    ["src/pages/results.astro", _page11],
    ["src/pages/rss.xml.ts", _page12],
    ["src/pages/services/[slug].astro", _page13],
    ["src/pages/services.astro", _page14],
    ["src/pages/ventures.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9153a229-c808-4cd2-98e3-2f055d8373af",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
