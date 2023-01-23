'use client'

import Link from "next/link"
import { Database } from '../../../lib/database.types'
type Threads = Database['public']['Tables']['threads']['Row']


const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.', role: 'Member' },
  // More people...
]

interface ThreadsTableProps {
  threads: Threads[] | null
}

export default function ThreadsTable({ threads }: ThreadsTableProps) {

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Threads</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your threads.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href={'/dashboard/compose'}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:w-auto"
          >
            Compose Thread
          </Link>
        </div>
      </div>

      <ul role="list" className="divide-y divide-gray-200 mt-4">
        {threads?.map((thread) => (
          <li
            key={thread.id}
            className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <Link href={`/dashboard/edit/${thread.id}`} className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="truncate text-sm font-medium text-gray-900">{thread.author}</p>
                </Link>
              </div>

            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-600 line-clamp-2">{thread.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
