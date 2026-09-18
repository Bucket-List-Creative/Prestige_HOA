'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Brand } from './Brand'
import type { SiteSettings } from '@/content/types'

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px,3vw,40px)',
        padding: '16px var(--page-x)',
        background: 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '2px solid var(--color-divider)',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ marginRight: 'auto' }}>
        <Brand settings={settings} />
      </div>
      <nav
        aria-label="Primary"
        style={{
          display: 'flex',
          gap: 'clamp(14px,2.5vw,32px)',
          fontSize: 13,
          letterSpacing: '0.02em',
          flexWrap: 'wrap',
        }}
      >
        {settings.primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href={settings.headerCta.href}
        className="btn btn-primary"
        style={{ justifyContent: 'flex-start', padding: '10px 18px' }}
      >
        {settings.headerCta.label}
      </Link>
    </header>
  )
}
