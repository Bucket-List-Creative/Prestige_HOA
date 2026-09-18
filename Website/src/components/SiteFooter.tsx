import Link from 'next/link'

import { Brand } from './Brand'
import type { Link as LinkType, SiteSettings } from '@/content/types'

function FooterNav({
  label,
  links,
}: {
  label: string
  links: LinkType[]
}) {
  return (
    <nav
      aria-label={label}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <span className="eyebrow">{label}</span>
      {links.map((link) => (
        <Link key={`${link.href}-${link.label}`} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '2px solid var(--color-accent)',
        padding: '40px var(--page-x) 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
        gap: '32px 24px',
        fontSize: 13,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Brand settings={settings} size={48} />
        <span style={{ fontWeight: 300, maxWidth: '28ch' }}>
          {settings.tagline}
        </span>
      </div>
      <FooterNav label="Site" links={settings.footerSiteLinks} />
      <FooterNav label="Portals" links={settings.footerPortalLinks} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontWeight: 300,
        }}
      >
        <span className="eyebrow">Secure</span>
        <span>{settings.secureNote}</span>
        <span style={{ opacity: 0.6, marginTop: 8 }}>{settings.copyright}</span>
      </div>
    </footer>
  )
}
