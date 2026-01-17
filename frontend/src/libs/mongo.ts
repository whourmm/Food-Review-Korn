import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI not defined");
}

/**
 * Global cache type
 * VERY IMPORTANT: promise is Promise<typeof mongoose>
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectMongo() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise && MONGO_URI) {
    cached!.promise = mongoose.connect(MONGO_URI);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
