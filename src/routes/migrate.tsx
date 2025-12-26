import { db } from '@/db'
import { createFileRoute } from '@tanstack/react-router'
import { sql } from 'drizzle-orm'

export const Route = createFileRoute('/migrate')({
  loader: async () => {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pulses (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `)
    return { success: true }
  },
  component: () => null,
})
