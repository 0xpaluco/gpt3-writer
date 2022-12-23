'use client';

import type { Session, User } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useState } from 'react';
import type { TypedSupabaseClient } from '../../app/layout';
import createBrowserClient from '../../utils/supabase-browser';

type MaybeSession = Session | null;
type MaybeUser = User | null;

type SupabaseContext = {
    supabase: TypedSupabaseClient;
    session: MaybeSession
    user?: MaybeUser
};

interface ProvideProps {
    children: React.ReactNode;
    session: MaybeSession;
}

// @ts-ignore
const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({ children, session }: ProvideProps) {
    
    const [supabase] = useState(() => createBrowserClient());

    return (
        <Context.Provider value={{ supabase, session, user: session?.user }}>
            <>{children} </>
        </Context.Provider>
    )
}

export const useSupabase = () => useContext(Context);