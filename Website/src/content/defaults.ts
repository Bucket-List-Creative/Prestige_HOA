import type {
  AboutContent,
  ContactContent,
  HomeContent,
  HomeownerContent,
  Img,
  PaymentsContent,
  SiteContent,
  SiteSettings,
  TitleCompanyContent,
} from './types'

const images = {
  logo: {
    src: '/images/logo.png',
    alt: 'Prestige HOA',
    width: 1024,
    height: 1024,
  },
  hero: {
    src: '/images/hero-residence.jpg',
    alt: 'Modern residence at dusk with warm interior light',
    width: 2200,
    height: 1467,
  },
  homeowner: {
    src: '/images/path-homeowner.jpg',
    alt: 'Luxury residence exterior',
    width: 1600,
    height: 1061,
  },
  titleCompany: {
    src: '/images/path-title-company.jpg',
    alt: 'Architectural facade detail',
    width: 1600,
    height: 1067,
  },
  philosophy: {
    src: '/images/philosophy.jpg',
    alt: 'Residential architecture with landscaped grounds',
    width: 2000,
    height: 1360,
  },
  trust: {
    src: '/images/trust-detail.jpg',
    alt: 'Residential architectural detail',
    width: 1600,
    height: 1067,
  },
  about: {
    src: '/images/about-grounds.jpg',
    alt: 'Residence and landscaped grounds',
    width: 2000,
    height: 1333,
  },
} satisfies Record<string, Img>

const settings: SiteSettings = {
  brandPrimary: 'Prestige',
  brandSecondary: 'HOA',
  logo: images.logo,
  tagline: 'Exceptional communities. Personalized care.',
  primaryNav: [
    { label: 'About', href: '/about' },
    { label: 'Payments', href: '/payments' },
    { label: 'Title Companies', href: '/title-company' },
    { label: 'Concierge', href: '/contact' },
  ],
  headerCta: { label: 'Make a Payment', href: '/payments/homeowner' },
  footerSiteLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Payments', href: '/payments' },
    { label: 'Concierge Support', href: '/contact' },
  ],
  footerPortalLinks: [
    { label: 'Homeowner Payment', href: '/payments/homeowner' },
    { label: 'Title Company Portal', href: '/title-company' },
  ],
  secureNote:
    'Payments processed by an encrypted payment partner. Card details are never stored by Prestige HOA.',
  copyright: '© 2026 Prestige HOA',
  conciergeEmail: 'concierge@prestigehoa.example',
  contactNote: 'Phone and mailing address to be supplied',
}

const home: HomeContent = {
  hero: {
    notes: [
      'Premium HOA management.\nConcierge-level service.',
      'Established, private,\nand secure.',
      'For homeowners\nand title companies.',
    ],
    heading: { lead: 'Your community,', em: 'beautifully', rest: 'managed.' },
    image: images.hero,
    panelText:
      'Dues, balances and closing requests, handled with the calm of a private concierge and the security of modern payment technology.',
    primaryCta: { label: "I'm a homeowner", href: '/payments/homeowner' },
    secondaryCta: { label: "I'm a title company", href: '/title-company' },
  },
  intro: {
    kicker: 'A different kind of association',
    heading: { lead: 'Where every detail is', em: 'cared for.', rest: '' },
    body: 'Prestige HOA manages homeowner associations the way a great concierge runs a residence: quietly, precisely, and always one step ahead. Payments are simple. Questions are answered. Records are exact.',
  },
  pathways: {
    heading: 'How can we help?',
    note: 'Choose your path',
    items: [
      {
        eyebrow: 'Homeowner',
        titleTop: 'Pay your',
        titleBottom: 'HOA dues.',
        body: 'Annual assessments, account balance, payment history.',
        linkLabel: 'Make an HOA payment',
        href: '/payments/homeowner',
        image: images.homeowner,
      },
      {
        eyebrow: 'Title Company',
        titleTop: 'Request HOA',
        titleBottom: 'information.',
        body: 'Balances, status letters, and closing documentation.',
        linkLabel: 'Enter the title company portal',
        href: '/title-company',
        image: images.titleCompany,
      },
    ],
  },
  philosophy: {
    kicker: 'Our philosophy',
    heading: { lead: 'Management,', em: 'without', rest: 'the friction.' },
    image: images.philosophy,
    lead: 'Most association management feels like paperwork. Ours feels like service. Every touchpoint, from an annual assessment to a closing-day balance letter, is designed to be understood in one glance and completed in one sitting.',
    principles: [
      {
        term: 'Stewardship.',
        text: 'Reserves, records and rules kept in exact order.',
      },
      { term: 'Clarity.', text: 'One statement, one number, no surprises.' },
      {
        term: 'Responsiveness.',
        text: 'A named person answers, and answers quickly.',
      },
    ],
  },
  process: {
    kicker: 'Effortless by design',
    heading: { lead: 'Three steps.', em: 'Either', rest: 'path.' },
    columns: [
      {
        label: 'Homeowners',
        steps: [
          {
            title: 'Identify your property',
            detail: 'Address or account number.',
          },
          { title: 'Review', detail: 'Your assessment, itemized and clear.' },
          {
            title: 'Pay securely',
            detail: 'Through our encrypted payment partner.',
          },
        ],
      },
      {
        label: 'Title companies',
        steps: [
          {
            title: 'Submit the property',
            detail: 'Address, seller, and closing date.',
          },
          {
            title: 'Request information',
            detail: 'Balance, status, or full closing packet.',
          },
          {
            title: 'Receive the HOA response',
            detail: 'Delivered to your contact on file.',
          },
        ],
      },
    ],
  },
  trust: {
    kicker: 'Built on trust',
    stats: [
      {
        value: '256-bit',
        text: 'Encryption on every payment. Card details never touch our servers.',
      },
      {
        value: '1',
        text: 'Statement. One clear number for every property, every year.',
      },
      {
        value: '1–2',
        text: 'Business days. Target response for title-company information requests.',
      },
      {
        value: '100%',
        text: 'Community-first. Every decision is measured against the neighborhood it serves.',
      },
    ],
    image: images.trust,
    quote:
      'Secure payments. Clear communication. Responsive assistance.',
    body: "Payments run through an established banking relationship and an encrypted payment partner. Records are maintained to closing-grade accuracy, because a title company's deadline is a homeowner's move-in day.",
  },
  cta: {
    heading: {
      lead: 'Everything your community needs.',
      em: 'One',
      rest: 'refined experience.',
    },
    links: [
      { label: 'Make a Payment', href: '/payments/homeowner', variant: 'primary' },
      { label: 'Title Company Portal', href: '/title-company', variant: 'secondary' },
      { label: 'Contact Us', href: '/contact', variant: 'ghost' },
    ],
  },
}

