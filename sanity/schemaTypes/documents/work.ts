import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Work Categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'workCategory' }]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{type: 'image'}]
    }),
    defineField({
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url'
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text'
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.title',
      media: 'coverImage'
    },
    prepare({title, client, media}) {
      return {
        title,
        subtitle: client,
        media
      }
    }
  }
})