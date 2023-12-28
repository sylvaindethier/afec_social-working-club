export const ROLE = {
  default: "user",
  user: "user",
  modo: "moderator",
  admin: "administrator",
} as const;

type ObjectValues<T> = T[keyof T];
export type RoleName = ObjectValues<typeof ROLE>;

export type RoleType = {
  name: RoleName;
};
