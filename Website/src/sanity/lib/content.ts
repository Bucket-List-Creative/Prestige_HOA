import { defaultContent } from '@/content/defaults'
import type { SiteContent } from '@/content/types'

import { sanityFetch } from './live'
import { siteContentQuery } from './queries'

type Plain = Record<string, unknown>

const isPlainObject = (value: unknown): value is Plain =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Sanity leaves unfilled fields as null and empty strings; both mean "use the default". */
const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === ''

/**
 * Overlay Sanity data on top of the built-in defaults.
 *
 * Objects merge key by key. A non-empty array from Sanity decides the length of
 * the result — so removing an item in the Studio removes it from the site —
 * while each entry still merges over the default at the same index (falling
 * back to the first default) so partly-filled entries, such as a pathway whose
 * image was never uploaded, keep the shipped values for what is missing.
 */
function merge<T>(base: T, incoming: unknown): T {
  if (isEmpty(incoming)) return base

  if (Array.isArray(incoming)) {
    if (incoming.length === 0) return base
    const defaults = Array.isArray(base) ? (base as unknown[]) : []
    const template = defaults[0]
    return incoming.map((item, i) =>
      merge(defaults[i] ?? template, item)
    ) as unknown as T
  }

  if (isPlainObject(incoming)) {
    if (!isPlainObject(base)) {
      // No default to merge onto — drop empty keys so callers never see nulls.
      const cleaned: Plain = {}
      for (const [key, value] of Object.entries(incoming)) {
        if (!isEmpty(value)) cleaned[key] = value
      }
      return cleaned as unknown as T
    }
    const result: Plain = { ...base }
    for (const [key, value] of Object.entries(incoming)) {
      result[key] = merge((base as Plain)[key], value)
    }
    return result as unknown as T
  }

  return incoming as T
}

/**
 * The whole site's copy, Sanity layered over the defaults. Every page calls
 * this; `sanityFetch` dedupes and revalidates through the Live Content API.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const { data } = await sanityFetch({ query: siteContentQuery })
    return merge(defaultContent, data)
  } catch (error) {
    // A missing dataset or a network blip should not take the site down —
    // it falls back to the copy shipped with the build.
    console.error('[sanity] falling back to default content:', error)
    return defaultContent
  }
}
