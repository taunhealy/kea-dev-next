import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'process',
  title: 'Process',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code for the step (e.g. #FF0000)',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color code')
    })
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
      media: 'icon'
    },
    prepare({title, stepNumber, media}) {
      return {
        title: `Step ${stepNumber}: ${title}`,
        media: media
      }
    }
  }
})