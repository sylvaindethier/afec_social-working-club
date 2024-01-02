import { isErrorName } from "./ErrorName.ts";
interface MongoServerError extends Error {}
export const isMongoServerError =
  isErrorName<MongoServerError>("MongoServerError");
