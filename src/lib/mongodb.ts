import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

export async function connectDB() {
  // Reuse only if actually connected (1 = connected)
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log("DB Already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
    console.log("DB conected successfully");
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // allow retry on next call
    console.error("DB connection failed:", error);
    throw error; // don't process.exit
  }

  return cached.conn;
}

export default connectDB;
