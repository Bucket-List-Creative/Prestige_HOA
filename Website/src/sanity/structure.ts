import type { StructureResolver } from 'sanity/structure'

/** Every document is a singleton, so the structure lists them directly. */
const singletons: { id: string; title: string }[] = [
  { id: 'siteSettings', title: 'Site settings' },
  { id: 'homePage', title: 'Home' },
  { id: 'aboutPage', title: 'About' },
  { id: 'paymentsPage', title: 'Payments' },
  { id: 'homeownerPage', title: 'Homeowner payment' },
  { id: 'titleCompanyPage', title: 'Title company portal' },
  { id: 'contactPage', title: 'Concierge support' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Prestige HOA')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.divider(),
      ...singletons
        .filter((s) => s.id !== 'siteSettings')
        .map((s) =>
          S.listItem()
            .title(s.title)
            .id(s.id)
            .child(S.document().schemaType(s.id).documentId(s.id))
        ),
    ])
