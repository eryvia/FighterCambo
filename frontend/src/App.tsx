import { SelectionBox } from "./comps/SelectionBox";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import FighterList from "./comps/FigtherList";
import { fetchMatch } from "./api/fetchMatch";
import { fetchFighters } from "./api/fetchFighters";
import type { Fighter } from "./types/Fighter";
import type { Option } from "./comps/SelectionBox";

export default function App() {

  //stored my fighters
  const [fighterA, setFighterA] = useState<Fighter | null>(null);
  const [fighterB, setFighterB] = useState<Fighter | null>(null);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    fetch2Fighters(setFighterA, setFighterB);
  }, []);

  const handleSelect = async (picked: Option) => {
    if (!fighterA || !fighterB) return;

    setIsShown(true);
    setSelectedOption(picked);

    const result = await fetchMatch({
      aId: fighterA.id,
      bId: fighterB.id,
      picked,
    });

    setFighterA(result.nextA);
    setFighterB(result.nextB);

    setSelectedOption(null);
    setIsShown(false);
  };

  return (
    <>
      <BrowserRouter>

       <SelectionBox
        fighter={fighterA?.name ?? "Unknown"}
        option="a"
        elo={fighterA?.elo ?? 0}
        isShown={isShown}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />

      <SelectionBox
        fighter={fighterB?.name ?? "Unknown"}
        option="b"
        elo={fighterB?.elo ?? 0}
        isShown={isShown}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />

      </BrowserRouter>
      <FighterList /> 
    </>
  );
}


function fetch2Fighters(setFighterA: (name: Fighter) => void, setFighterB: (name: Fighter) => void) {
   fetchFighters()
    .then((fighters) => {
      console.log("Fetched Fighters:", fighters);

      setFighterA(fighters[0]);
      setFighterB(fighters[1]);

    })
    .catch(console.error);
}



