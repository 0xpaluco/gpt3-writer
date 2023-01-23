
import 'server-only';

import createServerClient from '../../utils/supabase-server';
import { ThreadsTable } from '../../src/components';

// do not cache this page
export const revalidate = 0;

// the user will be redirected to the landing page if they are not signed in
// check middleware.tsx to see how this routing rule is set
export default async function Dashboard() {
  const supabase = createServerClient();
  const { data: threads } = await supabase.from('threads').select('*');

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
         
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}

            <div className="py-4">
              <ThreadsTable threads={threads} />
            </div>

            {/* /End replace */}
          </div>
        </div>
      </main>

    </>

  );
}