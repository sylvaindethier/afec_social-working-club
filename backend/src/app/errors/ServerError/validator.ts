import { isError } from "#errors/Error/validator.ts";
export class ServerError extends Error {}
export const isServerError = (error: unknown): error is ServerError =>
  error instanceof ServerError || isError(error);
