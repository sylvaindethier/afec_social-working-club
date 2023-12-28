// Configure dotenv
import { env } from "#src/env.ts";

// * DB Connect * //
import { db_connect } from "./connect.ts";
await db_connect();

// ************************* //
// * reset Role collection * //
// ************************* //
import { dropRole } from "#domains/Role/cases/drop/services.ts";
await dropRole();

import { createRole } from "#domains/Role/cases/create/services.ts";
import { ROLE } from "#domains/Role/types.ts";
// *** Create "admin" Role *** //
//// @ts-expect-error: `adminRole` never read
const adminRole = await createRole({ name: ROLE.admin });
console.info("admin Role", adminRole);

// *** Create "modo" Role *** //
//// @ts-expect-error: `modoRole` never read
const modoRole = await createRole({ name: ROLE.modo });
console.info("modo Role", modoRole);

// *** Create "default" Role *** //
//// @ts-expect-error: `defaultRole` never read
const defaultRole = await createRole({ name: ROLE.default });
console.info("default Role", defaultRole);

// ************************* //
// * reset User collection * //
// ************************* //
import { dropUser } from "#domains/User/cases/drop/services.ts";
await dropUser();

import { createUser } from "#domains/User/cases/create/services.ts";
// *** Create "admin" User *** //
const admin_email = env("APP_ADMIN_EMAIL");
const admin_password = env("APP_ADMIN_PASSWORD");
const adminUser = await createUser({
  email: admin_email,
  password: admin_password,
  role: adminRole,
  username: "admin",
});
console.info("admin User", adminUser);

// *** Create "modo" User *** //
const modo_email = env("APP_MODO_EMAIL");
const modo_password = env("APP_MODO_PASSWORD");
const modoUser = await createUser({
  email: modo_email,
  password: modo_password,
  role: modoRole,
  username: "modo",
});
console.info("modo User", modoUser);

process.exit(0);
