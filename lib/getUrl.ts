import getCollection, { COLLECTION_NAME } from "./db";

export async function getUrl(alias: string) {
  const col = await getCollection(COLLECTION_NAME);
  return col.findOne({ alias });
}
