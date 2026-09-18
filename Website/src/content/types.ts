/**
 * The shape of everything editable on the site. `src/content/defaults.ts`
 * holds the launch copy in this shape; Sanity documents override it field by
 * field in `src/sanity/lib/content.ts`, so the site renders correctly even
 * before anything has been entered in the Studio.
 */

export type Img = {
  src: string
  alt: string
  width: number
  height: number
}

export type Link = {
  label: string
  href: string
}

export type CtaLink = Link & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

/** A heading split so the middle phrase can render in italic gold. */
export type SplitHeading = {
  lead: string
  em: string
  rest: string
}

export type SiteSettings = {
  brandPrimary: string
  brandSecondary: string
  logo: Img
  tagline: string
  primaryNav: Link[]
  headerCta: Link
  footerSiteLinks: Link[]
  footerPortalLinks: Link[]
  secureNote: string
  copyright: string
  conciergeEmail: string
  contactNote: string
}

export type HomePathway = {
  eyebrow: string
  titleTop: string
  titleBottom: string
  body: string
  linkLabel: string
  href: string
  image: Img
}

export type ProcessColumn = {
  label: string
  steps: { title: string; detail: string }[]
}

export type HomeContent = {
  hero: {
    notes: string[]
    heading: SplitHeading
    image: Img
    panelText: string
    primaryCta: Link
    secondaryCta: Link
  }
  intro: {
    kicker: string
    heading: SplitHeading
    body: string
  }
  pathways: {
    heading: string
    note: string
    items: HomePathway[]
  }
  philosophy: {
    kicker: string
    heading: SplitHeading
    image: Img
    lead: string
    principles: { term: string; text: string }[]
  }
  process: {
    kicker: string
    heading: SplitHeading
    columns: ProcessColumn[]
  }
  trust: {
    kicker: string
    stats: { value: string; text: string }[]
    image: Img
    quote: string
    body: string
  }
  cta: {
    heading: SplitHeading
    links: CtaLink[]
  }
}

export type AboutContent = {
  kicker: string
  heading: SplitHeading
  image: Img
  aside: string
  values: { kicker: string; title: string; body: string }[]
  closing: {
    heading: SplitHeading
    links: CtaLink[]
  }
}

export type PaymentsContent = {
  kicker: string
  heading: SplitHeading
  intro: string
  options: {
    eyebrow: string
    title: string
    bullets: string[]
    linkLabel: string
    href: string
    image: Img
    variant: 'primary' | 'secondary'
  }[]
}

export type HomeownerContent = {
  kicker: string
  crossLink: Link
  heading: SplitHeading
  steps: { title: string; detail: string }[]
  step1: { heading: string; submitLabel: string }
  step2: {
    heading: string
    pendingNote: string
    integrationNote: string
    continueLabel: string
  }
  step3: {
    heading: string
    body: string
    cardKicker: string
    cardTitle: string
    cardBody: string
    continueLabel: string
    integrationNote: string
    /** When set, the final button becomes a live link to the payment partner. */
    paymentUrl?: string
  }
}

export type TitleFormField = {
  id: string
  label: string
  kind: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea'
  placeholder?: string
  options?: string[]
  full?: boolean
  required?: boolean
}

export type TitleCompanyContent = {
  kicker: string
  crossLink: Link
  heading: SplitHeading
  aside: string
  requestTypes: { term: string; text: string }[]
  schemaNote: string
  groups: { label: string; fields: TitleFormField[] }[]
  submitLabel: string
  submitNote: string
  sent: { heading: string; body: string; resetLabel: string }
}

export type ContactContent = {
  kicker: string
  heading: SplitHeading
  aside: string
  directLabel: string
  directNote: string
  audiences: {
    value: string
    label: string
    hint: string
    propertyLabel: string
  }[]
  submitLabel: string
  sentMessage: string
}

export type SiteContent = {
  settings: SiteSettings
  home: HomeContent
  about: AboutContent
  payments: PaymentsContent
  homeowner: HomeownerContent
  titleCompany: TitleCompanyContent
  contact: ContactContent
}
