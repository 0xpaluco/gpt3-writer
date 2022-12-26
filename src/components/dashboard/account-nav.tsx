'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { Database } from '../../../lib/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function AcccountNav() {
    const { supabase, session, user } = useSupabase();

    const [loading, setLoading] = useState(true)
    const [full_name, setFullname] = useState<Profiles['full_name']>(null)
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
    
    useEffect(() => {
      getProfile()
    }, [session])
  
    async function downloadImage(path: string) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          setAvatarUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error)
        }
      }

    async function getProfile() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`full_name, website, avatar_url`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setFullname(data.full_name)
          if(data.avatar_url) downloadImage(data.avatar_url)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    return (
        <div className="flex flex-shrink-0 bg-gray-700 p-4">
            <Link href="/account" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                    <div>
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            {avatar_url ? (
                                <Image
                                    src={avatar_url}
                                    alt="Avatar"
                                    className="h-full w-full text-gray-300"
                                    width={100}
                                    height={100}
                                />
                            ) : (

                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>

                            )}
                        </span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">{full_name}</p>
                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View Account</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
