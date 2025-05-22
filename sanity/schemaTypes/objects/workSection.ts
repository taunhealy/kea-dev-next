import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workSection',
  title: 'Work Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'works',
      title: 'Featured Works',
      description:
        'Works will be displayed in the order selected here, or by their individual order field if set.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'work'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
