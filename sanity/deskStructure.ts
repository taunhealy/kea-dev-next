import type {StructureBuilder} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export const structure = (S: StructureBuilder, context: any) => {
  // Get all document types from schema
  const documentTypes = schemaTypes
    .filter((schema) => schema.type === 'document')
    .map((schema) => schema.name)

  return S.list()
    .title('Content')
    .items([
      // Pages with ordering
      orderableDocumentListDeskItem({
        type: 'page',
        title: 'Pages',
        S,
        context,
      }),
      // Automatically add all other document types
      ...documentTypes
        .filter((typeName) => typeName !== 'page') // Exclude page since we handled it above
        .map((typeName) =>
          S.documentTypeListItem(typeName).title(
            typeName.charAt(0).toUpperCase() + typeName.slice(1),
          ),
        ),
    ])
}
