import { Role, type RoleDocContents } from "#domains/Role/model.ts";
type CreateRoleInput = RoleDocContents;

async function fromInput(input: CreateRoleInput) {
  const { ...rest } = input;

  const contents = { ...rest };
  return contents satisfies RoleDocContents;
}

export async function createRole(input: CreateRoleInput) {
  const contents = await fromInput(input);
  return await Role.create(contents satisfies RoleDocContents);
}
