/**
 * How the site's form fields line up with the Jotform questions. Shared by the
 * form actions and the Studio schema, which locks these ids so an edit in the
 * Studio can't silently disconnect an answer from its Jotform question.
 */

/** Website field id (from Sanity) → Jotform question id. */
export const TITLE_FIELDS: Record<string, string> = {
  'tc-company': '2',
  'tc-file': '3',
  'tc-contact': '4',
  'tc-email': '5',
  'tc-phone': '6',
  'tc-address': '7',
  'tc-owner': '8',
  'tc-buyer': '9',
  'tc-closing': '10',
  'tc-request': '11',
  'tc-notes': '12',
}

/** The title company form rejects submissions missing any of these. */
export const TITLE_REQUIRED = ['tc-company', 'tc-contact', 'tc-email', 'tc-address']

/** Radio values on the site → the option labels in Jotform. */
export const AUDIENCE_LABELS: Record<string, string> = {
  homeowner: 'Homeowner',
  title: 'Title Company',
  general: 'General Inquiry',
}

/** True for a value the Jotform mapping depends on, so the Studio locks it. */
export const isMapped = (map: Record<string, string>, value: unknown) =>
  typeof value === 'string' && Object.hasOwn(map, value)
