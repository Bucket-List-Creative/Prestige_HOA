import type { CSSProperties, HTMLAttributes } from 'react'

import type { SplitHeading } from '@/content/types'

type Props = HTMLAttributes<HTMLHeadingElement> & {
  heading: SplitHeading
  /** Rendered element — hero headings are h1, section headings h2. */
  as?: 'h1' | 'h2' | 'h3' | 'span'
  /** Break onto a new line before the emphasised phrase. */
  breakBefore?: boolean
  emStyle?: CSSProperties
}

/**
 * The site's signature heading: a bold phrase with one italic gold word or
 * clause set inside it.
 */
export function Heading({
  heading,
  as: Tag = 'h2',
  breakBefore = false,
  emStyle,
  ...rest
}: Props) {
  const { lead, em, rest: tail } = heading
  return (
    <Tag {...rest}>
      {lead}
      {breakBefore ? <br /> : lead ? ' ' : null}
      {em ? (
        <em className="em-accent" style={emStyle}>
          {em}
        </em>
      ) : null}
      {tail ? ` ${tail}` : null}
    </Tag>
  )
}
