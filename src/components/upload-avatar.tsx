'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Database } from '../../lib/database.types'
import { useSupabase } from './supabase-provider';
type Profiles = Database['public']['Tables']['profiles']['Row']

interface AvatarProps {
  uid?: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}

export function Avatar({
  uid,
  url,
  size,
  onUpload,
}: AvatarProps) {

  const { supabase, user } = useSupabase();
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

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

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300">Photo</label>
      <div className="mt-1 flex items-center">
        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full text-gray-300"
              width={size}
              height={size}
            />
          ) : (

            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

          )}
        </span>

        <label
          htmlFor="single"
          className="cursor-pointer ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input className='hidden absolute'
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
