'use client'

import { useState } from 'react'

import type { HomeownerContent } from '@/content/types'

type Details = { address: string; account: string; email: string }

/**
 * The three-step homeowner payment flow. Steps 2 and 3 are deliberately
 * unconnected: the assessment figures come from the account system and the
 * final button activates once `step3.paymentUrl` is set in the Studio.
 */
export function HomeownerFlow({ content }: { content: HomeownerContent }) {
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState<Details>({
    address: '',
    account: '',
    email: '',
  })

  const submitStep1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setDetails({
      address: String(data.get('address') ?? ''),
      account: String(data.get('account') ?? ''),
      email: String(data.get('email') ?? ''),
    })
    setStep(2)
  }

  return (
    <section
      style={{
        padding:
          'clamp(32px,6vh,64px) var(--page-x) clamp(64px,12vh,160px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <ol
        aria-label="Progress"
        className="col-rail"
        style={{
          minWidth: 0,
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          borderTop: '2px solid var(--color-accent)',
        }}
      >
        {content.steps.map((item, i) => (
          <li
            key={item.title}
            aria-current={step === i + 1 ? 'step' : undefined}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: 12,
              padding: '16px 0',
              borderBottom: '1px solid var(--color-divider)',
              opacity: step === i + 1 ? 1 : 0.4,
              transition: 'opacity .4s',
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.03em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <span style={{ display: 'block', fontWeight: 600 }}>
                {item.title}
              </span>
              <span style={{ fontSize: 13, fontWeight: 300 }}>{item.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div
        className="col-main"
        style={{
          minWidth: 0,
          borderTop: '2px solid var(--color-accent)',
          paddingTop: 28,
        }}
      >
        {step === 1 ? (
          <form
            onSubmit={submitStep1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 560,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(1.6rem,2.6vw,2.4rem)',
                letterSpacing: '-0.025em',
                fontWeight: 600,
              }}
            >
              {content.step1.heading}
            </h2>
            <div className="field">
              <label htmlFor="ho-address">Property address</label>
              <input
                className="input"
                id="ho-address"
                name="address"
                placeholder="123 Meridian Lane"
                autoComplete="street-address"
                required
                defaultValue={details.address}
                style={{ minHeight: 46, fontSize: 15 }}
              />
            </div>
            <div className="field">
              <label htmlFor="ho-account">
                Account number <span style={{ opacity: 0.6 }}>(optional)</span>
              </label>
              <input
                className="input"
                id="ho-account"
                name="account"
                placeholder="Found on your annual statement"
                defaultValue={details.account}
                style={{ minHeight: 46, fontSize: 15 }}
              />
            </div>
            <div className="field">
              <label htmlFor="ho-email">Email for receipt</label>
              <input
                className="input"
                id="ho-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                defaultValue={details.email}
                style={{ minHeight: 46, fontSize: 15 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
              >
                {content.step1.submitLabel}
              </button>
            </div>
          </form>
        ) : null}

        {step === 2 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 640,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(1.6rem,2.6vw,2.4rem)',
                letterSpacing: '-0.025em',
                fontWeight: 600,
              }}
            >
              {content.step2.heading}
            </h2>
            <table className="table" aria-label="Assessment summary">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Property</td>
                  <td>{details.address || 'Not provided'}</td>
                </tr>
                <tr>
                  <td>Account</td>
                  <td>{details.account || 'Not provided'}</td>
                </tr>
                <tr>
                  <td>Assessment period</td>
                  <td style={{ opacity: 0.6 }}>{content.step2.pendingNote}</td>
                </tr>
                <tr>
                  <td>Amount due</td>
                  <td style={{ opacity: 0.6 }}>{content.step2.pendingNote}</td>
                </tr>
              </tbody>
            </table>
            <span className="tag tag-outline" style={{ alignSelf: 'flex-start' }}>
              {content.step2.integrationNote}
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep(3)}
                style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
              >
                {content.step2.continueLabel}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
                style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
              >
                Back
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 640,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(1.6rem,2.6vw,2.4rem)',
                letterSpacing: '-0.025em',
                fontWeight: 600,
              }}
            >
              {content.step3.heading}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 300,
                lineHeight: 1.55,
              }}
            >
              {content.step3.body}{' '}
              <strong style={{ fontWeight: 600 }}>
                {details.email || 'your email'}
              </strong>
              .
            </p>
            <div
              className="card"
              style={{
                gap: 12,
                padding: 24,
                borderTop: '2px solid var(--color-accent)',
              }}
            >
              <div className="card-kicker">{content.step3.cardKicker}</div>
              <div className="card-title">{content.step3.cardTitle}</div>
              <p className="card-body">{content.step3.cardBody}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {content.step3.paymentUrl ? (
                  <a
                    className="btn btn-primary"
                    href={content.step3.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
                  >
                    {content.step3.continueLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled
                    style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
                  >
                    {content.step3.continueLabel}
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(2)}
                  style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
                >
                  Back
                </button>
              </div>
            </div>
            <span className="tag tag-outline" style={{ alignSelf: 'flex-start' }}>
              {content.step3.integrationNote}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  )
}
