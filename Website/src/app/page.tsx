import Image from 'next/image'
import Link from 'next/link'

import { CtaLinks } from '@/components/CtaLinks'
import { Heading } from '@/components/Heading'
import { SplitPanels } from '@/components/SplitPanels'
import { getSiteContent } from '@/sanity/lib/content'

export default async function HomePage() {
  const { home, settings } = await getSiteContent()
  const { hero, intro, pathways, philosophy, process, trust, cta } = home

  return (
    <main>
      {/* ── Arrival ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Arrival"
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding:
            'calc(var(--header-h) + 6vh) var(--page-x) clamp(24px,5vh,64px)',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          overflow: 'hidden',
        }}
      >
        <figure
          data-hero-img=""
          className="grayscale anim-hero-img"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            margin: 0,
            overflow: 'hidden',
            willChange: 'transform',
          }}
        >
          <Image
            data-layer="0.25"
            data-mouse="0.4"
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            sizes="100vw"
            style={{
              position: 'absolute',
              inset: '-12% 0',
              width: '100%',
              height: '124%',
              objectFit: 'cover',
              willChange: 'transform',
            }}
          />
          <div
            data-layer="0.42"
            data-mouse="0.8"
            style={{
              position: 'absolute',
              inset: '-10% 0',
              background:
                'linear-gradient(to top, #0a1020 0%, color-mix(in srgb,#0a1020 70%,transparent) 45%, color-mix(in srgb,#0a1020 35%,transparent) 100%)',
              willChange: 'transform',
            }}
          />
        </figure>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
            gap: 24,
            fontSize: 12,
            lineHeight: 1.5,
            letterSpacing: '0.02em',
          }}
        >
          {hero.notes.map((note, i) => (
            <div
              key={note}
              className="anim-fade-up"
              style={{
                minWidth: 0,
                whiteSpace: 'pre-line',
                animationDelay: `${0.3 + i * 0.4}s`,
              }}
            >
              {note}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 'clamp(24px,5vh,64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Heading
            as="h1"
            heading={hero.heading}
            breakBefore
            data-hero-title=""
            style={{
              position: 'relative',
              zIndex: 1,
              paddingBottom: 'clamp(180px,26vh,260px)',
              margin: 0,
              fontSize: 'clamp(4rem,11vw,12rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              textWrap: 'balance',
              animation: 'heroTitle 1.4s cubic-bezier(.2,.7,.1,1) .2s both',
              willChange: 'transform',
            }}
          />
          <Image
            src={settings.logo.src}
            alt=""
            aria-hidden="true"
            width={560}
            height={560}
            style={{
              position: 'absolute',
              zIndex: 3,
              right: 'clamp(-80px,-4vw,-40px)',
              bottom: 'clamp(-40px,-2vw,-20px)',
              width: 'clamp(260px,34vw,560px)',
              height: 'auto',
              opacity: 0.22,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              maskImage:
                'radial-gradient(circle at 50% 50%, #000 40%, transparent 72%)',
              WebkitMaskImage:
                'radial-gradient(circle at 50% 50%, #000 40%, transparent 72%)',
              animation: 'wmIn 2s 1.2s both',
            }}
          />
          <div
            style={{
              position: 'absolute',
              zIndex: 3,
              left: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              padding: 26,
              maxWidth: 640,
              background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderTop: '2px solid var(--color-accent)',
              animation: 'fadeUp 1.2s 1.2s both',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
              {hero.panelText}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href={hero.primaryCta.href}
                className="btn btn-primary"
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  flex: '1 1 0',
                  padding: '18px 24px',
                  fontSize: 16,
                  whiteSpace: 'nowrap',
                }}
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="btn btn-secondary"
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  flex: '1 1 0',
                  padding: '16px 24px',
                  fontSize: 16,
                  whiteSpace: 'nowrap',
                }}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introduction ────────────────────────────────────────────────── */}
      <section
        aria-label="Introduction"
        style={{
          position: 'relative',
          zIndex: 3,
          background: 'var(--color-bg)',
          padding: 'clamp(56px,10vh,140px) var(--page-x) 0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
            alignItems: 'end',
          }}
        >
          <div data-reveal="" className="kicker" style={{ gridColumn: '1 / span 12' }}>
            {intro.kicker}
          </div>
          <Heading
            data-reveal=""
            heading={intro.heading}
            style={{
              gridColumn: '1 / span 12',
              margin: '12px 0 0',
              fontSize: 'clamp(2.4rem,6vw,6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 600,
              textWrap: 'balance',
              maxWidth: '20ch',
            }}
          />
          <p
            data-reveal=""
            style={{
              gridColumn: '1 / span 12',
              maxWidth: '44ch',
              fontSize: 'clamp(15px,1.2vw,18px)',
              lineHeight: 1.55,
              fontWeight: 300,
              margin: '24px 0 0',
            }}
          >
            {intro.body}
          </p>
        </div>
        <div
          className="hr"
          style={{
            margin: 'clamp(48px,8vh,96px) 0 0',
            background: 'var(--color-accent)',
          }}
        />
      </section>

      {/* ── Pathways ────────────────────────────────────────────────────── */}
      <section
        aria-label="How can we help"
        style={{ padding: 'clamp(48px,8vh,96px) var(--page-x)' }}
      >
        <div
          data-reveal=""
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(2rem,4.5vw,4.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontWeight: 600,
            }}
          >
            {pathways.heading}
          </h2>
          <span className="eyebrow">{pathways.note}</span>
        </div>

        <SplitPanels
          minHeight="clamp(380px,60vh,640px)"
          panels={pathways.items.map((item) => ({
            key: item.href,
            href: item.href,
            image: item.image,
            justify: 'flex-end' as const,
            overlay:
              'linear-gradient(to top, color-mix(in srgb, #0a1020 82%, transparent), transparent 60%)',
            children: (
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <span className="eyebrow">{item.eyebrow}</span>
                <span
                  style={{
                    fontSize: 'clamp(2rem,3.6vw,3.6rem)',
                    lineHeight: 0.98,
                    letterSpacing: '-0.03em',
                    fontWeight: 800,
                  }}
                >
                  {item.titleTop}
                  <br />
                  {item.titleBottom}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    maxWidth: '36ch',
                    opacity: 0.92,
                  }}
                >
                  {item.body}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    borderBottom: '2px solid var(--color-accent)',
                    paddingBottom: 4,
                    alignSelf: 'flex-start',
                  }}
                >
                  {item.linkLabel} <span aria-hidden="true">→</span>
                </span>
              </div>
            ),
          }))}
        />
      </section>

      {/* ── Philosophy ──────────────────────────────────────────────────── */}
      <section
        aria-label="Philosophy"
        style={{
          position: 'relative',
          padding: 'clamp(64px,12vh,160px) var(--page-x) 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
          }}
        >
          <div data-reveal="" className="kicker" style={{ gridColumn: '1 / span 12' }}>
            {philosophy.kicker}
          </div>
          <Heading
            data-reveal=""
            heading={philosophy.heading}
            breakBefore
            style={{
              gridColumn: '1 / span 12',
              margin: '12px 0 0',
              fontSize: 'clamp(3rem,9vw,10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.045em',
              fontWeight: 800,
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
            marginTop: 'clamp(32px,6vh,80px)',
            alignItems: 'start',
          }}
        >
          <figure
            className="grayscale framed"
            data-parallax="-0.08"
            style={{
              gridColumn: '1 / span 12',
              margin: 0,
              height: 'clamp(320px,60vh,720px)',
            }}
          >
            <Image
              src={philosophy.image.src}
              alt={philosophy.image.alt}
              width={philosophy.image.width}
              height={philosophy.image.height}
              sizes="100vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </figure>
          <div
            data-reveal=""
            style={{
              gridColumn: '1 / span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: 32,
              position: 'relative',
              padding: '32px 0 0',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(16px,1.4vw,22px)',
                lineHeight: 1.45,
                fontWeight: 300,
                maxWidth: '38ch',
              }}
            >
              {philosophy.lead}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                fontSize: 14,
                lineHeight: 1.5,
                borderTop: '2px solid var(--color-accent)',
                paddingTop: 18,
              }}
            >
              {philosophy.principles.map((principle) => (
                <div key={principle.term}>
                  <strong style={{ fontWeight: 600 }}>{principle.term}</strong>{' '}
                  {principle.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Process"
        style={{ padding: 'clamp(64px,12vh,160px) var(--page-x) 0' }}
      >
        <div data-reveal="" className="kicker">
          {process.kicker}
        </div>
        <Heading
          data-reveal=""
          heading={process.heading}
          style={{
            margin: '12px 0 40px',
            fontSize: 'clamp(2.2rem,5vw,5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontWeight: 600,
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
            borderTop: '2px solid var(--color-accent)',
          }}
        >
          {process.columns.map((column, i) => (
            <div
              key={column.label}
              data-reveal=""
              style={{
                padding: i === 0 ? '32px 32px 32px 0' : '32px 0 32px 32px',
                borderLeft: i > 0 ? '2px solid var(--color-divider)' : undefined,
                borderBottom: '2px solid var(--color-divider)',
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                {column.label}
              </div>
              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {column.steps.map((step) => (
                  <li
                    key={step.title}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '14px 1fr',
                      gap: 16,
                      padding: '18px 0',
                      borderTop: '1px solid var(--color-divider)',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 14,
                        height: 2,
                        background: 'var(--color-accent)',
                        display: 'inline-block',
                        transform: 'translateY(-4px)',
                      }}
                    />
                    <span>
                      <strong
                        style={{
                          fontWeight: 600,
                          display: 'block',
                          fontSize: 17,
                        }}
                      >
                        {step.title}
                      </strong>
                      <span style={{ fontSize: 14, fontWeight: 300 }}>
                        {step.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Trust"
        style={{ padding: 'clamp(64px,12vh,160px) var(--page-x) 0' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
            alignItems: 'end',
          }}
        >
          <div data-reveal="" className="kicker" style={{ gridColumn: '1 / span 12' }}>
            {trust.kicker}
          </div>
          <div
            data-reveal=""
            style={{
              gridColumn: '1 / span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
              gap: '32px 24px',
              marginTop: 12,
            }}
          >
            {trust.stats.map((stat) => (
              <div key={stat.value + stat.text}>
                <div
                  style={{
                    fontSize: 'clamp(2rem,3.6vw,3.6rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    color: 'var(--color-accent)',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, marginTop: 10, maxWidth: '22ch' }}>
                  {stat.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
            marginTop: 'clamp(40px,8vh,96px)',
            alignItems: 'center',
          }}
        >
          <figure
            className="grayscale framed col-figure"
            data-parallax="0.06"
            style={{
              margin: 0,
              aspectRatio: '4/3',
              minWidth: 0,
            }}
          >
            <Image
              src={trust.image.src}
              alt={trust.image.alt}
              width={trust.image.width}
              height={trust.image.height}
              sizes="(max-width: 900px) 100vw, 58vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </figure>
          <div
            data-reveal=""
            className="col-figure-aside"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              minWidth: 0,
            }}
          >
            <div className="hr" style={{ margin: 0, background: 'var(--color-accent)' }} />
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(1.3rem,2vw,2rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                textWrap: 'balance',
              }}
            >
              {trust.quote}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.55,
                maxWidth: '38ch',
              }}
            >
              {trust.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────────────── */}
      <section
        aria-label="Get started"
        style={{
          marginTop: 'clamp(64px,12vh,160px)',
          background: 'var(--color-accent)',
          color: '#0a1020',
          padding: 'clamp(72px,14vh,180px) var(--page-x)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: 24,
            alignItems: 'end',
          }}
        >
          <Heading
            data-reveal=""
            heading={cta.heading}
            breakBefore
            emStyle={{ color: '#0a1020' }}
            style={{
              gridColumn: '1 / span 12',
              margin: 0,
              fontSize: 'clamp(2.8rem,8vw,9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              textWrap: 'balance',
            }}
          />
          <CtaLinks
            links={cta.links}
            onAccent
            style={{ gridColumn: '1 / span 12', marginTop: 32 }}
          />
        </div>
      </section>
    </main>
  )
}
