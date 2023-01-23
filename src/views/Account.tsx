'use client'

import { useState, useEffect } from 'react'
import { useUser, Session } from '@supabase/auth-helpers-react'
import { Database } from '../../lib/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']
import { useSupabase } from '../components/supabase-provider'
import { Avatar } from '../components/upload-avatar'
import { SignOutButton } from '../components'


export default function Account({ session }: { session?: Session }) {

  const [loading, setLoading] = useState(true)
  const [full_name, setFullName] = useState<Profiles['full_name']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  const { supabase, user } = useSupabase();

  useEffect(() => {
    getProfile()
  }, [session])

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
        setFullName(data.full_name)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    full_name,
    website,
    avatar_url,
  }: {
    full_name: Profiles['full_name']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        full_name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='p-0 sm:p-12'>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-800">Account</h3>
              <p className="mt-1 text-sm text-gray-700">
                Basic account information.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md bg-gray-200">
                <div className="space-y-6 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-700">
                          http://
                        </span>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 bg-gray-100"
                          placeholder="www.example.com"
                          value={website || ''}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 bg-gray-100"
                        placeholder="John Smith"
                        defaultValue={''}
                        value={full_name || ''}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <Avatar 
                    uid={user?.id}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                      setAvatarUrl(url)
                      updateProfile({ full_name, website, avatar_url: url })
                    }}
                  />

                  
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <div>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      onClick={() => updateProfile({ full_name, website, avatar_url })}
                      disabled={loading}
                    >
                      {loading ? 'Loading ...' : 'Update'}
                    </button>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-700" />
        </div>
      </div>

      <SignOutButton></SignOutButton>
    </>
    // <div className="form-widget">
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" type="text" value={session?.user.email} disabled />
    //   </div>
    //   <div>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       id="username"
    //       type="text"
    //       value={username || ''}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="website">Website</label>
    //     <input
    //       id="website"
    //       type="website"
    //       value={website || ''}
    //       onChange={(e) => setWebsite(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <button
    //       className="button primary block"
    //       onClick={() => updateProfile({ username, website, avatar_url })}
    //       disabled={loading}
    //     >
    //       {loading ? 'Loading ...' : 'Update'}
    //     </button>
    //   </div>

    //   <div>
    //     <button className="button block" onClick={() => supabase.auth.signOut()}>
    //       Sign Out
    //     </button>
    //   </div>
    // </div>
  )
}


