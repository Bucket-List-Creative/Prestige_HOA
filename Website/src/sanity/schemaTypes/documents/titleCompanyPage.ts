import { defineArrayMember, defineField, defineType } from 'sanity'

export const titleCompanyPage = defineType({
  name: 'titleCompanyPage',
  title: 'Title company portal',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Intro', default: true },
    { name: 'form', title: 'Request form' },
  ],
  fields: [
    defineField({ name: 'kicker', type: 'string', group: 'intro' }),
    defineField({ name: 'crossLink', type: 'link', group: 'intro' }),
    defineField({ name: 'heading', type: 'splitHeading', group: 'intro' }),
    defineField({ name: 'aside', type: 'text', rows: 4, group: 'intro' }),
    defineField({
      name: 'requestTypes',
      type: 'array',
      of: [defineArrayMember({ type: 'termAndText' })],
      group: 'intro',
    }),
    defineField({ name: 'schemaNote', type: 'string', group: 'intro' }),
    defineField({
      name: 'payment',
      title: 'Closing packet payment',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({ name: 'kicker', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'body', type: 'text', rows: 3 }),
        defineField({ name: 'linkLabel', type: 'string' }),
        defineField({
          name: 'pendingNote',
          description: 'Shown while no payment link is set.',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Stripe payment link',
          description:
            'The public Payment Link (https://buy.stripe.com/…), not a dashboard.stripe.com URL.',
          type: 'url',
          validation: (rule) =>
            rule.custom((value?: string) =>
              value && value.includes('dashboard.stripe.com')
                ? 'Dashboard links only work for you while logged in. Use the Payment Link instead.'
                : true
            ),
        }),
      ],
    }),
    defineField({
      name: 'groups',
      title: 'Field groups',
      type: 'array',
      group: 'form',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({
              name: 'fields',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'id',
                      description: 'Unique field name, e.g. tc-company.',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'kind',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Text', value: 'text' },
                          { title: 'Email', value: 'email' },
                          { title: 'Phone', value: 'tel' },
                          { title: 'Date', value: 'date' },
                          { title: 'Dropdown', value: 'select' },
                          { title: 'Long text', value: 'textarea' },
                        ],
                      },
                      initialValue: 'text',
                    }),
                    defineField({ name: 'placeholder', type: 'string' }),
                    defineField({
                      name: 'options',
                      title: 'Dropdown options',
                      type: 'array',
                      of: [defineArrayMember({ type: 'string' })],
                      hidden: ({ parent }) => parent?.kind !== 'select',
                    }),
                    defineField({
                      name: 'full',
                      title: 'Full width',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'required',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'kind' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'submitLabel', type: 'string', group: 'form' }),
    defineField({ name: 'submitNote', type: 'string', group: 'form' }),
    defineField({
      name: 'sent',
      title: 'Confirmation',
      type: 'object',
      group: 'form',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'body', type: 'text', rows: 3 }),
        defineField({ name: 'resetLabel', type: 'string' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Title company portal' }) },
})
