import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres-js'
import * as schema from './schema.ts'

const connectionString =
  process.env.HYPERDRIVE_CONNECTION_STRING ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/system_transparency_db'

const client = postgres(connectionString, {
  max: 1,
  // Disable the prepared statements cache which causes I/O issues in Workers
  prepare: false,
  ssl: 'prefer',
  // Force the connection to close when the request is done
  // idle_timeout: 1,
})

export const db = drizzle(client, { schema })
