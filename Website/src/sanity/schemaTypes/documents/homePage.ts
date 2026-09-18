import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Introduction' },
    { name: 'pathways', title: 'Pathways' },
    { name: 'philosophy', title: 'Philosophy' },
    { name: 'process', title: 'Process' },
    { name: 'trust', title: 'Trust' },
    { name: 'cta', title: 'Closing CTA' },
  ],
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'notes',
          title: 'Corner notes',
          description: 'Three short lines above the headline.',
          type: 'array',
          of: [defineArrayMember({ type: 'text', rows: 2 })],
          validation: (rule) => rule.max(3),
        }),
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({ name: 'image', type: 'figure' }),
        defineField({ name: 'panelText', type: 'text', rows: 3 }),
        defineField({ name: 'primaryCta', type: 'link' }),
        defineField({ name: 'secondaryCta', type: 'link' }),
      ],
    }),
    defineField({
      name: 'intro',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({ name: 'kicker', type: 'string' }),
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({ name: 'body', type: 'text', rows: 4 }),
      ],
    }),
    defineField({
      name: 'pathways',
      type: 'object',
      group: 'pathways',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'note', type: 'string' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'eyebrow', type: 'string' }),
                defineField({ name: 'titleTop', type: 'string' }),
                defineField({ name: 'titleBottom', type: 'string' }),
                defineField({ name: 'body', type: 'text', rows: 2 }),
                defineField({ name: 'linkLabel', type: 'string' }),
                defineField({ name: 'href', type: 'string' }),
                defineField({ name: 'image', type: 'figure' }),
              ],
              preview: {
                select: {
                  title: 'eyebrow',
                  subtitle: 'titleBottom',
                  media: 'image',
                },
              },
            }),
          ],
          validation: (rule) => rule.max(2),
        }),
      ],
    }),
    defineField({
      name: 'philosophy',
      type: 'object',
      group: 'philosophy',
      fields: [
        defineField({ name: 'kicker', type: 'string' }),
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({ name: 'image', type: 'figure' }),
        defineField({ name: 'lead', type: 'text', rows: 4 }),
        defineField({
          name: 'principles',
          type: 'array',
          of: [defineArrayMember({ type: 'termAndText' })],
        }),
      ],
    }),
    defineField({
      name: 'process',
      type: 'object',
      group: 'process',
      fields: [
        defineField({ name: 'kicker', type: 'string' }),
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({
          name: 'columns',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({
                  name: 'steps',
                  type: 'array',
                  of: [defineArrayMember({ type: 'step' })],
                }),
              ],
              preview: { select: { title: 'label' } },
            }),
          ],
          validation: (rule) => rule.max(2),
        }),
      ],
    }),
    defineField({
      name: 'trust',
      type: 'object',
      group: 'trust',
      fields: [
        defineField({ name: 'kicker', type: 'string' }),
        defineField({
          name: 'stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              options: { columns: 2 },
              fields: [
                defineField({ name: 'value', type: 'string' }),
                defineField({ name: 'text', type: 'text', rows: 2 }),
              ],
              preview: { select: { title: 'value', subtitle: 'text' } },
            }),
          ],
        }),
        defineField({ name: 'image', type: 'figure' }),
        defineField({ name: 'quote', type: 'text', rows: 2 }),
        defineField({ name: 'body', type: 'text', rows: 4 }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({ name: 'heading', type: 'splitHeading' }),
        defineField({
          name: 'links',
          type: 'array',
          of: [defineArrayMember({ type: 'ctaLink' })],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})
