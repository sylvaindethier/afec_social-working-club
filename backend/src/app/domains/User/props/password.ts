import { hash, compare } from "bcrypt";
import { is_PROD } from "#src/env.ts";
const hash_rounds = is_PROD ? 20 : 5;

/**
 * Hash a password
 * @param {string} password
 * @returns {Promise<string>} The password hash
 */
export async function password_hash(password: string): Promise<string> {
  return await hash(password, hash_rounds);
}

/**
 * Compare a password against a hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>} Whether or not the password compare to a hash
 */
export async function password_compare(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}
