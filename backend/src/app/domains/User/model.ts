import { Schema, model, type Model, type Document } from "mongoose";

// *** DocType *** //
import { type UserType } from "./types.ts";
type UserDocType = Omit<UserType, "role"> & {
  role: Schema.Types.ObjectId;
};

// *** Interface *** //
interface UserInterface extends UserDocType {}

// *** Methods *** //
interface UserMethods {}

// *** Virtuals *** //
interface UserVirtuals {}

// *** Model (statics) *** //
interface UserModel
  extends Model<UserInterface, {}, UserMethods, UserVirtuals> {}

// *** schema *** //
import { email_validate, email_sanitize } from "./props/email.ts";
import { username_default, username_validate } from "./props/username.ts";
import { role_defaultAsync } from "./props/role.ts";

const schema = new Schema<
  UserInterface,
  UserModel,
  UserMethods,
  {},
  UserVirtuals
>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: email_validate,
      transform: email_sanitize,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false, // unselect by default
      transform: () => null,
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      // // async default MUST be done in `pre` middleware and not `required`
      // required: true,
      // default: role_defaultAsync,

      transform: (role: Document) => role.toJSON(),
      autopopulate: { select: "name" },
    },

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: username_default,
      validate: username_validate,
    },
  },
  {
    timestamps: true,

    toJSON: {
      // Remove `_id` & `passwordHash`
      // @ts-expect-error: `doc` & `options` never read
      transform: (doc, { _id, passwordHash, ...json }, options) => json,
      // virtuals: true,
    },

    // *** Virtuals *** //
    virtuals: {},

    // *** Methods *** //
    methods: {},

    // *** Statics *** //
    statics: {},
  }
);
schema.pre("save", async function () {
  // set (async) default `role`
  if (undefined === this.role) {
    const role = await role_defaultAsync();
    this.set({ role });
  }
});

// *** DocContents *** //
type WithPartial<K extends keyof T, T> = Omit<T, K> & Partial<Pick<T, K>>;
import { type Types } from "mongoose";
import { type RoleDocument } from "#domains/Role/model.ts";
export type UserDocContents =
  // `role` & `username` have default
  WithPartial<
    "role" | "username",
    // `role` is ref of "Role"
    Omit<UserDocType, "role"> & {
      role: Types.ObjectId | RoleDocument;
    }
  >;

// *** Plugins *** //
// use AutoPopulate plugin
// @see https://plugins.mongoosejs.io/plugins/autopopulate
import mongooseAutoPopulate from "mongoose-autopopulate";
// @ts-expect-error: type of mongooseAutoPopulate not assignable to PluginFunction
schema.plugin(mongooseAutoPopulate);

// *** model *** //
export const User = model<UserInterface, UserModel>("User", schema);
export default User;

// *** Document *** //
export type UserDocument = ReturnType<(typeof User)["hydrate"]>;
