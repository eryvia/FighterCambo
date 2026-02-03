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
  picked: z.enum(["a", "b"]),
});

//Get ALL fighters
router.get("/fighters", (_req, res) => {
  res.json({ fighters });
});

router.get("/fetchFighters", (_req, res) => {

  const { result1, result2 } = choosingFighter(fighters);
  console.log(`Random Elements = ${result1}, ${result2}`);


  res.json({ result1, result2 });

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


router.post("/match", (req, res) => {
  const parsed = MatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid body",
      details: parsed.error.flatten(),
    });
  }

  const { aId, bId, picked } = parsed.data;

  if (aId === bId) {
    return res.status(400).json({ error: "aId and bId must differ" });
  }

  const a = getFighter(aId);
  const b = getFighter(bId);
  if (!a || !b) return res.status(404).json({ error: "Fighter not found" });

  const winner = picked === "a" ? a : b;
  const loser = picked === "a" ? b : a;

  const { newWinner, newLoser, delta } = updateElo({
    ratingWinner: winner.elo,
    ratingLoser: loser.elo,
    k: 32,
  });

  winner.elo = newWinner;
  loser.elo = newLoser;

  const nextA = b;
  const { result1: candidate1, result2: candidate2 } = choosingFighter(fighters);

  let nextB = candidate1.id !== nextA.id ? candidate1 : candidate2;

  if (nextB.id === nextA.id) {
    nextB = fighters.find((f) => f.id !== nextA.id) ?? nextA;
  }

  return res.json({
    matchId: `${aId}_${bId}_${Date.now()}`,
    winnerId: winner.id,
    delta,
    nextA,
    nextB,
  });
});

export default router;




