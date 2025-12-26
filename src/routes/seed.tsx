import { db } from '@/db'
import { pulses } from '@/db/schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seed')({
  loader: async () => {
    await db.insert(pulses).values([
      {
        authorName: 'System Architect',
        content: 'Database connected successfully via Hyperdrive.',
      },
      {
        authorName: 'Edge Node',
        content: 'Request served from Cloudflare Edge.',
      },
      {
        authorName: 'Admin',
        content: 'System Transparency Dashboard is live!',
      },
    ])
    return { success: true }
  },
  component: () => null,
})
