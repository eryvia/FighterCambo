import { SelectionBox } from "./comps/SelectionBox";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import fightersData from "./inforoot/fighter.json";
import FighterList from "./comps/FigtherList";
import { fetchMatch } from "./api/fetchMatch";

export default function App() {

  const [aName, setAName] = useState("alex");
  const [bName, setBName] = useState("paxton");
  
  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [gameLoop, setGameLoop] = useState(true);
  const [isShown, setIsShown] = useState(false);

  const aElo: number = fightersData.Fighters.find(f => f.name === aName)?.elo || 123;
  const bElo: number = fightersData.Fighters.find(f => f.name === bName)?.elo || 42;


  const handleSelect = (fighter: string) => {
    setGameLoop(false); //GameLoop 
    setIsShown(true);
    setSelectedFighter(fighter);

    //Fetch match after selection
    fetchMatch().then((matchData) => {
      console.log("Match Data:", matchData);
    });

  };

  console.log("Selected Fighter:", selectedFighter);

  return (
    <>
      <BrowserRouter>
        <SelectionBox fighter="Paxton" option="a" elo={aElo} isShown={isShown} selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
        <SelectionBox fighter="Alex" option="b" elo={bElo} isShown={isShown} selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
      </BrowserRouter>
      <FighterList /> 
    </>
  );
}






