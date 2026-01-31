import type { Fighter, FightersResponse } from "../types/Fighter";

export async function fetchFighters(): Promise<Fighter[]> {
  const res = await fetch("http://localhost:3001/api/fetchFighters");

  if (!res.ok) {
    throw new Error("Failed to fetch fighters");
  }

  const data: FightersResponse = await res.json();

  return data.fighters;
}
