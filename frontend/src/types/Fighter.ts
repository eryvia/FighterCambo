

// src/types/Fighter.ts\
export type Fighter = {
  id: string;
  name: string;
  elo: number;
  gamePlayed: number;
};

export type FightersResponse = {
  fighters: Fighter[];
};
