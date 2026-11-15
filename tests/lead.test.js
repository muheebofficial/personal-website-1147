import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeLead } from '../src/lib/lead.js';

const services = [
    { slug: 'agentic-ai-automation', title: 'Agentic AI Automation' },
    { slug: 'seo-audit', title: 'SEO Audit' },
];

const valid = {
    firstName: ' Emeka ',
    lastName: 'Okafor',
    email: 'EMEKA@Example.com',
    phone: '+234 803 000 0000',
    consent: true,
};

test('a valid service-page lead is cleaned and tagged with the real service title', () => {
    const { lead, bad } = normalizeLead(
        { ...valid, source: 'service', serviceSlug: 'agentic-ai-automation', page: '/services/x', serviceTitle: 'FAKE TITLE' },
        services,
    );
    assert.deepEqual(bad, []);
    assert.equal(lead.leadSource, 'service-page');
    assert.equal(lead.serviceTitle, 'Agentic AI Automation');
    assert.equal(lead.firstName, 'Emeka');
    assert.equal(lead.email, 'emeka@example.com');
});

test('contact-page leads carry no service title', () => {
    const { lead, bad } = normalizeLead({ ...valid, source: 'contact' }, services);
    assert.deepEqual(bad, []);
    assert.equal(lead.leadSource, 'contact-page');
    assert.equal(lead.serviceTitle, '');
});

test('an unknown service slug cannot invent a service', () => {
    const { lead } = normalizeLead({ ...valid, source: 'service', serviceSlug: 'made-up' }, services);
    assert.equal(lead.leadSource, 'website');
    assert.equal(lead.serviceTitle, '');
});

test('missing or malformed required fields are reported', () => {
    const { bad } = normalizeLead({ firstName: '', lastName: '', email: 'nope', phone: '12', consent: false }, services);
    assert.deepEqual(bad, ['firstName', 'lastName', 'email', 'phone', 'consent']);
});

test('control characters are stripped and long text is capped', () => {
    const { lead } = normalizeLead({ ...valid, message: 'a\u0000b\nc' + 'x'.repeat(5000) }, services);
    assert.ok(!/[\u0000-\u001F]/.test(lead.message));
    assert.equal(lead.message.length, 1500);
});

test('page paths must be site-relative and attribution objects are stringified', () => {
    const { lead } = normalizeLead({ ...valid, page: 'https://evil.example', attribution: { utm_source: 'google' } }, services);
    assert.equal(lead.pagePath, '');
    assert.equal(lead.attribution, '{"utm_source":"google"}');
});

test('non-object input does not throw', () => {
    for (const input of [null, undefined, 'x', 42]) {
        const { bad } = normalizeLead(input, services);
        assert.ok(bad.includes('email'));
    }
});
