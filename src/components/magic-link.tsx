'use client'
import { useSupabase } from '../components/supabase-provider';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

import Link from "next/link"
import { useEffect, useState } from 'react';


const Alert = () => {
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-base font-medium text-green-800">Check your email.</h3>
                    <div className="mt-2 text-sm text-green-700">
                        <p>
                            Your MagicLink has been sent. Check your email to verify and login.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default function MagicLinkForm() {
    const { supabase, session } = useSupabase();

    const [loading, setLoading] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        console.log(email)
    }, [email])

    async function signInWithEmail() {
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: 'http://localhost:3000/account',
                },
            })
            setLoading(false)
            setSubmited(true)
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="mt-10 sm:mt-12">
            {submited ? (
                <Alert />
            ) : (
                <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                            />
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                                type="submit"
                                className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                                onClick={() => signInWithEmail()}
                                disabled={loading}
                            >
                                {loading ? 'Authenticating ...' : 'LogIn'}
                            </button>
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                        Start with a free account, no credit card necessary. By providing your email, you agree to
                        our{' '}
                        <Link href="/terms" className="font-medium text-white">
                            terms of service
                        </Link>
                        .
                    </p>
                </form>
            )}


        </div>
    )
}