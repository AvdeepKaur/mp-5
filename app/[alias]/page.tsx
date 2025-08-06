import { getUrl } from "@/lib/getUrl";
import { redirect } from "next/navigation";

interface AliasPageProps {
  params: { alias: string };
}

export default async function AliasPage({ params }: AliasPageProps) {
  const { alias } = params;
  const doc = await getUrl(alias);

  if (!doc) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <h1>404 - Not Found</h1>
        <p>No URL for alias {alias}</p>
      </div>
    );
  }
  redirect(doc.url);
}
