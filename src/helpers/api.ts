import { ExtendedRequest, ExtendedResponse } from "../../lib/next-connect.types";
// import * as Sentry from "@sentry/nextjs";

export const ERRORS = {
    BadRequest: {
      status: 400,
      message: "Request has wrong format."
    },
    InvalidArgument: {
        status: 400,
        message: "Check the params."
    },
    Unauthorized: {
      status: 401,
      message: "Authentication credentials not valid."
    },
    Forbidden: {
      status: 403,
      message: "You're missing permission to execute this request."
    },
    Conflict: {
        status: 409,
        message: "Conflict"
    },
    APIError: {
        status: 503,
        message: "API Error"
    },
}

export class ApiError extends Error {

    public response: { status: number; message: string; detail: string };

    constructor(error: { status: number, message: string }, detail: string = "", ...args: undefined[]) {
        super(...args);
        this.name = "ApiError";
        this.response = {status: error.status, message: error.message, detail: detail };
        this.message = detail;
    }
}



/**
Validates data payload of a request
*/
export const assert = (data: any, key: string) => {
    if (!data[key]) {
        throw new ApiError(ERRORS.InvalidArgument, `function called without ${key} param`);
    } else {
        return data[key];
    }
}


/**
Sends a descriptive error response
*/
export const catchErrors = async (promise: Promise<any>) => {
    try {
        return await promise;
    } catch(err: any) {
        throw new ApiError(ERRORS.APIError, err.message);
    }
}


export const onError = async (err: ApiError, _req: ExtendedRequest, res: ExtendedResponse, _next: any ) => {    
    // Sentry.captureException(err);
    res.status(500).end("Something broke!");
}

export const onNoMatch = async (_req: ExtendedRequest, res: ExtendedResponse) => {    
    // Sentry.captureException(err);
    res.status(404).end("Page is not found");
}