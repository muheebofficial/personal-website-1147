import type { APIRoute } from 'astro';

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json() as { email?: unknown; website?: unknown };
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

        if (body.website) return new Response(JSON.stringify({ message: 'Thanks.' }), { status: 200 });
        if (!emailPattern.test(email)) {
            return new Response(JSON.stringify({ message: 'Enter a valid email address.' }), { status: 400 });
        }

        const apiKey = import.meta.env.MAILERLITE_API_KEY;
        const groupId = import.meta.env.MAILERLITE_GROUP_ID;
        if (!apiKey || !groupId) {
            return new Response(JSON.stringify({ message: 'Subscriptions are temporarily unavailable.' }), { status: 503 });
        }

        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, groups: [groupId] }),
        });

        if (!response.ok) {
            const providerBody = await response.text();
            if (response.status === 422 && providerBody.toLowerCase().includes('already')) {
                return new Response(JSON.stringify({ message: 'You are already subscribed.' }), { status: 200 });
            }
            return new Response(JSON.stringify({ message: 'We could not complete your subscription. Please try again.' }), { status: 502 });
        }

        return new Response(JSON.stringify({ message: 'You are subscribed. Watch your inbox for new posts.' }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ message: 'Please try again in a moment.' }), { status: 400 });
    }
};
