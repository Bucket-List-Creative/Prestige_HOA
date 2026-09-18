import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'brandPrimary',
      title: 'Brand word (gold)',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'brandSecondary',
      title: 'Brand word (tracked)',
      type: 'string',
      group: 'brand',
    }),
    defineField({ name: 'logo', type: 'figure', group: 'brand' }),
    defineField({ name: 'tagline', type: 'string', group: 'brand' }),
    defineField({
      name: 'conciergeEmail',
      title: 'Concierge email',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'contactNote',
      title: 'Contact note',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'primaryNav',
      title: 'Header navigation',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      group: 'nav',
    }),
    defineField({
      name: 'headerCta',
      title: 'Header button',
      type: 'link',
      group: 'nav',
    }),
    defineField({
      name: 'footerSiteLinks',
      title: 'Footer — Site column',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      group: 'footer',
    }),
    defineField({
      name: 'footerPortalLinks',
      title: 'Footer — Portals column',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      group: 'footer',
    }),
    defineField({
      name: 'secureNote',
      title: 'Footer — Secure note',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'copyright',
      type: 'string',
      group: 'footer',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
