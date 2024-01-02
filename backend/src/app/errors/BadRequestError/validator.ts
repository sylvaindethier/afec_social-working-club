import { isZodError } from "#errors/validators/ZodError.ts";
import { isValidationError } from "#errors/validators/ValidationError.ts";
import { isMongoServerError } from "#errors/validators/MongoServerError.ts";

export class BadRequestError extends Error {}
export const isBadRequestError = (error: unknown): error is BadRequestError =>
  error instanceof BadRequestError ||
  isZodError(error) ||
  isValidationError(error) ||
  isMongoServerError(error);
