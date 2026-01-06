import '@tanstack/react-query'

interface MyMeta extends Record<string, unknown> {
  globalLoadingIndicator?: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}