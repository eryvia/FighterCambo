import type { Fighter } from "../types/Fighter";

type FetchFightersResponse = {
  result1: Fighter;
  result2: Fighter;
};

export async function fetchFighters(): Promise<Fighter[]> {
  const res = await fetch("/api/fetchFighters");

  if (!res.ok) {
    throw new Error("Failed to fetch fighters");
  }

  const data: FetchFightersResponse = await res.json();

  return [data.result1, data.result2];
}

