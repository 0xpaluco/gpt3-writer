import { ExtendedRequest, ExtendedResponse } from "../../lib/next-connect.types";
import nc from "next-connect";
import { assert, catchErrors, onError, onNoMatch } from "../../src/helpers/api";
import { composeThread, openApiCall } from "../../src/helpers/data";
import { cors, db } from "../../lib/middleware";

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
        const promptResponse = await catchErrors(openApiCall(promptData));

        res.status(201).json({  output: promptResponse });
    })

export default handler;