export function normalizePath(pathname = '/') {
    const clean = String(pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '');
    const normalized = clean === '' ? '/' : clean;
    return normalized.toLowerCase();
}

export function resolveRedirect(pathname, knownRoutes = []) {
    if (!pathname) return null;

    const requestedPath = normalizePath(pathname);
    if (requestedPath === '/') return null;

    const canonicalRoute = knownRoutes.find((route) => normalizePath(route) === requestedPath);
    if (!canonicalRoute) return null;

    return canonicalRoute === pathname ? null : canonicalRoute;
}
