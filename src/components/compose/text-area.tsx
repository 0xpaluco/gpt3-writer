'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Database } from '../../../lib/database.types'
import ThreadPreview from './thread-preview'
import { composeThread, PromptData } from '../../helpers/data'

type Topics = Database['public']['Tables']['topics']['Row']
type Authors = Database['public']['Tables']['authors']['Row']

const narrativeStyles = [
  { name: 'Simple', value: null },
  { name: 'Linear', value: 'linear' },
  { name: 'Viewpoint', value: 'viewpoint' },
  { name: 'Quest', value: 'quest' },
  { name: 'Descriptive', value: 'descriptive' },
  // More items...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TextAreaProps {
  topics: Topics[] | null
  authors: Authors[] | null
}

export default function ComposeTextArea({ topics, authors }: TextAreaProps) {

  const authorsList = ([{ name: 'None', value: null }] as Authors[]).concat(authors as Authors[])
  const topicList = ([{ name: 'None', value: null }] as Topics[]).concat(topics as Topics[])

  const [headline, setHeadline] = useState('')
  const [context, setContext] = useState('')
  const [author, setAuthor] = useState(authorsList[0])
  const [topic, setTopic] = useState(topicList[0])
  const [narrative, setNarrative] = useState(narrativeStyles[0])

  const [isGenerating, setIsGenerating] = useState(false)
  const [thread, setThread] = useState('')

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    setThread("")
    setIsGenerating(true);
    // Get data from the form.
    const data = {
      headline,
      context,
      author: `${author.name}, ${author.description}`,
      topic: topic.name,
      narrative: narrative.name,
    } as PromptData;

    // calls /api/compose endpoint
    const threadData = await composeThread(data)

    // 
    setThread(threadData.thread)
    setIsGenerating(false);
    //alert(`Is this your full thread: ${result.thread}`)
  }

  return (
    <>

      <form onSubmit={handleSubmit} className="relative">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500">
          <label htmlFor="headline" className="sr-only">
            Headline
          </label>
          <input
            type="text"
            name="headline"
            id="headline"
            autoComplete="off"
            className="block w-full border-0 pt-2.5 text-base font-medium placeholder-gray-500 focus:ring-0"
            placeholder="Headline"
            value={headline || ''}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <label htmlFor="context" className="sr-only">
            Context
          </label>
          <textarea
            rows={4}
            name="context"
            id="context"
            className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-base"
            placeholder="what's the thread about..."
            defaultValue={''}
            value={context || ''}
            onChange={(e) => setContext(e.target.value)}

          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
          <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3 bg-white">

            <Listbox as="div" value={topic} onChange={setTopic} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Add a topic </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      <TagIcon
                        className={classNames(
                          topic?.value === null ? 'text-gray-300' : 'text-gray-500',
                          'h-5 w-5 flex-shrink-0 sm:-ml-1'
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          topic?.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {topic?.value === null ? 'Topic' : topic?.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {topicList?.map((topic) => (
                          <Listbox.Option
                            key={topic.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-2 px-3'
                              )
                            }
                            value={topic}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">{topic.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

            <Listbox as="div" value={author} onChange={setAuthor} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Pick Author-like </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      {author?.value === null ? (
                        <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
                      ) : (
                        <img src={author?.avatar ? author.avatar : ""} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                      )}

                      <span
                        className={classNames(
                          author?.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {author?.value === null ? 'Author Style' : author?.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {authorsList?.map((author) => (
                          <Listbox.Option
                            key={author.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-2 px-3'
                              )
                            }
                            value={author}
                          >
                            <div className="flex items-center">
                              {author.avatar ? (
                                <img src={author.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                              ) : (
                                <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              )}

                              <span className="ml-3 block truncate font-medium">{author.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

            <Listbox as="div" value={narrative} onChange={setNarrative} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Narrative Style </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      <CalendarIcon
                        className={classNames(
                          narrative.value === null ? 'text-gray-300' : 'text-gray-500',
                          'h-5 w-5 flex-shrink-0 sm:-ml-1'
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          narrative.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {narrative.value === null ? 'Narrative Style' : narrative.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {narrativeStyles.map((dueDate) => (
                          <Listbox.Option
                            key={dueDate.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-2 px-3'
                              )
                            }
                            value={dueDate}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">{dueDate.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>

          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex">
              <button
                type="button"
                className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400 invisible"
              >
                <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
                <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
              </button>

            </div>
            <div className="flex-shrink-0">

              <button
                disabled={isGenerating}
                type="submit"
                className={classNames(isGenerating ? "disabled:opacity-50:" : "", "inline-flex items-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2")}
              >
                {isGenerating ? <span className="animate-pulse"> Generating... </span> : <p>Generate</p>}
              </button>

            </div>
          </div>
        </div>
      </form>

      {thread && (
        <div className='mt-6 rounded-md'>
          <ThreadPreview threadData={thread} />
        </div>
      )}

    </>
  )
}
