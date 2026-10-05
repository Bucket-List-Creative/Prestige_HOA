'use client'

import { useEffect, useRef } from 'react'

import { HONEYPOT } from '@/lib/form-state'

type HCaptchaApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi
    __onHCaptchaLoad?: () => void
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

let loader: Promise<HCaptchaApi> | null = null

/** Load the hCaptcha script once per page, however many forms ask for it. */
function loadHCaptcha() {
  if (window.hcaptcha) return Promise.resolve(window.hcaptcha)
  loader ??= new Promise((resolve, reject) => {
    window.__onHCaptchaLoad = () => resolve(window.hcaptcha!)
    const script = document.createElement('script')
    script.src =
      'https://js.hcaptcha.com/1/api.js?render=explicit&onload=__onHCaptchaLoad'
    script.async = true
    script.onerror = () => {
      loader = null
      reject(new Error('hCaptcha failed to load'))
    }
    document.head.appendChild(script)
  })
  return loader
}

/**
 * hCaptcha widget, the same provider as the Jotform forms. It writes its token
 * into a hidden `h-captcha-response` field inside the surrounding form, which
 * the Server Action verifies. Bumping `resetKey` clears it for a new attempt.
 * Renders nothing until `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` is set.
 */
export function Captcha({ resetKey = 0 }: { resetKey?: number }) {
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false
    loadHCaptcha()
      .then((api) => {
        if (cancelled || !container.current) return
        widget.current = api.render(container.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
        })
      })
      .catch((error) => console.error(error))
    return () => {
      cancelled = true
      if (widget.current !== null) window.hcaptcha?.remove(widget.current)
      widget.current = null
    }
  }, [])

  useEffect(() => {
    if (resetKey && widget.current !== null) window.hcaptcha?.reset(widget.current)
  }, [resetKey])

  if (!SITE_KEY) return null
  return <div ref={container} style={{ minHeight: 78 }} />
}

/** Off-screen field for bots to fill. Hidden from people and screen readers. */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label htmlFor={HONEYPOT}>Leave this field empty</label>
      <input id={HONEYPOT} name={HONEYPOT} tabIndex={-1} autoComplete="off" />
    </div>
  )
}
