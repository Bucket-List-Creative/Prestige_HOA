/**
 * Homeowners pay dues through the Buildium Resident Center. Set
 * BUILDIUM_SUBDOMAIN to the account's subdomain, the "yourcompany" in
 * yourcompany.managebuilding.com, and links go to its resident sign-in page,
 * per Buildium's public site integration guide.
 *
 * Until it is set, homeowner payment links fall back to the contact page.
 */
const subdomain = process.env.BUILDIUM_SUBDOMAIN?.trim()

export const BUILDIUM_PORTAL_URL = subdomain
  ? `https://${subdomain}.managebuilding.com/Resident/PublicPages/login.aspx`
  : '/contact'

/** The retired on-site payment route, redirected to the portal in next.config.ts. */
export const LEGACY_HOMEOWNER_PATH = '/payments/homeowner'
