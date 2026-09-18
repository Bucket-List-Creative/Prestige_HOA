'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'

import type { Img } from '@/content/types'

export type SplitPanel = {
  key: string
  href: string
  image: Img
  /** Gradient over the photograph — the two screens use slightly different ones. */
  overlay: string
  children: ReactNode
  /** Panel content sits at the bottom, or spreads top-and-bottom. */
  justify: 'flex-end' | 'space-between'
}

/**
 * The paired photographic panels. On a fine pointer above 900px the hovered
 * panel grows and its photograph scales, exactly as in the original.
 */
export function SplitPanels({
  panels,
  minHeight,
  className,
}: {
  panels: SplitPanel[]
  minHeight: string
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  const setHover = (hovered: HTMLElement | null) => {
    const container = root.current
    if (!container || window.innerWidth < 900) return
    for (const side of Array.from(
      container.querySelectorAll<HTMLElement>('[data-split-side]')
    )) {
      side.style.flexGrow = hovered
        ? side === hovered
          ? '1.6'
          : '0.7'
        : '1'
      const figure = side.querySelector<HTMLElement>('[data-split-img]')
      if (figure) {
        figure.style.transform =
          hovered && side === hovered ? 'scale(1.05)' : 'none'
      }
    }
  }

  return (
    <div
      ref={root}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderTop: '2px solid var(--color-accent)',
        borderBottom: '2px solid var(--color-accent)',
      }}
    >
      {panels.map((panel, i) => (
        <Link
          key={panel.key}
          href={panel.href}
          data-split-side=""
          onMouseEnter={(e) => setHover(e.currentTarget)}
          onMouseLeave={() => setHover(null)}
          style={{
            flex: '1 1 min(100%,420px)',
            position: 'relative',
            minHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: panel.justify,
            padding: 32,
            color: 'var(--color-text)',
            overflow: 'hidden',
            transition: 'flex-grow .7s cubic-bezier(.2,.7,.2,1)',
            borderRight:
              i < panels.length - 1 ? '2px solid var(--color-accent)' : undefined,
          }}
        >
          <figure
            className="grayscale"
            data-split-img=""
            style={{
              position: 'absolute',
              inset: 0,
              margin: 0,
              transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)',
            }}
          >
            <Image
              src={panel.image.src}
              alt={panel.image.alt}
              width={panel.image.width}
              height={panel.image.height}
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </figure>
          <div
            style={{ position: 'absolute', inset: 0, background: panel.overlay }}
          />
          {panel.children}
        </Link>
      ))}
    </div>
  )
}
