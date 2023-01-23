'use client'

import { Disclosure } from '@headlessui/react'

import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from "next/link"
import AcccountNav from "./account-nav"

const navigation = [
  { name: 'Threads', href: '/dashboard', icon: HomeIcon, current: false },
  // { name: 'Compose', href: '/dashboard/compose', icon: PencilIcon, current: false },
  // { name: 'Threads', href: '/dashboard/threads', icon: BookOpenIcon, current: false },
  // { name: 'Authors', href: '/dashboard/authors', icon: UserGroupIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface DashboardNavProps {
  children: React.ReactNode;
}



export default function DashboardNavigation({ children }: DashboardNavProps) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <div className="bg-gray-900 pb-32">
          <Disclosure as="nav" className="bg-gray-900">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-800">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Link href={'/dashboard'} className='inline-flex'>
                            <img
                              className="h-8 w-8"
                              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                              alt="Your Company"
                            />
                            <span className='mx-4 text-lg font-semibold text-white'>Dashboard</span>
                          </Link>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">

                          {/* Profile dropdown */}
                          <AcccountNav />

                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">

                    <div className="flex items-center px-5">
                      <AcccountNav />
                    </div>

                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="rounded-lg bg-gray-100 px-5 py-6 shadow sm:px-6">
              {children}
            </div>

            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}

