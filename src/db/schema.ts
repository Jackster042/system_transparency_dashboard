import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const pulses = pgTable('pulses', {
  id: serial().primaryKey(),
  content: text('content').notNull(),
  authorName: varchar('author_name', { length: 100 }).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
})
