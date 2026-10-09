import type { Metadata } from 'next'

import type { Seo } from '@/content/types'

/**
 * Page metadata from a page's SEO fields. A blank title keeps the site name
 * from the root layout; a blank description falls back to the page's own copy.
 */
export function pageMetadata(
  seo: Seo,
  path: string,
  fallbackDescription?: string
): Metadata {
  const description = seo.description || fallbackDescription
  const image = seo.image?.src
    ? [{ url: seo.image.src, width: seo.image.width, height: seo.image.height, alt: seo.image.alt }]
    : undefined
  return {
    ...(seo.title ? { title: seo.title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(seo.title ? { title: seo.title } : {}),
      description,
      url: path,
      images: image,
    },
  }
}
