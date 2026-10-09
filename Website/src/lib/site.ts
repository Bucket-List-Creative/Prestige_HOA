/** The public address of the site, used for canonical URLs, the sitemap and robots.txt. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://prestigehoa.com').replace(/\/$/, '')

/** The public pages, in sitemap order. */
export const PUBLIC_PATHS = ['/', '/about', '/payments', '/title-company', '/contact']
