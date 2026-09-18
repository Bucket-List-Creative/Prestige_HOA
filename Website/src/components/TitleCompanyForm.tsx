'use client'

import { useState } from 'react'

import type { TitleCompanyContent, TitleFormField } from '@/content/types'

function Field({ field }: { field: TitleFormField }) {
  const shared = {
    className: 'input',
    id: field.id,
    name: field.id,
    required: field.required,
  }

  return (
    <div
      className="field"
      style={{
        gridColumn: field.full ? 'span 12' : 'span 6',
        minWidth: 0,
      }}
    >
      <label htmlFor={field.id}>{field.label}</label>
      {field.kind === 'select' ? (
        <select {...shared} style={{ minHeight: 46, fontSize: 15 }}>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.kind === 'textarea' ? (
        <textarea
          {...shared}
          placeholder={field.placeholder}
          style={{ fontSize: 15 }}
        />
      ) : (
        <input
          {...shared}
          type={field.kind}
          placeholder={field.placeholder}
          style={{ minHeight: 46, fontSize: 15 }}
        />
      )}
    </div>
  )
}

/**
 * The closing-request form. Field groups come from Sanity, so the schema can
 * change without a deploy. Submission is not yet wired to an endpoint.
 */
export function TitleCompanyForm({
  content,
}: {
  content: TitleCompanyContent
}) {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div
        className="col-main"
        style={{
          minWidth: 0,
          borderTop: '2px solid var(--color-accent)',
          padding: '28px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
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
          {content.sent.heading}
        </h2>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 300 }}>
          {content.sent.body}
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setSent(false)}
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            padding: '12px 18px',
          }}
        >
          {content.sent.resetLabel}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
      className="col-main"
      style={{
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        borderTop: '2px solid var(--color-accent)',
      }}
    >
      {content.groups.map((group) => (
        <fieldset
          key={group.label}
          style={{
            border: 0,
            margin: 0,
            padding: '28px 0',
            borderBottom: '1px solid var(--color-divider)',
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            gap: '20px 24px',
          }}
        >
          <legend
            className="eyebrow"
            style={{ padding: 0, margin: '0 0 4px', gridColumn: '1 / span 12' }}
          >
            {group.label}
          </legend>
          {group.fields.map((field) => (
            <Field key={field.id} field={field} />
          ))}
        </fieldset>
      ))}
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingTop: 28,
        }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
        >
          {content.submitLabel}
        </button>
        <span style={{ fontSize: 12, opacity: 0.7 }}>{content.submitNote}</span>
      </div>
    </form>
  )
}
