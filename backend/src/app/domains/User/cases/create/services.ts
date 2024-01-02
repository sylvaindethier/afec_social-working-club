import { User, type UserDocContents } from "#domains/User/model.ts";
import { password_hash } from "#domains/User/props/password.ts";
import { getRole, type RoleName } from "#domains/User/props/role.ts";

export type CreateUserInput = {
  email: string;
  password: string;
  username?: string;
  role?: NonNullable<UserDocContents["role"]> | RoleName;
};

async function fromInput(input: CreateUserInput) {
  // hash password
  const { password } = input;
  const passwordHash = await password_hash(password);

  // convert `role` string to RoleDocument
  let { role } = input;
  if ("string" === typeof role) {
    role = await getRole(role);
  }

  // discard `role` & `password` from input
  const { password: input_password, role: input_role, ...rest } = input;
  const contents =
    undefined !== role
      ? { ...rest, passwordHash, role }
      : { ...rest, passwordHash };
  return contents satisfies UserDocContents;
}

export async function createUser(input: CreateUserInput) {
  const contents = await fromInput(input);

  // User.create<DocContents>(docs: (UserInterface | DocContents)[])
  return await User.create(contents satisfies UserDocContents);
}
