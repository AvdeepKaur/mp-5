import { getUrl } from "@/lib/getUrl";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { alias: string } }) {
  const { alias } = params;
  const doc = await getUrl(alias);

  if (!doc) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <h1>404 - Not Found</h1>
        <p>No URL for alias &quot;{alias}&quot;</p>
      </div>
    );
  }
  redirect(doc.url);
}
