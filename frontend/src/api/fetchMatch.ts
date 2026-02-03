// src/api/fetchMatch.ts
import type { MatchResult } from "../types/Match";
import type { Option } from "../comps/SelectionBox";

export async function fetchMatch(params: {
  aId: string;
  bId: string;
  picked: Option;
}): Promise<MatchResult> {
  const res = await fetch("http://localhost:3001/api/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Failed to fetchMatch");
  return res.json();
}