const about: AboutContent = {
  kicker: 'About Prestige HOA',
  heading: {
    lead: 'Better management creates',
    em: 'better',
    rest: 'communities.',
  },
  image: images.about,
  aside:
    'An association is a shared home. We manage it as stewards, not administrators, keeping reserves sound, records exact, and every homeowner informed before they have to ask.',
  values: [
    {
      kicker: 'Community',
      title: 'Neighborhood first.',
      body: 'Every policy is measured against the people who live under it.',
    },
    {
      kicker: 'Stewardship',
      title: 'Exact records.',
      body: 'Reserves, assessments and governing documents kept closing-grade accurate.',
    },
    {
      kicker: 'Clarity',
      title: 'One clear number.',
      body: 'Statements a homeowner reads once and understands completely.',
    },
    {
      kicker: 'Responsiveness',
      title: 'A named person.',
      body: 'Concierge support that answers, follows through, and closes the loop.',
    },
  ],
  closing: {
    heading: {
      lead: 'Prestige when you arrive.',
      em: 'Clarity',
      rest: 'within seconds.',
    },
    links: [
      { label: 'Go to payments', href: '/payments', variant: 'primary' },
      { label: 'Concierge support', href: '/contact', variant: 'secondary' },
    ],
  },
}

const payments: PaymentsContent = {
  kicker: 'Payments',
  heading: { lead: 'Choose your', em: 'experience.', rest: '' },
  intro:
    'Homeowners and title companies have different needs. Each has its own path. Nothing is mixed, nothing is missed.',
  options: [
    {
      eyebrow: 'Homeowner',
      title: 'Make an HOA payment.',
      bullets: [
        'Pay annual HOA dues',
        'Homeowner payment options',
        'Property and account information',
      ],
      linkLabel: 'Continue as Homeowner',
      href: '/payments/homeowner',
      image: images.homeowner,
      variant: 'primary',
    },
    {
      eyebrow: 'Title Company',
      title: 'Title company portal.',
      bullets: [
        'Request HOA information',
        'Submit title and property details',
        'Request balance or status',
      ],
      linkLabel: 'Enter Title Company Portal',
      href: '/title-company',
      image: images.titleCompany,
      variant: 'secondary',
    },
  ],
}

