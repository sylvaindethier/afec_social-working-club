import { type FastifyInstance, type RouteShorthandOptions } from "fastify";
import { createUserController } from "./controllers.ts";
import { body, response, type CreateUserRoute } from "./schemas.ts";

export async function createUserRoutes(fastify: FastifyInstance) {
  // Create User (REST)
  const opts_REST = {
    schema: {
      summary: "Create a User (REST)",
      description: "Create a User",
      tags: ["User (REST)"],
      body,
      response,
    },
  } satisfies RouteShorthandOptions;
  fastify.post<CreateUserRoute>("/", opts_REST, createUserController);

  // Create User (Verbose)
  const opts_Verbose = {
    schema: {
      summary: "Create a User (Verbose)",
      description: "Create a User",
      tags: ["User (Verbose)"],
      body,
      response,
    },
  } satisfies RouteShorthandOptions;
  fastify.post<CreateUserRoute>("/create", opts_Verbose, createUserController);
}
