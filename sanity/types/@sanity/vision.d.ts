declare module '@sanity/vision' {
  export function visionTool(options?: {defaultApiVersion?: string; defaultDataset?: string}): {
    name: string
    component: any
  }
}
