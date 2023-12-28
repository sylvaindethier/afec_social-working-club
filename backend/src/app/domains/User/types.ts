import { type RoleType } from "#domains/Role/types.ts";

export type UserType = {
  email: string;
  passwordHash: string;
  role: RoleType;
  username: string;
};
