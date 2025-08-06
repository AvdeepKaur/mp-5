import { Collection, Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "mp5";
export const COLLECTION_NAME = "entries";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
}

export default async function getCollection(
  collectionName: string
): Promise<Collection> {
  if (!db) {
    db = await connect();
  }

  return db.collection(collectionName);
}
