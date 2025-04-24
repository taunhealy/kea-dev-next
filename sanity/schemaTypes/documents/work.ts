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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Work Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'workCategory'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url',
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text',
    }),
    defineField({
      name: 'core',
      title: 'Core Information',
      type: 'object',
      fields: [
        defineField({name: 'producerName', type: 'string', title: 'Producer Name'}),
        defineField({name: 'clientName', type: 'string', title: 'Client Name'}),
        defineField({name: 'projectChallenge', type: 'text', title: 'Project Challenge'}),
        defineField({
          name: 'projectTechStack',
          type: 'array',
          title: 'Tech Stack',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
      ],
    }),
    defineField({
      name: 'brandDevelopment',
      title: 'Brand Development',
      type: 'object',
      fields: [
        defineField({
          name: 'purpose',
          type: 'object',
          title: 'Brand Purpose',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
          ],
        }),
        defineField({
          name: 'audience',
          type: 'object',
          title: 'Brand Audience',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
          ],
        }),
        defineField({
          name: 'associations',
          type: 'array',
          title: 'Associations',
          of: [
            {
              type: 'object',
              fields: [defineField({name: 'title', type: 'string'})],
            },
          ],
        }),
        defineField({
          name: 'mood',
          type: 'array',
          title: 'Brand Mood',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'title', type: 'string'}),
                defineField({name: 'description', type: 'text'}),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'webDesign',
      title: 'Web Design',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Design Page',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
            defineField({
              name: 'media',
              type: 'file',
              title: 'Image/Video',
              options: {accept: 'image/*,video/*'},
            }),
            defineField({name: 'link', type: 'url'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'webDevelopment',
      title: 'Web Development',
      type: 'object',
      fields: [
        defineField({
          name: 'features',
          type: 'array',
          title: 'Features',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'title', type: 'string'}),
                defineField({name: 'description', type: 'text'}),
                defineField({
                  name: 'media',
                  type: 'array',
                  title: 'Images/Videos',
                  of: [
                    {
                      type: 'file',
                      options: {accept: 'image/*,video/*'},
                    },
                  ],
                }),
                defineField({name: 'link', type: 'url'}),
                defineField({
                  name: 'microFeatures',
                  title: 'Micro Features',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({name: 'title', type: 'string'}),
                        defineField({name: 'description', type: 'text'}),
                        defineField({
                          name: 'media',
                          type: 'array',
                          title: 'Images/Videos',
                          of: [
                            {
                              type: 'file',
                              options: {accept: 'image/*,video/*'},
                            },
                          ],
                        }),
                        defineField({name: 'link', type: 'url'}),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'mediaContent',
      title: 'Media Content',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Media Item',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'text'}),
            defineField({
              name: 'media',
              type: 'file',
              title: 'Image/Video',
              options: {accept: 'image/*,video/*'},
            }),
            defineField({name: 'link', type: 'url'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'inDevelopment',
      title: 'In Development',
      type: 'boolean',
      description:
        'Check this if the project is still in development and should not appear in the main work listings',
      initialValue: false,
    }),
    defineField({
      name: 'workType',
      title: 'Work Type',
      type: 'reference',
      to: [{type: 'workType'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma URL',
      type: 'url',
      description: 'Link to the Figma design file for this project',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the GitHub repository for this project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.title',
      workType: 'workType.title',
      media: 'coverImage',
    },
    prepare({title, client, workType, media}) {
      return {
        title,
        subtitle: `${client || 'No client'} · ${workType || 'No type'}`,
        media,
      }
    },
  },
})
