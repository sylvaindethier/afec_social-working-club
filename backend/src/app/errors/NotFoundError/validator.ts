import { isError } from "#errors/Error/validator.ts";

export class NotFoundError extends Error {}
export const isNotFoundError = (error: unknown): error is NotFoundError =>
  error instanceof NotFoundError || isError(error);
