'use client';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSupabase } from '../../components/supabase-provider';

export const Hero = () => {

  const { supabase, session } = useSupabase();;


  return (
    <main>
      <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">Unleash the Power of GPT-3</span>
                  <span className="block text-indigo-400">Automatically Generate High Quality Twitter Threads</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Create Engaging and Professional Twitter Threads with Just a Few Clicks
                </p>
                <div className="mt-10 sm:mt-12">

                  {!session &&
                    <Auth
                      supabaseClient={supabase}
                      appearance={{ theme: ThemeSupa }}
                      onlyThirdPartyProviders={true}
                      theme='dark'
                      providers={['twitter']}
                      redirectTo='https://localhost:3000/dashboard'
                      magicLink={true}
                    />}

                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More main page content here... */}
    </main>
  );
};
