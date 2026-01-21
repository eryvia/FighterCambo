export function expectedScore(ratingA: number, ratingB: number) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

interface UpdateEloParams {
  ratingWinner: number;
  ratingLoser: number;
  k?: number;
}
export function updateElo({ ratingWinner, ratingLoser, k = 32 }: UpdateEloParams) {
  const expectedWinner = expectedScore(ratingWinner, ratingLoser);
  const expectedLoser = expectedScore(ratingLoser, ratingWinner);

  const newWinner = Math.round(ratingWinner + k * (1 - expectedWinner));
  const newLoser = Math.round(ratingLoser + k * (0 - expectedLoser));

  const delta = newWinner - ratingWinner; // how much winner gained
  return { newWinner, newLoser, delta };
}

/*
function calculateK(gamePlayed: number) {
  return Math.min(32, Math.max(16, 32 - (gamePlayed * 0.5)));
}
  */
//clamp_ts(x, min=FALSE, max=TRUE, filename="", ...)