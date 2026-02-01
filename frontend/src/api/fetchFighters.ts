import type { Fighter, FightersResponse } from "../types/Fighter";

export async function fetchFighters(): Promise<Fighter[]> {
  const res = await fetch("/api/fetchFighters");

  if (!res.ok) {
    throw new Error("Failed to fetch fighters");
  }

  const data: FightersResponse = await res.json();

  return data.fighters;
}
