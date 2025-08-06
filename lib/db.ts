import { MongoClient, Db, Collection, Document } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI as string;
if (!MONGO_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const DB_NAME = "mp5";
export const COLLECTION_NAME = "entries";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

export default async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  if (!db) {
    db = await connect();
  }
  return db.collection<T>(collectionName);
}
