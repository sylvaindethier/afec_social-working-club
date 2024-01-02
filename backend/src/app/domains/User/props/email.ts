// const emailRegExp =
//   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
import { z } from "zod";
const schema = z.string().email();

/**
 * Validate a string as email
 * @param {string} value The value to validate
 * @returns {boolean} Whether or not the value is a valid email
 */
export function email_validate(value: string): boolean {
  return schema.safeParse(value).success;
}

/**
 * Sanitize an email
 * @param {string} email The email to sanitize
 * @returns {string} The sanitized email
 */
export function email_sanitize(email: string): string {
  const at = email.split("@");
  const domain = at.pop() ?? "";
  const name = at.join("@");

  return `${email_sanitize__name(name)}@${email_sanitize__domain(domain)}`;
}
function email_sanitize__name(name: string): string {
  return `${name.slice(0, 3)}${"*".repeat(3)}`;
  // return name.replace(/.{1,4}$/, "*".repeat(4));
}
function email_sanitize__domain(domain: string): string {
  const dot = domain.split(".");
  const tld = dot.pop();
  // const name = dot.join(".").replace(/.{1,4}$/, "*".repeat(4));
  const name = "*".repeat(3);
  return `${name}.${tld}`;
}
