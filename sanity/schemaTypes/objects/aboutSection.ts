import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'teamHeading',
      title: 'Team Section Heading',
      type: 'string',
      description: 'Heading for the team section',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Description',
      type: 'text',
      description: 'Description text for the team section',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
  ],
})
