'use client'

import { useEffect } from 'react'

/**
 * Scroll-reveal plus the pointer/scroll parallax from the original page.
 * Mounted once in the root layout; it claims any `[data-reveal]`,
 * `[data-parallax]` and hero elements present on the current route.
 *
 * Elements are only hidden once this runs, so the page stays readable when
 * JavaScript is unavailable.
 */
export function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    )

    let observer: IntersectionObserver | undefined

    if (!reduced) {
      for (const el of reveals) {
        if (el.dataset.revealVisible === 'true') continue
        if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
          el.dataset.revealArmed = 'true'
        }
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            el.dataset.revealVisible = 'true'
            observer?.unobserve(el)
          }
        },
        { threshold: 0.12 }
      )
      for (const el of reveals) observer.observe(el)
    }

    if (reduced) return () => observer?.disconnect()

    const fine =
      window.matchMedia('(pointer: fine)').matches && window.innerWidth > 900

    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    let dirty = true
    let raf: number | null = null

    const tick = () => {
      raf = null
      const y = window.scrollY
      const vh = window.innerHeight
      mx += (tx - mx) * 0.06
      my += (ty - my) * 0.06

      const title = document.querySelector<HTMLElement>('[data-hero-title]')
      const img = document.querySelector<HTMLElement>('[data-hero-img]')
      if (title && img) {
        const p = Math.min(1, y / vh)
        title.style.transform = `translate3d(${-mx * 0.4}px, ${-y * 0.22 + my * 0.3}px, 0)`
        title.style.opacity = String(Math.max(0, 1 - p * 1.1))
        img.style.transform = `translate3d(0, ${y * 0.3}px, 0)`
        img.querySelectorAll<HTMLElement>('[data-layer]').forEach((layer) => {
          const d = Number.parseFloat(layer.dataset.layer ?? '0')
          const m = Number.parseFloat(layer.dataset.mouse ?? '1')
          layer.style.transform = `translate3d(${mx * m}px, ${-y * d * 0.35 + my * m}px, 0) scale(${1 + p * d * 0.12})`
        })
      }

      document
        .querySelectorAll<HTMLElement>('[data-parallax]')
        .forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.bottom < 0 || r.top > vh) return
          const offset =
            (r.top + r.height / 2 - vh / 2) *
            Number.parseFloat(el.dataset.parallax ?? '0')
          el.style.transform = `translate3d(0, ${offset}px, 0)`
        })

      if (Math.abs(tx - mx) > 0.1 || Math.abs(ty - my) > 0.1 || dirty) {
        dirty = false
        raf = requestAnimationFrame(tick)
      }
    }

    const kick = () => {
      dirty = true
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 24
      ty = (e.clientY / window.innerHeight - 0.5) * 16
      kick()
    }

    window.addEventListener('scroll', kick, { passive: true })
    if (fine) window.addEventListener('mousemove', onMouseMove, { passive: true })
    kick()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', kick)
      window.removeEventListener('mousemove', onMouseMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
