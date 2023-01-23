import { useSupabase } from "../supabase-provider"

export default function SignOutButton() {
  
  const { supabase } = useSupabase();

  async function signOut() {

    const { error } = await supabase.auth.signOut()
  }

  return (

    <div className='mt-4 p-0 sm:p-12'>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-800 mb-6">Sign Out</h3>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Sign out of your account</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Once you sign out of your account, you will have to request a new magic link.</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
