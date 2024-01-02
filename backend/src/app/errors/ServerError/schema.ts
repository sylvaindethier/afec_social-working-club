import { error } from "#errors/Error/schema.ts";

// *** ServerError *** //
export const serverError = { ...error } as const;

export const response5xx = {
  "5xx": {
    description: "Server Error",
    ...serverError,
  },
};

import { type ServerError } from "./validator.ts";
export type Reply5xx<TError extends ServerError> = {
  "5xx": TError;
};
