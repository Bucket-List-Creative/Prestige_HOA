import Link from 'next/link'
import type { Metadata } from 'next'

import { Heading } from '@/components/Heading'
import { HomeownerFlow } from '@/components/HomeownerFlow'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Homeowner Payment' }
}

export default async function HomeownerPaymentPage() {
  const { homeowner } = await getSiteContent()

  return (
    <main style={{ paddingTop: 'calc(var(--header-h) + 6vh)' }}>
      <section
        style={{
          padding: '0 var(--page-x)',
          display: 'grid',
          gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
          gap: 24,
        }}
      >
        <div
          style={{
            gridColumn: '1 / span 12',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'baseline',
          }}
        >
          <div className="kicker">{homeowner.kicker}</div>
          <Link
            href={homeowner.crossLink.href}
            className="underline-link"
            style={{ fontSize: 12 }}
          >
            {homeowner.crossLink.label}
          </Link>
        </div>
        <Heading
          as="h1"
          heading={homeowner.heading}
          className="anim-hero-title"
          style={{
            gridColumn: '1 / span 12',
            margin: '8px 0 0',
            fontSize: 'clamp(2.6rem,7vw,7rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            fontWeight: 800,
          }}
        />
      </section>

      <HomeownerFlow content={homeowner} />
    </main>
  )
}
