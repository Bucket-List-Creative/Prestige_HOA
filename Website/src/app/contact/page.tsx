import type { Metadata } from 'next'

import { ContactForm } from '@/components/ContactForm'
import { Heading } from '@/components/Heading'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteContent()
  return { title: 'Concierge Support', description: contact.aside }
}

export default async function ContactPage() {
  const { contact, settings } = await getSiteContent()

  return (
    <main style={{ paddingTop: 'calc(var(--header-h) + 6vh)' }}>
      <section style={{ padding: '0 var(--page-x)' }}>
        <div className="kicker">{contact.kicker}</div>
        <Heading
          as="h1"
          heading={contact.heading}
          className="anim-hero-title"
          style={{
            margin: '16px 0 0',
            fontSize: 'clamp(3rem,9vw,10rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
            fontWeight: 800,
          }}
        />
      </section>

      <section
        style={{
          padding: 'clamp(32px,6vh,64px) var(--page-x) clamp(64px,12vh,160px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div
          className="col-rail"
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            borderTop: '2px solid var(--color-accent)',
            paddingTop: 20,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.55 }}>
            {contact.aside}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <div className="eyebrow">{contact.directLabel}</div>
            <a
              className="underline-link"
              href={`mailto:${settings.conciergeEmail}`}
            >
              {settings.conciergeEmail}
            </a>
            <span style={{ opacity: 0.6, fontSize: 12 }}>
              {contact.directNote}
            </span>
          </div>
        </div>

        <ContactForm content={contact} />
      </section>
    </main>
  )
}
