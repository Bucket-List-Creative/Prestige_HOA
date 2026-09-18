import { defineArrayMember, defineField, defineType } from 'sanity'

export const homeownerPage = defineType({
  name: 'homeownerPage',
  title: 'Homeowner payment',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Intro', default: true },
    { name: 'steps', title: 'Steps' },
  ],
  fields: [
    defineField({ name: 'kicker', type: 'string', group: 'intro' }),
    defineField({ name: 'crossLink', type: 'link', group: 'intro' }),
    defineField({ name: 'heading', type: 'splitHeading', group: 'intro' }),
    defineField({
      name: 'steps',
      title: 'Progress rail',
      type: 'array',
      of: [defineArrayMember({ type: 'step' })],
      validation: (rule) => rule.max(3),
      group: 'steps',
    }),
    defineField({
      name: 'step1',
      title: 'Step 1 — Property',
      type: 'object',
      group: 'steps',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'submitLabel', type: 'string' }),
      ],
    }),
    defineField({
      name: 'step2',
      title: 'Step 2 — Review',
      type: 'object',
      group: 'steps',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({
          name: 'pendingNote',
          title: 'Placeholder for unconnected account fields',
          type: 'string',
        }),
        defineField({ name: 'integrationNote', type: 'string' }),
        defineField({ name: 'continueLabel', type: 'string' }),
      ],
    }),
    defineField({
      name: 'step3',
      title: 'Step 3 — Secure payment',
      type: 'object',
      group: 'steps',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({
          name: 'body',
          type: 'text',
          rows: 3,
          description: "The receipt email is appended after this sentence.",
        }),
        defineField({ name: 'cardKicker', type: 'string' }),
        defineField({ name: 'cardTitle', type: 'string' }),
        defineField({ name: 'cardBody', type: 'text', rows: 3 }),
        defineField({ name: 'continueLabel', type: 'string' }),
        defineField({ name: 'integrationNote', type: 'string' }),
        defineField({
          name: 'paymentUrl',
          title: 'Payment partner URL',
          type: 'url',
          description:
            'Set this to activate the final button. While empty it stays disabled.',
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Homeowner payment' }) },
})
