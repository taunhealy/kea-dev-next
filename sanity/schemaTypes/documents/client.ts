export default {
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }
  ]
}