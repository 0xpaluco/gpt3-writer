'use client'

import { useEffect, useState } from "react"
import { Tab } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'
import Markdown from "../markdown"
import { useSupabase } from "../supabase-provider"
import { PromptData } from "../../helpers/data"



interface ThreadPreviewProps {
  propmtData?: PromptData
  threadData?: string
  threadId?: number
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ThreadPreview({ propmtData, threadData, threadId }: ThreadPreviewProps) {

  const [thread, setThread] = useState(threadData)
  const [loading, setLoading] = useState(false)


  const [headline, setHeadline] = useState(propmtData?.headline)
  const [context, setContext] = useState(propmtData?.context)
  const [author, setAuthor] = useState(propmtData?.author)
  const [topic, setTopic] = useState(propmtData?.topic)

  const { supabase, user } = useSupabase();

  async function updateThread() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = { 
        id: threadId, 
        content: thread, 
        user_id: user.id,
        headline,
        context,
        author: author?.id,
        topic: topic?.id
       }

      let { error } = await supabase.from('threads').upsert(updates)
      if (error) throw error
      alert('Thread updated!')
    } catch (error) {
      console.log(error);
      
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action="#">
      <Tab.Group>
        {({ selectedIndex }) => (
          <>
            <Tab.List className="flex items-center">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                      : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                    'rounded-md border border-transparent px-3 py-1.5 text-sm font-medium'
                  )
                }
              >
                Edit
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                      : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                    'ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium'
                  )
                }
              >
                Preview
              </Tab>

              {/* These buttons are here simply as examples and don't actually do anything. */}

            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                <label htmlFor="comment" className="sr-only">
                  Comment
                </label>
                <div>
                  <textarea
                    rows={15}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:slate-indigo-500 focus:ring-slate-500 sm:text-sm"
                    placeholder="Add your comment..."
                    defaultValue={thread || ''}
                    onChange={(e) => setThread(e.target.value)}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                <div className="border-b">
                  <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 text-gray-800">
                    <div className='prose prose-lg prose-white mx-auto mt-6'>
                      <Markdown>{thread || ""}</Markdown>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
      <div className="mt-2 flex justify-end">
        <button
          disabled={loading}
          type="submit"
          onClick={() => updateThread()}

          className="inline-flex items-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          {loading ? 'Loading ...' : 'Save Thread'}
        </button>
      </div>
    </form>
  )
}
