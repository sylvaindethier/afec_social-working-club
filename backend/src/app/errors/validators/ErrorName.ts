type StringEndWith<End extends string> = `${string}${End}`;
type ErrorName = StringEndWith<"Error">;

const isObject = (object: unknown): object is Object =>
  object instanceof Object || (object != null && "object" === typeof object);

import { isError } from "#errors/Error/validator.ts";
const hasErrorName = (error: unknown, name: ErrorName) =>
  (isError(error) || isObject(error)) && name === error.constructor.name;

export const isErrorName =
  <ErrorType extends Error>(name: ErrorName) =>
  (error: unknown): error is ErrorType =>
    hasErrorName(error, name);
