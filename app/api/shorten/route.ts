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

  if (!alias || typeof alias !== "string" || !alias.match(/^[a-zA-Z0-9-_]+$/)) {
    return NextResponse.json({ error: "Invalid alias" }, { status: 400 });
  }

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Prevent duplicate aliases
  const existing = await getUrl(alias);
  if (existing) {
    return NextResponse.json({ error: "Alias already taken" }, { status: 400 });
  }

  await insertUrl(alias, url);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.json({ shortened: `${baseUrl}/${alias}` });
}
