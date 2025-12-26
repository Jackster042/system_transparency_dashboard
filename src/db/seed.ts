import { db } from './index'
import { pulses } from './schema'

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data (for clean re-seeds)
  await db.delete(pulses)
  console.log('✅ Cleared old pulses.')

  // Insert sample "Pulses" to demonstrate the architecture
  await db.insert(pulses).values([
    {
      authorName: 'System Architect',
      content: 'Database schema initialized successfully.',
      imageUrl: null,
    },
    {
      authorName: 'Edge Node (London)',
      content: 'First read from the regional storage. Latency: 142ms.',
      imageUrl: null,
    },
    {
      authorName: 'Admin',
      content: 'Ready for Hyperdrive integration.',
      imageUrl: null,
    },
  ])

  console.log('🌱 Database seeded!')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
