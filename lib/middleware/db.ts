import nc from 'next-connect';
import { ExtendedRequest, ExtendedResponse } from "../next-connect.types";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const db = nc<ExtendedRequest, ExtendedResponse>();

async function database(req: ExtendedRequest, res: ExtendedResponse, next: any) {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res })
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session)
        return res.status(401).json({
            error: 'not_authenticated',
            description: 'The user does not have an active session or is not authenticated',
        })


    req.user = session.user
    next();
}

db.use(database);

export default db;