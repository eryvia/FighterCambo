import { useEffect, useState } from "react";
import type { Fighter } from "../types/Fighter";
import { fetchFighters } from "../api/fighters";

export default function FighterList() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFighters()
      .then(setFighters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {fighters.map(f => (
        <div key={f.id}>
          <strong>{f.name}</strong> — ELO: {f.elo} — Games: {f.gamePlayed}
        </div>
      ))}
    </div>
  );
}