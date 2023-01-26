'use client';

import { Session } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { useSupabase } from "../supabase-provider"
import { Database } from '../../../lib/database.types'
type Stats = Database['public']['Tables']['stats']['Row']

export interface Stat {
    name: string,
    number: string
}

interface StatsProps {
    session?: Session
}


export default function Stats({ session }: StatsProps) {

    const [loading, setLoading] = useState(true)
    const { supabase, user } = useSupabase();
    const [stats, setStats] = useState<Stat[]>([])

    useEffect(() => {
        getStats()
    }, [session])

    async function getStats() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('stats')
                .select(`used_tokens, remaining_tokens`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                const ammountToPay = (data.used_tokens / 1000) * 0.06
                setStats([{ name: 'Used Tokens', number: `${data.used_tokens}` }, { name: 'Amount To Pay', number: `$${ammountToPay}` }])
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-4 p-0 sm:p-12'>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-800">Stats</h3>
                        <p className="mt-1 text-sm text-gray-700">
                            Token usage information.
                        </p>
                    </div>
                </div>

                <div className="mt-5 md:col-span-2 md:mt-0">
                    <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {stats.map((item) => (
                            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.number}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>


    )
}
