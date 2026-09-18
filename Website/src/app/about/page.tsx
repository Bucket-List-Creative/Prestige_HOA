import Image from 'next/image'
import type { Metadata } from 'next'

import { CtaLinks } from '@/components/CtaLinks'
import { Heading } from '@/components/Heading'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSiteContent()
  return { title: 'About', description: about.aside }
}

export default async function AboutPage() {
  const { about } = await getSiteContent()

  return (
    <main style={{ paddingTop: 'calc(var(--header-h) + 6vh)' }}>
      <section style={{ padding: '0 var(--page-x)' }}>
        <div className="kicker anim-fade-up">{about.kicker}</div>
        <Heading
          as="h1"
          heading={about.heading}
          className="anim-hero-title"
          style={{
            margin: '16px 0 0',
            fontSize: 'clamp(3rem,9vw,10rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
            fontWeight: 800,
            textWrap: 'balance',
          }}
        />
      </section>

      <section
        style={{
          padding: 'clamp(32px,6vh,72px) var(--page-x) 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <figure
          className="grayscale framed anim-hero-img col-wide"
          data-parallax="-0.06"
          style={{
            margin: 0,
            height: 'clamp(320px,70vh,780px)',
            minWidth: 0,
          }}
        >
          <Image
            src={about.image.src}
            alt={about.image.alt}
            width={about.image.width}
            height={about.image.height}
            priority
            sizes="(max-width: 900px) 100vw, 66vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </figure>
        <div
          data-reveal=""
          className="col-aside-right"
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingTop: 'clamp(0px,10vh,120px)',
          }}
        >
          <div className="hr" style={{ margin: 0, background: 'var(--color-accent)' }} />
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(15px,1.2vw,18px)',
              lineHeight: 1.55,
              fontWeight: 300,
            }}
          >
            {about.aside}
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,12vh,160px) var(--page-x) 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
            borderTop: '2px solid var(--color-accent)',
          }}
        >
          {about.values.map((value, i) => (
            <div
              key={value.title}
              data-reveal=""
              style={{
                padding:
                  i === 0
                    ? '28px 24px 28px 0'
                    : i === about.values.length - 1
                      ? '28px 0 28px 24px'
                      : '28px 24px',
                borderBottom: '2px solid var(--color-divider)',
              }}
            >
              <div className="eyebrow" style={{ color: 'var(--color-accent-700)' }}>
                {value.kicker}
              </div>
              <h3
                style={{
                  margin: '14px 0 8px',
                  fontSize: 'clamp(1.4rem,2vw,2rem)',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.55,
                }}
              >
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,12vh,160px) var(--page-x)' }}>
        <Heading
          data-reveal=""
          heading={about.closing.heading}
          style={{
            margin: 0,
            fontSize: 'clamp(2.2rem,5vw,5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontWeight: 600,
            maxWidth: '22ch',
            textWrap: 'balance',
          }}
        />
        <CtaLinks
          data-reveal=""
          links={about.closing.links}
          style={{ marginTop: 32 }}
        />
      </section>
    </main>
  )
}
