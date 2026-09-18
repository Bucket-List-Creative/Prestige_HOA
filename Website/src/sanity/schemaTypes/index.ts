import { type SchemaTypeDefinition } from 'sanity'

import { aboutPage } from './documents/aboutPage'
import { contactPage } from './documents/contactPage'
import { homePage } from './documents/homePage'
import { homeownerPage } from './documents/homeownerPage'
import { paymentsPage } from './documents/paymentsPage'
import { siteSettings } from './documents/siteSettings'
import { titleCompanyPage } from './documents/titleCompanyPage'
import { objectTypes } from './objects'

/**
 * Every document here is a singleton — one per site, surfaced directly in the
 * Studio's structure. Fields left empty fall back to `src/content/defaults.ts`.
 */
export const singletonTypes = [
  'siteSettings',
  'homePage',
  'aboutPage',
  'paymentsPage',
  'homeownerPage',
  'titleCompanyPage',
  'contactPage',
] as const

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    homePage,
    aboutPage,
    paymentsPage,
    homeownerPage,
    titleCompanyPage,
    contactPage,
    ...objectTypes,
  ],
}
