declare module '@sanity/orderable-document-list' {
  import type {StructureBuilder} from 'sanity/structure'

  export interface OrderableDocumentListDeskItemOptions {
    type: string
    title: string
    S: StructureBuilder
    context: any
    [key: string]: any
  }

  export function orderableDocumentListDeskItem(options: OrderableDocumentListDeskItemOptions): any
}
