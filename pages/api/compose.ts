import { ExtendedRequest, ExtendedResponse } from "../../lib/next-connect.types";
import nc from "next-connect";
import { assert, catchErrors, onError, onNoMatch } from "../../src/helpers/api";
import { composeThread, openApiCall } from "../../src/helpers/data";
import { cors, db } from "../../lib/middleware";
import { CreateCompletionResponse } from "openai";

export const config = {
  api: {
    externalResolver: true,
  },
}

const handler = nc<ExtendedRequest, ExtendedResponse>({ onError, onNoMatch, attachParams: true });

handler
  .use(cors)
  .use(db)
  .post(async (req, res) => {

    const promptData = assert(req.body, 'prompt');
    const promptResponse: CreateCompletionResponse = await catchErrors(openApiCall(promptData));
    const output = promptResponse.choices.pop();

    console.log(promptResponse.usage);

    let { data: stats } = await req.supabase
      .from('stats')
      .select(`used_tokens, remaining_tokens`)
      .eq('id', req.user.id)
      .single()

    const total_used_tokens = promptResponse.usage?.total_tokens ? promptResponse.usage?.total_tokens : 0

    const updates = {
      id: req.user.id,
      used_tokens: stats?.used_tokens + total_used_tokens,
      remaining_tokens: stats?.remaining_tokens - total_used_tokens,
      updated_at: new Date().toISOString(),
    }

    let { error } = await req.supabase.from('stats').upsert(updates)
    if (error) {
      throw error;
    }
    
    res.status(201).json({ output });
  })

export default handler;