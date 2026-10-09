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

/** Search and sharing metadata. Empty strings fall back to the page's copy. */
export type Seo = {
  title: string
  description: string
  image?: Img
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
  phone: string
  /** One line per row, e.g. name, PO box, city/state/ZIP. */
  mailingAddress: string
  contactNote: string
  footerHeadings: { site: string; portals: string; contact: string; secure: string }
  formMessages: {
    required: string
    invalidEmail: string
    captcha: string
    failed: string
  }
  notFound: {
    kicker: string
    heading: SplitHeading
    body: string
    link: Link
  }
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
  seo: Seo
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
  seo: Seo
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
  seo: Seo
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
  seo: Seo
  kicker: string
  crossLink: Link
  heading: SplitHeading
  aside: string
  requestTypes: { term: string; text: string }[]
  schemaNote: string
  payment: {
    kicker: string
    title: string
    body: string
    linkLabel: string
    pendingNote: string
    /** A Stripe Payment Link (https://buy.stripe.com/…). The button is disabled until set. */
    url?: string
  }
  groups: { label: string; fields: TitleFormField[] }[]
  submitLabel: string
  submitNote: string
  sent: { heading: string; body: string; resetLabel: string }
}

export type ContactContent = {
  seo: Seo
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
  fieldLabels: { who: string; name: string; email: string; message: string }
  submitLabel: string
  sentMessage: string
}

export type SiteContent = {
  settings: SiteSettings
  home: HomeContent
  about: AboutContent
  payments: PaymentsContent
  titleCompany: TitleCompanyContent
  contact: ContactContent
}
