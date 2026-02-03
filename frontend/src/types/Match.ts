import type { Fighter } from "./Fighter";

export type MatchResult = {
  nextA: Fighter;
  nextB: Fighter;
  winnerId: string;
  delta: Record<string, number>; 
};