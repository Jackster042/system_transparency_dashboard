import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.ts'

// In Cloudflare Workers dev, it is often safer to create the client
// outside the singleton if using postgres.js, or use the 'fetch'
// approach. Let's try the most compatible config:

const client = postgres(process.env.DATABASE_URL!, {
  max: 1,
  // Disable the prepared statements cache which causes I/O issues in Workers
  prepare: false,
  // Force the connection to close when the request is done
  idle_timeout: 1,
})

export const db = drizzle(client, { schema })