const homeowner: HomeownerContent = {
  kicker: 'Homeowner · Payment',
  crossLink: {
    label: 'Not a homeowner? Title company portal →',
    href: '/title-company',
  },
  heading: { lead: 'Pay your', em: 'dues.', rest: '' },
  steps: [
    { title: 'Property / Account', detail: 'Find your property.' },
    { title: 'Review', detail: 'Confirm the assessment.' },
    { title: 'Secure Payment', detail: 'Complete with our payment partner.' },
  ],
  step1: {
    heading: 'Identify your property.',
    submitLabel: 'Continue to review',
  },
  step2: {
    heading: 'Review your assessment.',
    pendingNote: 'Loaded from account system once connected',
    integrationNote: 'Integration point: AppFolio / account system (pending)',
    continueLabel: 'Continue to secure payment',
  },
  step3: {
    heading: 'Complete your payment securely.',
    body: "You'll finish on our encrypted payment partner's page. Prestige HOA never stores card or bank details. Your receipt arrives at",
    cardKicker: 'Secure handoff',
    cardTitle: 'Redirecting to payment partner',
    cardBody:
      'Stripe or AppFolio payment destination (URL to be supplied). This button will open the approved payment page in a new tab.',
    continueLabel: 'Continue to secure payment ↗',
    integrationNote: 'Integration point: Stripe / AppFolio (pending URL)',
  },
}

const titleCompany: TitleCompanyContent = {
  kicker: 'Title Company · Portal',
  crossLink: {
    label: 'Homeowner? Make a payment →',
    href: '/payments/homeowner',
  },
  heading: { lead: 'Request HOA', em: 'information.', rest: '' },
  aside:
    'Submit the property and closing details below. Balance letters, status confirmations and closing documentation are returned to the contact on file, target within 24 hours.',
  requestTypes: [
    { term: 'Balance request', text: 'Payoff / outstanding dues' },
    { term: 'Status letter', text: 'Good-standing confirmation' },
    { term: 'Closing packet', text: 'Full documentation' },
  ],
  schemaNote: 'Field schema configurable, pending client confirmation',
  groups: [
    {
      label: 'Title company',
      fields: [
        {
          id: 'tc-company',
          label: 'Company name',
          kind: 'text',
          placeholder: 'Company',
          required: true,
        },
        {
          id: 'tc-file',
          label: 'File / escrow number',
          kind: 'text',
          placeholder: 'Optional',
        },
      ],
    },
    {
      label: 'Contact',
      fields: [
        {
          id: 'tc-contact',
          label: 'Contact name',
          kind: 'text',
          placeholder: 'Full name',
          required: true,
        },
        {
          id: 'tc-email',
          label: 'Email',
          kind: 'email',
          placeholder: 'name@company.com',
          required: true,
        },
        {
          id: 'tc-phone',
          label: 'Phone',
          kind: 'tel',
          placeholder: '(000) 000-0000',
        },
      ],
    },
    {
      label: 'Property',
      fields: [
        {
          id: 'tc-address',
          label: 'Property address',
          kind: 'text',
          placeholder: 'Street, city, state, ZIP',
          full: true,
          required: true,
        },
        {
          id: 'tc-owner',
          label: 'Owner / seller name',
          kind: 'text',
          placeholder: 'As recorded',
        },
        {
          id: 'tc-buyer',
          label: 'Buyer name',
          kind: 'text',
          placeholder: 'Optional',
        },
      ],
    },
    {
      label: 'Closing',
      fields: [
        { id: 'tc-closing', label: 'Closing date', kind: 'date' },
        {
          id: 'tc-request',
          label: 'Request type',
          kind: 'select',
          options: [
            'Balance / payoff request',
            'Status letter',
            'Full closing packet',
            'Other',
          ],
        },
      ],
    },
    {
      label: 'Additional notes',
      fields: [
        {
          id: 'tc-notes',
          label: 'Notes',
          kind: 'textarea',
          placeholder: 'Anything that helps us respond quickly',
          full: true,
        },
      ],
    },
  ],
  submitLabel: 'Submit request',
  submitNote: 'No payment information is collected here.',
  sent: {
    heading: 'Request received.',
    body: 'A confirmation will follow to the contact provided. Submission endpoint to be connected.',
    resetLabel: 'Submit another request',
  },
}

const contact: ContactContent = {
  kicker: 'Concierge Support',
  heading: { lead: 'How may we', em: 'help?', rest: '' },
  aside:
    "A named member of our team reads every message. Tell us who you are and we'll route it to the right desk.",
  directLabel: 'Direct',
  directNote: 'Phone and mailing address to be supplied',
  audiences: [
    {
      value: 'homeowner',
      label: 'Homeowner',
      hint: 'Routed to homeowner services: dues, statements, account questions.',
      propertyLabel: 'Property address',
    },
    {
      value: 'title',
      label: 'Title Company',
      hint: 'Routed to the title desk: balances, status letters, closing documents.',
      propertyLabel: 'Property address / file number',
    },
    {
      value: 'general',
      label: 'General Inquiry',
      hint: 'Routed to our concierge team.',
      propertyLabel: 'Community or subject (optional)',
    },
  ],
  submitLabel: 'Send to concierge',
  sentMessage:
    'Received. A concierge will reply shortly. (Endpoint to be connected.)',
}

export const defaultContent: SiteContent = {
  settings,
  home,
  about,
  payments,
  homeowner,
  titleCompany,
  contact,
}
