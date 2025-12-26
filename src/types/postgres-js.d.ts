declare module 'postgres-js' {
  export default function postgres(
    connectionString: string,
    options?: {
      prepare?: boolean
      ssl?: boolean | 'prefer' | 'require'
      max?: number
    },
  ): any
}
