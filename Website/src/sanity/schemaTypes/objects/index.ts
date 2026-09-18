import { defineField, defineType } from 'sanity'

/** A heading split into three parts so the middle renders italic gold. */
export const splitHeading = defineType({
  name: 'splitHeading',
  title: 'Heading',
  type: 'object',
  options: { columns: 3 },
  fields: [
    defineField({ name: 'lead', title: 'Lead', type: 'string' }),
    defineField({
      name: 'em',
      title: 'Emphasis (italic gold)',
      type: 'string',
    }),
    defineField({ name: 'rest', title: 'Rest', type: 'string' }),
  ],
  preview: {
    select: { lead: 'lead', em: 'em', rest: 'rest' },
    prepare: ({ lead, em, rest }) => ({
      title: [lead, em, rest].filter(Boolean).join(' ') || 'Heading',
    }),
  },
})

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path or URL',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})

export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'Call to action',
  type: 'object',
  options: { columns: 3 },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path or URL',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (filled)', value: 'primary' },
          { title: 'Secondary (outline)', value: 'secondary' },
          { title: 'Ghost (underlined)', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})

/** Photography. Leave empty to keep the image shipped with the build. */
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for screen readers.',
    }),
  ],
})

export const termAndText = defineType({
  name: 'termAndText',
  title: 'Item',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'term', type: 'string' }),
    defineField({ name: 'text', type: 'string' }),
  ],
  preview: {
    select: { title: 'term', subtitle: 'text' },
  },
})

export const step = defineType({
  name: 'step',
  title: 'Step',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'detail', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'detail' },
  },
})

export const objectTypes = [
  splitHeading,
  link,
  ctaLink,
  figure,
  termAndText,
  step,
]
