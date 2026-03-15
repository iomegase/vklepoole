import { MongoClient } from "mongodb";

declare global {
  var __vkMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoConfig() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri || !dbName) {
    return null;
  }

  return { uri, dbName };
}

export function isMongoConfigured() {
  return Boolean(getMongoConfig());
}

export async function getMongoDb() {
  const config = getMongoConfig();

  if (!config) {
    return null;
  }

  if (!global.__vkMongoClientPromise) {
    const client = new MongoClient(config.uri);
    global.__vkMongoClientPromise = client.connect();
  }

  const client = await global.__vkMongoClientPromise;
  return client.db(config.dbName);
}
