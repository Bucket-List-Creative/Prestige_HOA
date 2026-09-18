import Link from 'next/link'
import type { Metadata } from 'next'

import { Heading } from '@/components/Heading'
import { TitleCompanyForm } from '@/components/TitleCompanyForm'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { titleCompany } = await getSiteContent()
  return { title: 'Title Company Portal', description: titleCompany.aside }
}

export default async function TitleCompanyPage() {
  const { titleCompany } = await getSiteContent()

  return (
    <main style={{ paddingTop: 'calc(var(--header-h) + 6vh)' }}>
      <section style={{ padding: '0 var(--page-x)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'baseline',
          }}
        >
          <div className="kicker">{titleCompany.kicker}</div>
          <Link
            href={titleCompany.crossLink.href}
            className="underline-link"
            style={{ fontSize: 12 }}
          >
            {titleCompany.crossLink.label}
          </Link>
        </div>
        <Heading
          as="h1"
          heading={titleCompany.heading}
          className="anim-hero-title"
          style={{
            margin: '8px 0 0',
            fontSize: 'clamp(2.6rem,7vw,7rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
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
        <aside
          className="col-rail"
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            borderTop: '2px solid var(--color-accent)',
            paddingTop: 20,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.55 }}>
            {titleCompany.aside}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            {titleCompany.requestTypes.map((type) => (
              <div
                key={type.term}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  borderBottom: '1px solid var(--color-divider)',
                  paddingBottom: 8,
                }}
              >
                <span style={{ opacity: 0.7 }}>{type.term}</span>
                <span>{type.text}</span>
              </div>
            ))}
          </div>
          <span className="tag tag-outline" style={{ alignSelf: 'flex-start' }}>
            {titleCompany.schemaNote}
          </span>
        </aside>

        <TitleCompanyForm content={titleCompany} />
      </section>
    </main>
  )
}
