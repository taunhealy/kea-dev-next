import {defineConfig, SchemaTypeDefinition} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Kea Logic',

  projectId: 'amds2shj',
  dataset: 'production',

  plugins: [
    structureTool({
      structure
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
})