import { SelectionBox } from "./comps/SelectionBox";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import FighterList from "./comps/FigtherList";
import { fetchMatch } from "./api/fetchMatch";
import { fetchFighters } from "./api/fetchFighters";

export default function App() {

  const [aName, setAName] = useState<string | null>(null);
  const [bName, setBName] = useState<string | null>(null);

  const [aElo, setAElo] = useState(123);
  const [bElo, setBElo] = useState(42);

  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [initPhase, setInitPhase] = useState(true);
  const [gameLoop, setGameLoop] = useState(true);
  const [isShown, setIsShown] = useState(false);

  if (initPhase) { 
    fetch2Fighters(setAName, setBName, setAElo, setBElo);
    setInitPhase(false);
  }


  const handleSelect = (fighter: string) => {
    setGameLoop(false); 
    setIsShown(true);
    setSelectedFighter(fighter);

    
    fetchMatch().then((matchData) => {
      console.log("Match Data:", matchData);
    });

  };


  console.log("Selected Fighter:", selectedFighter);

  return (
    <>
      <BrowserRouter>
        <SelectionBox fighter={aName || "Unknown"} option="a" elo={aElo} isShown={isShown} selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
        <SelectionBox fighter={bName || "Unknown"} option="b" elo={bElo} isShown={isShown} selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
      </BrowserRouter>
      <FighterList /> 
    </>
  );
}


function fetch2Fighters(setAName: (name: string) => void, setBName: (name: string) => void, setAElo: (elo: number) => void, setBElo: (elo: number) => void) {
   fetchFighters()
    .then((fighters) => {
      console.log("Fetched Fighters:", fighters);

      setAName(fighters[0].name);
      setBName(fighters[1].name);
      setAElo(fighters[0].elo);
      setBElo(fighters[1].elo);

    })
    .catch(console.error);
}



