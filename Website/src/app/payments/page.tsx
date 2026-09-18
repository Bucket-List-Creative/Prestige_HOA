import type { Metadata } from 'next'

import { Heading } from '@/components/Heading'
import { SplitPanels } from '@/components/SplitPanels'
import { getSiteContent } from '@/sanity/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { payments } = await getSiteContent()
  return { title: 'Payments', description: payments.intro }
}

export default async function PaymentsPage() {
  const { payments } = await getSiteContent()

  return (
    <main style={{ paddingTop: 'calc(var(--header-h) + 6vh)' }}>
      <section style={{ padding: '0 var(--page-x)' }}>
        <div className="kicker anim-fade-up">{payments.kicker}</div>
        <Heading
          as="h1"
          heading={payments.heading}
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
          className="anim-fade-up"
          style={{
            margin: '24px 0 0',
            maxWidth: '46ch',
            fontSize: 'clamp(15px,1.2vw,18px)',
            fontWeight: 300,
            lineHeight: 1.55,
            animationDelay: '.3s',
          }}
        >
          {payments.intro}
        </p>
      </section>

      <section style={{ padding: 'clamp(40px,7vh,80px) var(--page-x)' }}>
        <SplitPanels
          className="anim-hero-img"
          minHeight="clamp(440px,70vh,720px)"
          panels={payments.options.map((option) => ({
            key: option.href,
            href: option.href,
            image: option.image,
            justify: 'space-between' as const,
            overlay:
              'linear-gradient(to top, color-mix(in srgb, #0a1020 85%, transparent) 30%, color-mix(in srgb, #0a1020 35%, transparent))',
            children: (
              <>
                <span className="eyebrow" style={{ position: 'relative' }}>
                  {option.eyebrow}
                </span>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(2.2rem,4vw,4rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.03em',
                      fontWeight: 800,
                    }}
                  >
                    {option.title}
                  </span>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 300,
                    }}
                  >
                    {option.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <span
                    className="btn"
                    style={
                      option.variant === 'primary'
                        ? {
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-start',
                            background: 'var(--color-accent)',
                            color: '#0a1020',
                            padding: '14px 20px',
                            marginTop: 8,
                          }
                        : {
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-start',
                            border: '2px solid var(--color-accent)',
                            color: 'var(--color-text)',
                            padding: '12px 20px',
                            marginTop: 8,
                          }
                    }
                  >
                    {option.linkLabel} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </>
            ),
          }))}
        />
      </section>
    </main>
  )
}
