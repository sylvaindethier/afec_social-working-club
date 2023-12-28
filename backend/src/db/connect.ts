import mongoose, { type ConnectOptions } from "mongoose";
import { env } from "#src/env.ts";

/**
 * Connect to the database
 */
export async function db_connect() {
  try {
    const MONGODB_URI = env("APP_MONGODB_URI");
    await mongoose.disconnect();
    await mongoose.connect(MONGODB_URI, {
      // // [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option
      // useNewUrlParser: true,

      // // [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option
      // useUnifiedTopology: true,
    } as ConnectOptions);

    console.info("Connect MongoDB success");
  } catch (error) {
    console.error("Connect MongoDB error", error);
    process.exit(1);
  }
}

/**
 * Disconnect to the database
 */
export async function db_disconnect() {
  try {
    await mongoose.disconnect();

    console.info("Disconnect MongoDB success");
  } catch (error) {
    console.error("Disconnect MongoDB error", error);
  }
}
