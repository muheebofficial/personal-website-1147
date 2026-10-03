import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRedirect, normalizePath } from '../src/lib/route-redirects.js';

test('normalizePath collapses trailing slashes and case differences', () => {
    assert.equal(normalizePath('/BLOG/WHO-IS-MUHEEB-SULAIMAN/'), '/blog/who-is-muheeb-sulaiman');
    assert.equal(normalizePath('/services/Brand-Strategy-Positioning/'), '/services/brand-strategy-positioning');
});

test('resolveRedirect redirects legacy or case-variant URLs to canonical routes', () => {
    assert.equal(resolveRedirect('/BLOG/WHO-IS-MUHEEB-SULAIMAN/', ['/blog/who-is-muheeb-sulaiman']), '/blog/who-is-muheeb-sulaiman');
    assert.equal(resolveRedirect('/services/Brand-Strategy-Positioning/', ['/services/brand-strategy-positioning']), '/services/brand-strategy-positioning');
    assert.equal(resolveRedirect('/downloads/The_Nigerian_Business_Owners_Guide_to_Agentic_AI_Expanded.pdf', ['/guide']), '/guide/The_Nigerian_Business_Owners_Guide_to_Agentic_AI_Expanded.pdf');
    assert.equal(resolveRedirect('/contact', ['/contact']), null);
    assert.equal(resolveRedirect('/missing-page', ['/contact']), null);
});

test('resolveRedirect maps legacy service URLs to Nigeria-focused canonical slugs', () => {
    const serviceAliases = {
        '/services/brand-strategy-positioning': '/services/best-brand-strategy-positioning-services-in-nigeria',
    };

    assert.equal(
        resolveRedirect('/services/brand-strategy-positioning/', ['/services/best-brand-strategy-positioning-services-in-nigeria'], serviceAliases),
        '/services/best-brand-strategy-positioning-services-in-nigeria',
    );
});
