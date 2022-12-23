import 'server-only'

import '../styles/globals.css'
import { NextSeo } from 'next-seo';
import SupabaseListener from '../src/components/supabase-listener'
import createClient from '../utils/supabase-server'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../lib/database.types';
import SupabaseProvider from '../src/components/supabase-provider';

export type TypedSupabaseClient = SupabaseClient<Database>;

interface LayoutProps {
  children: React.ReactNode;
}

export const revalidate = 0

export default async function RootLayout({ children }: LayoutProps) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" className='bg-gray-900'>
      <head>
        {/* Used to be added by default, now we need to add manually */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {/* 
          Anything we add in layout will appear on EVERY PAGE. At present it can not be overridden lower down the tree.
          This can be useful for things like favicons, or other meta tags that are the same on every page.
        */}
        <NextSeo
          useAppDir={true}
          facebook={{ appId: '1234567890' }}
          themeColor="#73fa97"
          titleTemplate="%s | Next SEO"
        />
      </head>
      <body className='bg-gray-900'>
        <SupabaseProvider session={session}>
          <SupabaseListener accessToken={session?.access_token} />
          
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}