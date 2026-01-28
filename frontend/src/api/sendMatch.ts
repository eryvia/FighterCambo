// src/api/fighters.ts
import type { Match } from "../types/Match";

export async function fetchMatch(): Promise<Match[]> {
  const res = await fetch("http://localhost:3001/api/match");

  if (!res.ok) {
    throw new Error("Failed to fetchMatch");
  }

  const data: Match[] = await res.json();

  return data;
}
