import { useEffect, useState } from "react";
import type { Fighter } from "../types/Fighter";
import { fetchAllFighters } from "../api/fetchAllFighters";

export default function FighterList() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchAllFighters()
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