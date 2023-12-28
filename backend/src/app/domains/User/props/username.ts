export const usernameRegExp = /^[._a-z0-9]+$/i;

/**
 * Validate a string as username
 * @param {string} value The value to validate
 * @returns {boolean} Whether or not the value is a valid username
 */
export const username_validate = (value: string): boolean => usernameRegExp.test(value);

import { randomUUID } from "node:crypto";
/**
 * Compute a default username
 * @returns {string} A username
 */
export const username_default = (): string => `username_${randomUUID().replaceAll("-", "_")}`;
