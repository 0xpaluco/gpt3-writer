import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export interface ExtendedRequest extends NextApiRequest {
    user: User;
    supabase: SupabaseClient<any, "public", any>
}
export interface ExtendedResponse extends NextApiResponse {
    cookie(name: string, value: string): void;
}
