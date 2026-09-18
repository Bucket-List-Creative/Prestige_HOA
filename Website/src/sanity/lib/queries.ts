import { defineQuery } from 'next-sanity'

/**
 * Images are projected straight into the `Img` shape used by
 * `src/content/types.ts`, so the merge in `content.ts` needs no special cases.
 * An unset image yields nulls, which the merge skips.
 */
const img = `{
  "src": asset->url,
  "alt": alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

/** One request for the whole site. Each singleton is keyed by its document id. */
export const siteContentQuery = defineQuery(`{
  "settings": *[_id == "siteSettings"][0]{
    brandPrimary,
    brandSecondary,
    logo${img},
    tagline,
    conciergeEmail,
    contactNote,
    primaryNav[]{label, href},
    headerCta{label, href},
    footerSiteLinks[]{label, href},
    footerPortalLinks[]{label, href},
    secureNote,
    copyright
  },
  "home": *[_id == "homePage"][0]{
    hero{
      notes,
      heading{lead, em, rest},
      image${img},
      panelText,
      primaryCta{label, href},
      secondaryCta{label, href}
    },
    intro{kicker, heading{lead, em, rest}, body},
    pathways{
      heading,
      note,
      items[]{eyebrow, titleTop, titleBottom, body, linkLabel, href, image${img}}
    },
    philosophy{
      kicker,
      heading{lead, em, rest},
      image${img},
      lead,
      principles[]{term, text}
    },
    process{
      kicker,
      heading{lead, em, rest},
      columns[]{label, steps[]{title, detail}}
    },
    trust{
      kicker,
      stats[]{value, text},
      image${img},
      quote,
      body
    },
    cta{heading{lead, em, rest}, links[]{label, href, variant}}
  },
  "about": *[_id == "aboutPage"][0]{
    kicker,
    heading{lead, em, rest},
    image${img},
    aside,
    values[]{kicker, title, body},
    closing{heading{lead, em, rest}, links[]{label, href, variant}}
  },
  "payments": *[_id == "paymentsPage"][0]{
    kicker,
    heading{lead, em, rest},
    intro,
    options[]{eyebrow, title, bullets, linkLabel, href, image${img}, variant}
  },
  "homeowner": *[_id == "homeownerPage"][0]{
    kicker,
    crossLink{label, href},
    heading{lead, em, rest},
    steps[]{title, detail},
    step1{heading, submitLabel},
    step2{heading, pendingNote, integrationNote, continueLabel},
    step3{
      heading,
      body,
      cardKicker,
      cardTitle,
      cardBody,
      continueLabel,
      integrationNote,
      paymentUrl
    }
  },
  "titleCompany": *[_id == "titleCompanyPage"][0]{
    kicker,
    crossLink{label, href},
    heading{lead, em, rest},
    aside,
    requestTypes[]{term, text},
    schemaNote,
    groups[]{
      label,
      fields[]{id, label, kind, placeholder, options, full, required}
    },
    submitLabel,
    submitNote,
    sent{heading, body, resetLabel}
  },
  "contact": *[_id == "contactPage"][0]{
    kicker,
    heading{lead, em, rest},
    aside,
    directLabel,
    directNote,
    audiences[]{value, label, hint, propertyLabel},
    submitLabel,
    sentMessage
  }
}`)
