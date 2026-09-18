'use client'

import { useState } from 'react'

import type { ContactContent } from '@/content/types'

/**
 * Concierge contact form. Picking an audience re-labels the property field and
 * swaps the routing hint. Submission is not yet wired to an endpoint.
 */
export function ContactForm({ content }: { content: ContactContent }) {
  const [who, setWho] = useState(content.audiences[0]?.value ?? 'homeowner')
  const [status, setStatus] = useState('')

  const audience =
    content.audiences.find((item) => item.value === who) ?? content.audiences[0]

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setStatus(content.sentMessage)
      }}
      className="col-main"
      style={{
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        borderTop: '2px solid var(--color-accent)',
        paddingTop: 28,
        maxWidth: 640,
      }}
    >
      <div className="field">
        <label>I am a</label>
        <div className="seg" role="radiogroup" aria-label="I am a">
          {content.audiences.map((item) => (
            <label key={item.value} className="seg-opt">
              <input
                type="radio"
                name="who"
                value={item.value}
                checked={who === item.value}
                onChange={(event) => {
                  setWho(event.target.value)
                  setStatus('')
                }}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13, fontWeight: 300, opacity: 0.8 }}>
        {audience?.hint}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
          gap: 20,
        }}
      >
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input
            className="input"
            id="c-name"
            name="name"
            required
            style={{ minHeight: 46, fontSize: 15 }}
          />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input
            className="input"
            id="c-email"
            name="email"
            type="email"
            required
            style={{ minHeight: 46, fontSize: 15 }}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-property">{audience?.propertyLabel}</label>
        <input
          className="input"
          id="c-property"
          name="property"
          style={{ minHeight: 46, fontSize: 15 }}
        />
      </div>

      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea
          className="input"
          id="c-msg"
          name="message"
          required
          style={{ fontSize: 15, minHeight: 140 }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          style={{ justifyContent: 'flex-start', padding: '14px 22px' }}
        >
          {content.submitLabel}
        </button>
        <span role="status" style={{ fontSize: 13, opacity: 0.75 }}>
          {status}
        </span>
      </div>
    </form>
  )
}
