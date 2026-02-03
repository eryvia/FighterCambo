// SelectionBox.tsx
import "./SelectionBox.css";

export type Option = "a" | "b";

interface SelectionBoxProps {
  option: Option;
  fighter: string;
  elo: number;
  isShown?: boolean;
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
}

export const SelectionBox = ({
  option,
  fighter,
  elo,
  isShown,
  selectedOption,
  onSelect,
}: SelectionBoxProps) => {
  const isSelected = option === selectedOption;

  return (
    <div
      className={`selection-box ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(option)}
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
