import { error } from "#errors/Error/schema.ts";

// *** BadRequestError *** //
export const badRequestError = { ...error } as const;

export const response4xx = {
  "4xx": {
    description: "Bad Request",
    ...badRequestError,
  },
};

import { type BadRequestError } from "./validator.ts";
export type Reply4xx<TError extends BadRequestError> = {
  "4xx": TError;
};
