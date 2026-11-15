// Pure helpers for the website lead form: cleaning + validation.
// Kept dependency-free so they can be unit-tested with `node --test`.

const clean = (value, max) =>
    String(value == null ? '' : value).replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Turns an untrusted request body into a clean lead object.
 * `serviceList` is the site's own services list: the service title that ends
 * up in the sheet always comes from there, never from what the browser says,
 * so the "which page did this lead come from" column can be trusted.
 *
 * Returns { lead, bad } where `bad` lists the field names that failed.
 */
export function normalizeLead(input, serviceList = []) {
    const b = input && typeof input === 'object' ? input : {};

    const service = serviceList.find((s) => s.slug === clean(b.serviceSlug, 120));
    const leadSource = b.source === 'contact' ? 'contact-page' : service ? 'service-page' : 'website';

    let pagePath = clean(b.page, 200);
    if (pagePath && !pagePath.startsWith('/')) pagePath = '';

    let attribution = '';
    if (b.attribution) {
        attribution = clean(
            typeof b.attribution === 'string' ? b.attribution : JSON.stringify(b.attribution),
            1500,
        );
    }

    const lead = {
        leadSource,
        serviceTitle: service ? service.title : '',
        pagePath,
        firstName: clean(b.firstName, 80),
        lastName: clean(b.lastName, 80),
        email: clean(b.email, 120).toLowerCase(),
        phone: clean(b.phone, 30),
        challenge: clean(b.challenge, 200),
        business: clean(b.business, 150),
        website: clean(b.website, 200),
        businessType: clean(b.businessType, 100),
        budget: clean(b.budget, 100),
        preferredContact: clean(b.preferredContact, 60),
        message: clean(b.message, 1500),
        attribution,
        consent: b.consent === true || b.consent === 'on',
    };

    const bad = [];
    if (!lead.firstName) bad.push('firstName');
    if (!lead.lastName) bad.push('lastName');
    if (!EMAIL.test(lead.email)) bad.push('email');
    const digits = lead.phone.replace(/\D/g, '').length;
    if (digits < 7 || digits > 15) bad.push('phone');
    if (!lead.consent) bad.push('consent');

    return { lead, bad };
}
