export const usernameRegExp = /^\w+$/;

/**
 * Validate a string value as username
 * @param {string} value The string value to validate
 * @returns {boolean} Whether or not the string value is a valid username
 */
export const username_validate = (value: string): boolean =>
  usernameRegExp.test(value);

import { randomUUID } from "node:crypto";
/**
 * Compute a default username
 * @returns {string} A username
 */
export const username_default = (): string =>
  `user_${randomUUID().split("-").pop()}`;
