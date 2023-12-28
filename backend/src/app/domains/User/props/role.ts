import { getRole } from "#domains/Role/cases/get/services.ts";
import { ROLE } from "#domains/Role/types.ts";

export { getRole } from "#domains/Role/cases/get/services.ts";
export { ROLE, type RoleName } from "#domains/Role/types.ts";
export const role_defaultAsync = async () => await getRole(ROLE.default);
