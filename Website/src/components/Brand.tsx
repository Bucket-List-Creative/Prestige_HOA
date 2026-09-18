import Image from 'next/image'
import Link from 'next/link'

import type { SiteSettings } from '@/content/types'

/**
 * The wordmark. The logo art is a square badge that gets cropped to a circle
 * and nudged, matching the original's framing.
 */
export function Brand({
  settings,
  size = 40,
}: {
  settings: SiteSettings
  size?: number
}) {
  const scale = size * 2.5
  return (
    <Link
      href="/"
      aria-label={`${settings.brandPrimary} ${settings.brandSecondary} home`}
      style={{
        fontFamily: 'var(--font-heading)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span
        style={{
          width: size,
          height: size,
          overflow: 'hidden',
          position: 'relative',
          flex: 'none',
        }}
      >
        <Image
          src={settings.logo.src}
          alt=""
          width={scale}
          height={scale}
          priority
          style={{
            position: 'absolute',
            width: scale,
            height: scale,
            left: -scale * 0.31,
            top: -scale * 0.18,
            maxWidth: 'none',
          }}
        />
      </span>
      <span
        style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}
      >
        <span
          style={{
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontSize: 15,
            color: 'var(--color-accent)',
          }}
        >
          {settings.brandPrimary}
        </span>
        <span
          style={{
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontSize: 10,
            marginTop: 3,
          }}
        >
          {settings.brandSecondary}
        </span>
      </span>
    </Link>
  )
}
