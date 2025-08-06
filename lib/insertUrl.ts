import getCollection, { COLLECTION_NAME } from "./db";
import type { Document } from "mongodb";

interface Entry extends Document {
  alias: string;
  url: string;
  createdAt: Date;
}

export async function insertUrl(alias: string, url: string): Promise<Entry> {
  const col = await getCollection<Entry>(COLLECTION_NAME);
  const createdAt = new Date();
  await col.insertOne({ alias, url, createdAt });
  return { alias, url, createdAt };
}
