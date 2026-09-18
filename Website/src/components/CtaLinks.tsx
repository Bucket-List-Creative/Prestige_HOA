import Link from 'next/link'
import type { CSSProperties, HTMLAttributes } from 'react'

import type { CtaLink } from '@/content/types'

const base: CSSProperties = {
  justifyContent: 'flex-start',
  padding: '14px 22px',
}

/** Renders a row of calls to action, styled by each link's variant. */
export function CtaLinks({
  links,
  style,
  onAccent = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  links: CtaLink[]
  /** True inside the gold CTA band, where the palette inverts. */
  onAccent?: boolean
}) {
  return (
    <div
      {...rest}
      style={{ display: 'flex', gap: 12, flexWrap: 'wrap', ...style }}
    >
      {links.map((link) => {
        if (onAccent) {
          const onAccentStyle: CSSProperties =
            link.variant === 'primary'
              ? {
                  ...base,
                  background: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  padding: '16px 24px',
                  fontSize: 15,
                }
              : link.variant === 'secondary'
                ? {
                    ...base,
                    border: '2px solid #0a1020',
                    color: '#0a1020',
                    padding: '14px 24px',
                    fontSize: 15,
                  }
                : {
                    ...base,
                    color: '#0a1020',
                    padding: '16px 8px',
                    fontSize: 15,
                    textDecoration: 'underline',
                    textUnderlineOffset: 6,
                  }
          return (
            <Link key={link.href + link.label} href={link.href} className="btn" style={onAccentStyle}>
              {link.label}
            </Link>
          )
        }

        return (
          <Link
            key={link.href + link.label}
            href={link.href}
            className={
              link.variant === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary'
            }
            style={base}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
