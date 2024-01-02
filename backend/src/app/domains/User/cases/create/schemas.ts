// *** body *** //
export const body = {
  type: "object",
  required: ["email", "password", "password_confirm"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    password_confirm: { type: "string" },
    username: { type: "string" },
  },
} as const;
type CreateUserBody = {
  email: string;
  password: string;
  password_confirm: string;
  username?: string;
};
import { z } from "zod";
import { usernameRegExp } from "#domains/User/props/username.ts";
const bodyZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  password_confirm: z.string().min(1),
  username: z.union([z.string().regex(usernameRegExp), z.literal("")]).optional(),
  // username: z.string().optional(),
});

// type CreateUserBody = z.infer<typeof bodyZod>;
export const fromData = (data: unknown) => bodyZod.parse(data);

// *** Success *** //
const success = {
  type: "object",
  required: ["email", "role", "username"],
  properties: {
    email: { type: "string" },
    role: { type: "string" },
    username: { type: "string" },
    // createdAt: { type: Date },
    // updatedAt: { type: Date },
  },
} as const;
import { type UserDocument } from "#domains/User/model.ts";
type CreateUserSuccess = UserDocument;
const response201 = {
  201: {
    description: "Created",
    ...success,
  },
};
type CreateUserReply201 = {
  201: CreateUserSuccess;
};

// *** ServerError *** //
import { type Reply5xx, response5xx } from "#errors/ServerError/schema.ts";
import { type ServerError } from "#errors/ServerError/validator.ts";
interface CreateUserServerError extends ServerError {}
type CreateUserReply5xx = Reply5xx<CreateUserServerError>;

// *** BadRequestError *** //
import { type Reply4xx, response4xx } from "#errors/BadRequestError/schema.ts";
import { type BadRequestError } from "#errors/BadRequestError/validator.ts";
interface CreateUserBadRequestError extends BadRequestError {}
type CreateUserReply4xx = Reply4xx<CreateUserBadRequestError>;

// *** response *** //
export const response = {
  ...response201,
  ...response5xx,
  ...response4xx,
} as const;

type CreateUserReply = CreateUserReply201 &
  CreateUserReply5xx &
  CreateUserReply4xx;

export type CreateUserRoute = {
  Body: CreateUserBody;
  Reply: CreateUserReply;
};
