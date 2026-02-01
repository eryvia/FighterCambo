import { SelectionBox } from "./comps/SelectionBox";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import FighterList from "./comps/FigtherList";
import { fetchMatch } from "./api/fetchMatch";
import { fetchFighters } from "./api/fetchFighters";

export default function App() {

  const [aName, setAName] = useState("alex");
  const [bName, setBName] = useState("paxton");

  console.log(aName, bName);

  const [aElo, setAElo] = useState(123);
  const [bElo, setBElo] = useState(42);

  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [gameLoop, setGameLoop] = useState(true);
  const [isShown, setIsShown] = useState(false);

    useEffect(() => {
    let alive = true;

    fetchFighters()
      .then((fighters) => {
        if (!alive) return;
        setAName(fighters[0].name);
        setBName(fighters[1].name);
        setAElo(fighters[0].elo);
        setBElo(fighters[1].elo);
      })
      .catch(console.error);

    return () => {
      alive = false;
    };
  }, []);

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






