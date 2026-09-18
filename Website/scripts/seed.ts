/**
 * Seed the Sanity dataset with the copy in `src/content/defaults.ts`, so the
 * Studio opens with the live wording already in it instead of empty fields.
 *
 *   npx sanity login          # once
 *   npm run sanity:seed
 *
 * Re-running replaces the seven singleton documents and re-uploads the images
 * (Sanity deduplicates identical files), so local edits in the Studio are
 * overwritten. It never touches anything else in the dataset.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { IdentifiedSanityDocumentStub } from '@sanity/client'
import { getCliClient } from 'sanity/cli'

import { defaultContent } from '../src/content/defaults'
import type { Img } from '../src/content/types'

const client = getCliClient({ apiVersion: '2024-10-28' })

const uploaded = new Map<string, string>()

/** Upload a file from `public/` and return a Sanity image field for it. */
async function image(img: Img) {
  const rel = img.src.replace(/^\//, '')
  let assetId = uploaded.get(rel)

  if (!assetId) {
    const file = await readFile(path.join(process.cwd(), 'public', rel))
    const asset = await client.assets.upload('image', file, {
      filename: path.basename(rel),
    })
    assetId = asset._id
    uploaded.set(rel, assetId)
    console.log(`  uploaded ${rel}`)
  }

  return {
    _type: 'figure',
    alt: img.alt,
    asset: { _type: 'reference', _ref: assetId },
  }
}

/** Sanity needs a _key on every array entry. */
const keyed = <T extends object>(items: T[], prefix: string) =>
  items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` }))

async function main() {
  const { settings, home, about, payments, homeowner, titleCompany, contact } =
    defaultContent

  console.log('Uploading images…')

  const docs: IdentifiedSanityDocumentStub[] = [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      brandPrimary: settings.brandPrimary,
      brandSecondary: settings.brandSecondary,
      logo: await image(settings.logo),
      tagline: settings.tagline,
      conciergeEmail: settings.conciergeEmail,
      contactNote: settings.contactNote,
      primaryNav: keyed(settings.primaryNav, 'nav'),
      headerCta: settings.headerCta,
      footerSiteLinks: keyed(settings.footerSiteLinks, 'fsite'),
      footerPortalLinks: keyed(settings.footerPortalLinks, 'fport'),
      secureNote: settings.secureNote,
      copyright: settings.copyright,
    },
    {
      _id: 'homePage',
      _type: 'homePage',
      hero: {
        notes: home.hero.notes,
        heading: home.hero.heading,
        image: await image(home.hero.image),
        panelText: home.hero.panelText,
        primaryCta: home.hero.primaryCta,
        secondaryCta: home.hero.secondaryCta,
      },
      intro: home.intro,
      pathways: {
        heading: home.pathways.heading,
        note: home.pathways.note,
        items: keyed(
          await Promise.all(
            home.pathways.items.map(async (item) => ({
              ...item,
              image: await image(item.image),
            }))
          ),
          'path'
        ),
      },
      philosophy: {
        ...home.philosophy,
        image: await image(home.philosophy.image),
        principles: keyed(home.philosophy.principles, 'prin'),
      },
      process: {
        ...home.process,
        columns: keyed(
          home.process.columns.map((column) => ({
            ...column,
            steps: keyed(column.steps, 'step'),
          })),
          'col'
        ),
      },
      trust: {
        ...home.trust,
        stats: keyed(home.trust.stats, 'stat'),
        image: await image(home.trust.image),
      },
      cta: {
        heading: home.cta.heading,
        links: keyed(home.cta.links, 'cta'),
      },
    },
    {
      _id: 'aboutPage',
      _type: 'aboutPage',
      ...about,
      image: await image(about.image),
      values: keyed(about.values, 'val'),
      closing: {
        heading: about.closing.heading,
        links: keyed(about.closing.links, 'cta'),
      },
    },
    {
      _id: 'paymentsPage',
      _type: 'paymentsPage',
      kicker: payments.kicker,
      heading: payments.heading,
      intro: payments.intro,
      options: keyed(
        await Promise.all(
          payments.options.map(async (option) => ({
            ...option,
            image: await image(option.image),
          }))
        ),
        'opt'
      ),
    },
    {
      _id: 'homeownerPage',
      _type: 'homeownerPage',
      ...homeowner,
      steps: keyed(homeowner.steps, 'step'),
    },
    {
      _id: 'titleCompanyPage',
      _type: 'titleCompanyPage',
      ...titleCompany,
      requestTypes: keyed(titleCompany.requestTypes, 'req'),
      groups: keyed(
        titleCompany.groups.map((group) => ({
          ...group,
          fields: keyed(group.fields, 'f'),
        })),
        'grp'
      ),
    },
    {
      _id: 'contactPage',
      _type: 'contactPage',
      ...contact,
      audiences: keyed(contact.audiences, 'aud'),
    },
  ]

  console.log('Writing documents…')
  const tx = client.transaction()
  for (const doc of docs) tx.createOrReplace(doc)
  await tx.commit()

  for (const doc of docs) console.log(`  ${doc._id}`)
  console.log(`\nSeeded ${docs.length} documents into "${client.config().dataset}".`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
