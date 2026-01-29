import { Fighter } from "../types/match";

export default function choosingFighter(fighters: Fighter[]) {
  const shuffled = [...fighters].sort(() => Math.random() - 0.5);
  const [result1, result2] = shuffled.slice(0, 2);
  return { result1, result2 };
}