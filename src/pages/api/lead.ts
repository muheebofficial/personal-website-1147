import type { APIRoute } from 'astro';
import { services } from '../../data/services';
import { normalizeLead } from '../../lib/lead.js';

// On-demand route. Every other page on the site stays statically generated.
export const prerender = false;

const MAX_BODY = 20_000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
// Best-effort brake: resets when the serverless instance restarts.
const hits = new Map<string, number[]>();

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });

const env = (key: string): string | undefined =>
    process.env[key] ?? (import.meta.env as Record<string, string | undefined>)[key];

export const POST: APIRoute = async ({ request, clientAddress }) => {
    // Same-origin only. Accepts the host the request arrived on (production,
    // www, or a Vercel preview URL), whichever header the platform exposes it in.
    const origin = request.headers.get('origin');
    if (origin) {
        let originHost = '';
        try {
            originHost = new URL(origin).host;
        } catch {
            /* handled below */
        }
        const allowed = new Set<string>();
        const add = (value: string | null | undefined) => {
            const host = value?.split(',')[0]?.trim().toLowerCase();
            if (host) allowed.add(host);
        };
        try {
            add(new URL(request.url).host);
        } catch {
            /* ignore */
        }
        add(request.headers.get('x-forwarded-host'));
        add(request.headers.get('host'));
        add('muheebsulaiman.com');
        add('www.muheebsulaiman.com');
        if (!originHost || !allowed.has(originHost.toLowerCase())) {
            console.error('Lead API rejected origin:', origin, 'allowed:', [...allowed].join(' | '));
            return json({ error: 'forbidden' }, 403);
        }
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY) {
        console.error('Lead API rejected body: too large', raw.length);
        return json({ error: 'too_large' }, 413);
    }

    let body: any;
    try {
        body = JSON.parse(raw);
    } catch {
        console.error('Lead API rejected body: not valid JSON');
        return json({ error: 'invalid' }, 400);
    }
    if (!body || typeof body !== 'object') {
        console.error('Lead API rejected body: not an object');
        return json({ error: 'invalid' }, 400);
    }

    // Honeypot: real visitors never fill this. Pretend it worked, store nothing.
    if (body.fax || body.hp) return json({ ok: true });

    let ip = 'unknown';
    try {
        ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
    } catch {
        /* clientAddress can throw outside a real adapter */
    }
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) return json({ error: 'too_many' }, 429);
    hits.set(ip, [...recent, now]);

    const { lead, bad } = normalizeLead(body, services);
    if (bad.length) {
        console.error('Lead API validation failed on fields:', bad.join(', '));
        return json({ error: 'invalid', fields: bad }, 400);
    }

    const webhook = env('LEAD_WEBHOOK_URL');
    const secret = env('LEAD_WEBHOOK_SECRET');
    if (!webhook || !secret) {
        console.error('Lead form is not configured: LEAD_WEBHOOK_URL / LEAD_WEBHOOK_SECRET missing');
        return json({ error: 'not_configured' }, 500);
    }

    try {
        const res = await fetch(webhook, {
            method: 'POST',
            // text/plain keeps this a "simple" request; Apps Script reads the raw body.
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ ...lead, secret }),
            redirect: 'follow',
            signal: AbortSignal.timeout(20_000),
        });
        const result: any = await res.json().catch(() => null);

        // Success only when the script confirms the row was written.
        if (res.ok && result && result.ok === true && result.saved === true) {
            return json({ ok: true });
        }
        console.error(
            'Lead webhook rejected the lead:',
            res.status,
            res.headers.get('content-type') || 'no content-type',
            result ? `script said: ${result.error || JSON.stringify({ ok: result.ok, saved: result.saved })}` : 'response was not JSON',
        );
    } catch (err) {
        console.error('Lead webhook request failed:', err);
    }
    return json({ error: 'delivery_failed' }, 502);
};

export const GET: APIRoute = () => json({ error: 'method_not_allowed' }, 405);
