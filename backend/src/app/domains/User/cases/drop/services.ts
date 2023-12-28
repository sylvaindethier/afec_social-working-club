import { User } from "#domains/User/model.ts";
export const dropUser = async () => await User.collection.drop();
