import './SelectionBox.css';

interface SelectionBoxProps {
  option: string;
  fighter: string;
  isShown?: boolean;
  elo: number;
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const SelectionBox = ({ option, fighter, elo, isShown,selectedOption, onSelect }: SelectionBoxProps) => {
  const isSelected = fighter === selectedOption;

  return (
    <div
      className={`selection-box ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(fighter)}
    >
      <p>{fighter}</p>
      <p>{option}</p>

      {isShown && (
        <div className="elo-display">
          <p>ELO: {elo}</p>
        </div>
      )}
      
    </div>
  );
};
