export const legacyRouteAliases = {
    '/downloads/the-nigerian-business-owners-guide-to-agentic-ai-expanded.pdf': '/guide/The_Nigerian_Business_Owners_Guide_to_Agentic_AI_Expanded.pdf',
    '/downloads/the_nigerian_business_owners_guide_to_agentic_ai_expanded.pdf': '/guide/The_Nigerian_Business_Owners_Guide_to_Agentic_AI_Expanded.pdf',
};

export function normalizePath(pathname = '/') {
    const clean = String(pathname || '/').split('?')[0].split('#')[0].replace(/\/+$|\\/g, '');
    const normalized = clean === '' ? '/' : clean;
    return normalized.toLowerCase();
}

export function resolveRedirect(pathname, knownRoutes = []) {
    if (!pathname) return null;

    const rawPath = String(pathname).split('?')[0].split('#')[0];
    const requestedPath = normalizePath(rawPath);
    if (requestedPath === '/') return null;

    const canonicalRoute = knownRoutes.find((route) => normalizePath(route) === requestedPath);
    if (canonicalRoute) {
        return rawPath === canonicalRoute ? null : canonicalRoute;
    }

    const legacyTarget = legacyRouteAliases[requestedPath];
    if (legacyTarget) return legacyTarget;

    return null;
}
