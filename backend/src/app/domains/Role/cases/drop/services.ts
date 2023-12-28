import { Role } from "#domains/Role/model.ts";
export const dropRole = async () => await Role.collection.drop();
