import { Router } from "express";
import { z } from "zod";
import { fighters, getFighter } from "../data/fighters";
import { updateElo } from "../math/evoCalculation";
import { MatchResponse } from "../types/match";
import choosingFighter from "../math/choosingFighter";  

const router = Router();

const MatchSchema = z.object({
  aId: z.string(),
  bId: z.string(),
  winnerId: z.string(),
});

//Get ALL fighters
router.get("/fighters", (_req, res) => {
  res.json({ fighters });
});

//Get current id from fighter list
/*
router.get("/fighter/:id", (req, res) => {

  const { id } = req.params;

  const fighter = getFighter(id);
  if (!fighter) {
    return res.status(404).json({ error: "Fighter not found" });
  }
  res.json(fighter);
});
*/

//Fetching just both fighters
router.post("/fetchFighters", (_req, res) => {

  const { result1, result2 } = choosingFighter(fighters);
  console.log(`Random Elements = ${result1}, ${result2}`);

  res.json({ result1, result2 });

});

router.post("/match", (req, res) => {
  const parsed = MatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
  }

  const { aId, bId, winnerId } = parsed.data;

  if (aId === bId) return res.status(400).json({ error: "aId and bId must differ" });
  if (winnerId !== aId && winnerId !== bId) return res.status(400).json({ error: "winnerId must be aId or bId" });

  const a = getFighter(aId);
  const b = getFighter(bId);
  if (!a || !b) return res.status(404).json({ error: "Fighter not found" });

  const winner = winnerId === aId ? a : b;
  const loser = winnerId === aId ? b : a;

  const { newWinner, newLoser, delta } = updateElo({
    ratingWinner: winner.elo,
    ratingLoser: loser.elo,
    k: 32,
  });

  winner.elo = newWinner;
  loser.elo = newLoser;

  const response: MatchResponse = {
    a,
    b,
    winnerId: winner.id,
    loserId: loser.id,
    delta,
    message: "win",
  };

  res.json(response);
});

export default router;




