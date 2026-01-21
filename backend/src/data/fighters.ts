import { Fighter } from "../types/match";

export const fighters: Fighter[] = [
  { id: "alex", name: "Alex", elo: 123, gamePlayed: 10 },
  { id: "paxton", name: "Paxton", elo: 42, gamePlayed: 5 },
  { id: "mira", name: "Mira", elo: 80, gamePlayed: 7 },
  { id: "zeke", name: "Zeke", elo: 160, gamePlayed: 12 }
];

export function getFighter(id: string) {
  return fighters.find(f => f.id === id);
}
