export type Fighter = {
  id: string;
  name: string;
  elo: number;
  gamePlayed: number;
};

export type MatchRequest = {
  aId: string;
  bId: string;
  winnerId: string;
};

export type MatchResponse = {
  a: Fighter;
  b: Fighter;
  winnerId: string;
  loserId: string;
  delta: number;
  message: "win" | "loss"; 
};
