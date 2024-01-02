import { type RouteHandler } from "fastify";
import { fromData, type CreateUserRoute } from "./schemas.ts";
import { createUser } from "./services.ts";
import {
  isBadRequestError,
  BadRequestError,
} from "#errors/BadRequestError/validator.ts";

export const createUserController = (async (request, reply) => {
  try {
    const body = fromData(request.body);

    const { password, password_confirm } = body;
    if (password_confirm !== password) {
      throw new BadRequestError("Password confirm mismatch");
    }

    // discard `password_confirm` & `username` from body
    const { password_confirm: body_password_confirm, username, ...rest } = body;
    const has_username = undefined !== username && !!username;
    const input = has_username ? { ...rest, username } : { ...rest };
 
    const user = await createUser(input);
    return reply.status(201).send(user);
  } catch (error) {
    reply.log.error(error);

    if (isBadRequestError(error)) {
      return reply.status(400).send(error);
    }

    return reply.status(500).send(error as Error);
  }
}) satisfies RouteHandler<CreateUserRoute>;
