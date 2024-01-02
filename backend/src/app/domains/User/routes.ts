import { type FastifyInstance } from "fastify";
import { createUserRoutes } from "#domains/User/cases/create/routes.ts";

export async function userRoutes(fastify: FastifyInstance) {
  // Create a User
  createUserRoutes(fastify);
}
