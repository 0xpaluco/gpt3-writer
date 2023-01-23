'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSupabase } from './supabase-provider';

export default function SupabaseListener({ accessToken }: { accessToken?: string }) {
  const { supabase } = useSupabase();
  const router = useRouter()

  useEffect(() => {

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        // server and client are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [accessToken, router, supabase])

  return null
}