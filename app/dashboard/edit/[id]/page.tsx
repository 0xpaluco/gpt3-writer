
import 'server-only';

import createServerClient from '../../../../utils/supabase-server';
import { ComposeTextArea } from '../../../../src/components';

// do not cache this page
export const revalidate = 0;

// the user will be redirected to the landing page if they are not signed in
// check middleware.tsx to see how this routing rule is set
export default async function EditThread({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerClient();
  const { data: topics } = await supabase.from('topics').select('*');
  const { data: authors } = await supabase.from('authors').select('*');
  const { data: thread } = await supabase.from('threads').select('*').eq('id', params.id).single();
  
  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-800">Edit Thread</h1>
          </div>
          <div className="mx-auto max-w-7xl px-0 sm:px-6 md:px-8">
            {/* Replace with your content */}

            <div className="py-4">
              <ComposeTextArea topics={topics} authors={authors} threadData={thread} />
            </div>

            {/* /End replace */}
          </div>
        </div>
      </main>

    </>

  );
}