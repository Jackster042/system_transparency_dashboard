import { db } from '@/db'
import { pulses } from '@/db/schema'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getPulses = createServerFn({ method: 'GET' }).handler(
  async () =>
    await db.select().from(pulses).orderBy(pulses.createdAt).limit(10),
)

export const Route = createFileRoute('/')({
  component: App,
  loader: () => getPulses(),
})
function App() {
  const getPulsesQuery = Route.useLoaderData()
  console.log(getPulsesQuery[0], 'getPulsesQuery from db')

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        System Transparency Dashboard
      </h1>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-semibold">Architecture Status</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Compute :</strong>TanstackStart ( Ready fro Edge )
          </li>
          <li>
            <strong>Database :</strong>Drizzle + Postgres ( Ready for Hyperdrive
            )
          </li>
          <li>
            <strong>Storage :</strong>R2 ( Pending Configuration )
          </li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Recent Pulses( GLobal Feed )
      </h2>
      <div className="space-x-4">
        {getPulsesQuery?.map((pulse) => (
          <div key={pulse.id} className="border rounded p-4 shadow-sm">
            <p className="font-medium">{pulse.authorName}</p>
            <p className="text-gray-700 mt-1">{pulse.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(pulse.createdAt!).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
