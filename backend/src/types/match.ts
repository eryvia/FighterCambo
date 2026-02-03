export type Fighter = {
  id: string;
  name: string;
  elo: number;
  gamePlayed: number;
};

export type MatchRequest = {
  aId: string;
  bId: string;
  picked: "a" | "b";
};

export type MatchResponse = {
  matchId: string;
  winnerId: string;
  loserId: string;
  delta: number;

  nextA: Fighter;
  nextB: Fighter; 

  message: "win" | "loss"; 
};
