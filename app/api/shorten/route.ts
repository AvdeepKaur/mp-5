import { NextRequest, NextResponse } from "next/server";
import { insertUrl } from "@/lib/insertUrl";
import { getUrl } from "@/lib/getUrl";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const { alias, url } = await req.json();

  // Backend-side validation
  if (!alias || typeof alias !== "string" || !alias.match(/^[a-zA-Z0-9-_]+$/)) {
    return NextResponse.json({ error: "Invalid alias" }, { status: 400 });
  }

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // No duplicate alias allowed
  const found = await getUrl(alias);
  if (found) {
    return NextResponse.json({ error: "Alias already taken" }, { status: 400 });
  }

  await insertUrl(alias, url);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.json({ shortened: `${baseUrl}/${alias}` });
}
