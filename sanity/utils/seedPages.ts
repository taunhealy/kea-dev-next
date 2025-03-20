import {client} from '../lib/sanity'

const DEFAULT_PAGES = [
  {
    _type: 'page',
    title: 'Home',
    slug: {_type: 'slug', current: 'home'},
    sections: [
      {
        _type: 'section',
        name: 'Featured Work',
        sectionType: 'work',
        order: 1,
        sectionContent: {
          _type: 'workSection',
          // Default work section content
        },
      },
      {
        _type: 'section',
        name: 'Client Testimonials',
        sectionType: 'testimonials',
        order: 2,
        sectionContent: {
          _type: 'testimonialSection',
          // Default testimonial section content
        },
      },
      // ... other sections
    ],
  },
  {
    _type: 'page',
    title: 'About',
    slug: {_type: 'slug', current: 'about'},
    sections: [
      // ... predefined sections for About page
    ],
  },
]

export async function seedDefaultPages() {
  try {
    for (const page of DEFAULT_PAGES) {
      // Check if page already exists
      const existingPage = await client.fetch(`*[_type == "page" && slug.current == $slug][0]`, {
        slug: page.slug.current,
      })

      if (!existingPage) {
        await client.create(page)
      }
    }
  } catch (error) {
    console.error('Error seeding pages:', error)
  }
}
