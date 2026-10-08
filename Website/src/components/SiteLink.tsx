import Link from 'next/link'
import type { ComponentProps } from 'react'

const isExternal = (href: string) => /^https?:\/\//i.test(href)

/**
 * A drop-in for next/link that opens absolute URLs, such as the Buildium
 * Resident Center, in a new tab instead of routing within the site.
 */
export function SiteLink({
  href,
  ...rest
}: Omit<ComponentProps<'a'>, 'href'> & { href: string }) {
  if (isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />
  }
  return <Link href={href} {...rest} />
}
