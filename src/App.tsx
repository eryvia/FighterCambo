import { SelectionBox } from "./comps/SelectionBox";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import fightersData from "./inforoot/fighter.json";


export default function App() {

  const a: string = "alex";
  const b: string = "paxton";

  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [newSetOfOptions, setNewSetOfOptions] = useState(true);
  const [isShown, setIsShown] = useState(true);

  const handleSelect = (fighter: string) => {
    setSelectedFighter(fighter);
    compareOptions({a, b});
  };

  console.log("Selected Fighter:", selectedFighter);

  return (
    <>
      <BrowserRouter>
        <SelectionBox Fighter="Paxton" option="a" selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
        <SelectionBox Fighter="Alex" option="b" selectedOption={selectedFighter || ""} onSelect={handleSelect}/>
      </BrowserRouter>
    </>
  );
}


function compareOptions({a, b}: {a: string, b: string}) {
  const optionA = fightersData.Fighters.find(f => f.name === a)?.elo;
  const optionB = fightersData.Fighters.find(f => f.name === b)?.elo;

  if (optionA && optionB) {
    if (optionA > optionB) {
      console.log(`${a} is better than ${b}`);
    } else if (optionA < optionB) {
      console.log(`${b} is better than ${a}`);
    } else {
      console.log(`${a} and ${b} are equally matched`);
    }


    return (
      <div>
      </div>
    );

  }

}
