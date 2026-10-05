import type { TitleCompanyContent } from '@/content/types'

/**
 * The closing-packet fee card. The button opens the Stripe Payment Link in a
 * new tab once `payment.url` is set; until then it stays disabled.
 */
export function ClosingPacketPayment({
  payment,
}: {
  payment: TitleCompanyContent['payment']
}) {
  return (
    <div
      className="card"
      style={{
        gap: 12,
        padding: 24,
        borderTop: '2px solid var(--color-accent)',
      }}
    >
      <div className="card-kicker">{payment.kicker}</div>
      <div className="card-title">{payment.title}</div>
      <p className="card-body">{payment.body}</p>
      {payment.url ? (
        <a
          className="btn btn-primary"
          href={payment.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            padding: '14px 22px',
          }}
        >
          {payment.linkLabel}
        </a>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-primary"
            disabled
            style={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              padding: '14px 22px',
            }}
          >
            {payment.linkLabel}
          </button>
          <span style={{ fontSize: 12, opacity: 0.7 }}>{payment.pendingNote}</span>
        </>
      )}
    </div>
  )
}
