import { isErrorName } from "./ErrorName.ts";
interface ValidationError extends Error {}
export const isValidationError =
  isErrorName<ValidationError>("ValidationError");
