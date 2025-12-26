import { pulses } from '../db/schema'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres-js'

const connectionString =
  process.env.HYPERDRIVE_CONNECTION_STRING ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/system_transparency_db'

const getPulses = createServerFn({ method: 'GET' }).handler(
  async (ctx: any) => {
    const client = postgres(connectionString, { prepare: false })
    const db = drizzle(client)

    try {
      const startTime = performance.now()
      const data = await db.select().from(pulses).limit(10)
      const endTime = performance.now()
      const queryDuration = Math.round(endTime - startTime)

      // Get headers from request, not empty Headers()
      const edgeCity = ctx.request.headers.get('x-vercel-ip-city') || 'Unknown'
      const edgeCountry =
        ctx.request.headers.get('x-vercel-ip-country') || 'N/A'

      return {
        data,
        metrics: {
          queryLatency: queryDuration,
          edgeLocation: edgeCity,
          edgeCountry: edgeCountry,
          timestamp: new Date().toISOString(),
          cacheStatus: 'MISS',
        },
      }
    } finally {
      await client.end()
    }
  },
)
export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    return await getPulses()
  },
})
function App() {
  const getPulsesQuery = Route.useLoaderData()

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">System Transparency Dashboard</h1>

      {/* System Metrics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Edge Location"
          value={getPulsesQuery.metrics.edgeLocation || 'Detecting...'}
          subtitle={getPulsesQuery.metrics.edgeCountry}
          color="blue"
        />
        <MetricCard
          title="DB Query Time"
          value={`${getPulsesQuery.metrics.queryLatency || 0}ms`}
          subtitle="Round-trip to database"
          color={getPulsesQuery.metrics.queryLatency! < 50 ? 'green' : 'yellow'}
        />
        <MetricCard
          title="Cache Status"
          value={getPulsesQuery.metrics.cacheStatus || 'UNKNOWN'}
          subtitle="Hyperdrive Cache"
          color="purple"
        />
      </div>

      {/* Architecture Status */}
      <div className="bg-slate-100 p-4 rounded-lg mb-8">
        <h2 className="font-semibold text-slate-700 mb-2">
          Active Infrastructure
        </h2>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Compute: TanStack Start (Edge Ready)" />
          <StatusBadge label="Database: Drizzle + PostgreSQL" />
          <StatusBadge label="Storage: R2 (Pending)" />
          <StatusBadge label="Auth: Cognito (Pending)" />
        </div>
      </div>

      {/* Data Feed */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">System Pulse Feed</h2>
          <p className="text-sm text-gray-500">
            Real-time data from the Regional Database
          </p>
        </div>

        <div className="divide-y">
          {getPulsesQuery.data.map((pulse) => (
            <div
              key={pulse.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    {pulse.authorName}
                  </p>
                  <p className="text-gray-700 mt-1">{pulse.content}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(pulse.createdAt!).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

          {(!getPulsesQuery?.data || getPulsesQuery?.data.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              No pulses found. Run the seed script to populate data.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string
  value: string
  subtitle: string
  color: 'blue' | 'green' | 'yellow' | 'purple'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  }

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <p className="text-sm opacity-75">{title}</p>
      <p className="text-2xl font-bold my-1">{value}</p>
      <p className="text-xs opacity-75">{subtitle}</p>
    </div>
  )
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600">
      {label}
    </span>
  )
}
