import {
  Role,
  type RoleDocContents,
  type RoleDocument,
} from "#domains/Role/model.ts";
import { type RoleName } from "#domains/Role/types.ts";

type GetRoleInput = RoleDocContents | RoleName;

async function fromInput(input: GetRoleInput) {
  const contents = "string" === typeof input ? { name: input } : input;
  return contents satisfies RoleDocContents;
}

const map = new Map<RoleName, RoleDocument>();

export async function getRole(input: GetRoleInput) {
  const { name } = await fromInput(input);
  if (map.has(name)) {
    const role = map.get(name);
    if (undefined === role) {
      throw Error(`Role '${name}' undefined`);
    }
    return role;
  }

  const role = await Role.findOne({ name });
  if (null === role) {
    throw Error(`Role '${name}' not found`);
  }

  map.set(name, role);
  return role;
}
