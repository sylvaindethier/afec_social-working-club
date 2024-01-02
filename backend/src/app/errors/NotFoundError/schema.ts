import { error } from "#errors/Error/schema.ts";

// *** NotFoundError *** //
export const notFoundError = { ...error } as const;

export const response404 = {
  "404": {
    description: "Not Found",
    ...notFoundError,
  },
};

import { type NotFoundError } from "./validator.ts";
export type Reply404<TError extends NotFoundError> = {
  "404": TError;
};
