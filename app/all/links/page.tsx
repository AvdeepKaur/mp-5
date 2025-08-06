"use client";
import React, { useState } from "react";

export default function HomeContent() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortened, setShortened] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortened("");

    if (!url || !alias) {
      setError("Both fields are required");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Invalid URL");
      return;
    }

    if (!alias.match(/^[a-zA-Z0-9-_]+$/)) {
      setError(
        "Alias must only use letters, numbers, hyphens, and underscores."
      );
      return;
    }

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alias }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Unknown error");
    else setShortened(data.shortened);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your URL..."
        className="border px-2 py-1 rounded w-full"
        required
      />
      <input
        type="text"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Custom alias (e.g. my-link)"
        className="border px-2 py-1 rounded w-full"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Shorten
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {shortened && (
        <div>
          <span>Shortened URL: </span>
          <input
            readOnly
            value={shortened}
            className="border px-2 py-1 w-80 cursor-copy"
            onClick={(e) => {
              (e.target as HTMLInputElement).select();
              document.execCommand("copy");
            }}
          />
        </div>
      )}
    </form>
  );
}
