import { Schema, model, type Model } from "mongoose";

// *** DocType *** //
import { type RoleType } from "./types.ts";
type RoleDocType = RoleType;

// *** Interface *** //
interface RoleInterface extends RoleDocType {}

// *** Methods *** //
interface RoleMethods {}

// *** Virtuals *** //
interface RoleVirtuals {}

// *** Model (statics) *** //
interface RoleModel
  extends Model<RoleInterface, {}, RoleMethods, RoleVirtuals> {
  // findByName(name: string): ReturnType<RoleModel["findOne"]>;
}

// *** schema *** //
const schema = new Schema<
  RoleInterface,
  RoleModel,
  RoleMethods,
  {},
  RoleVirtuals
>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      immutable: true,
    },
  },
  {
    // JSON only return the role.name
    toJSON: {
      // @ts-expect-error: `doc`, `rest`, & `options` never read
      transform: (doc, { name, ...rest }) => name as string,
    },

    // *** Virtuals *** //
    virtuals: {},

    // *** Methods *** //
    methods: {},

    // *** Statics *** //
    statics: {
      // findByName(name: string) {
      //   return this.findOne({ name });
      // },
    },
  }
);

// *** DocContents *** //
export type RoleDocContents = RoleDocType;

  // *** model *** //
export const Role = model<RoleInterface, RoleModel>("Role", schema);
export default Role;

// *** Document *** //
export type RoleDocument = ReturnType<(typeof Role)["hydrate"]>;
