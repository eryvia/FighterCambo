import { Fighter } from "../types/match";

export const fighters: Fighter[] = [
  { id: "alex", name: "Alex", elo: 123 },
  { id: "paxton", name: "Paxton", elo: 42 },
  { id: "mira", name: "Mira", elo: 80 },
  { id: "zeke", name: "Zeke", elo: 160 }
];

export function getFighter(id: string) {
  return fighters.find(f => f.id === id);
}
