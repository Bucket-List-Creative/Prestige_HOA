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
    phone,
    mailingAddress,
    contactNote,
    primaryNav[]{label, href},
    headerCta{label, href},
    footerSiteLinks[]{label, href},
    footerPortalLinks[]{label, href},
    secureNote,
    copyright,
    footerHeadings{site, portals, contact, secure},
    formMessages{required, invalidEmail, captcha, failed},
    notFound{kicker, heading{lead, em, rest}, body, link{label, href}}
  },
  "home": *[_id == "homePage"][0]{
    seo{title, description, image${img}},
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
    seo{title, description, image${img}},
    kicker,
    heading{lead, em, rest},
    image${img},
    aside,
    values[]{kicker, title, body},
    closing{heading{lead, em, rest}, links[]{label, href, variant}}
  },
  "payments": *[_id == "paymentsPage"][0]{
    seo{title, description, image${img}},
    kicker,
    heading{lead, em, rest},
    intro,
    options[]{eyebrow, title, bullets, linkLabel, href, image${img}, variant}
  },
  "titleCompany": *[_id == "titleCompanyPage"][0]{
    seo{title, description, image${img}},
    kicker,
    crossLink{label, href},
    heading{lead, em, rest},
    aside,
    requestTypes[]{term, text},
    schemaNote,
    payment{kicker, title, body, linkLabel, pendingNote, url},
    groups[]{
      label,
      fields[]{id, label, kind, placeholder, options, full, required}
    },
    submitLabel,
    submitNote,
    sent{heading, body, resetLabel}
  },
  "contact": *[_id == "contactPage"][0]{
    seo{title, description, image${img}},
    kicker,
    heading{lead, em, rest},
    aside,
    directLabel,
    directNote,
    audiences[]{value, label, hint, propertyLabel},
    fieldLabels{who, name, email, message},
    submitLabel,
    sentMessage
  }
}`)
