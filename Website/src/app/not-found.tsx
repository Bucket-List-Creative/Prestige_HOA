import type { Metadata } from 'next'

import { Heading } from '@/components/Heading'
import { SiteLink } from '@/components/SiteLink'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent()
  return { title: settings.notFound.kicker }
}

export default async function NotFound() {
  const { notFound } = (await getSiteContent()).settings

  return (
    <main
      style={{
        paddingTop: 'calc(var(--header-h) + 6vh)',
        paddingBottom: 'clamp(64px,12vh,160px)',
      }}
    >
      <section style={{ padding: '0 var(--page-x)' }}>
        <div className="kicker anim-fade-up">{notFound.kicker}</div>
        <Heading
          as="h1"
          heading={notFound.heading}
          className="anim-hero-title"
          style={{
            margin: '16px 0 0',
            fontSize: 'clamp(3rem,9vw,10rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
            fontWeight: 800,
          }}
        />
        <p
          style={{
            margin: '24px 0 32px',
            maxWidth: '46ch',
            fontSize: 'clamp(15px,1.2vw,18px)',
            fontWeight: 300,
            lineHeight: 1.55,
          }}
        >
          {notFound.body}
        </p>
        <SiteLink
          href={notFound.link.href}
          className="btn btn-primary"
          style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
        >
          {notFound.link.label}
        </SiteLink>
      </section>
    </main>
  )
}
