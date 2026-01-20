import './SelectionBox.css';

interface SelectionBoxProps {
  option: string;
  Fighter: string;
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const SelectionBox = ({ option, Fighter, selectedOption, onSelect }: SelectionBoxProps) => {
  const isSelected = Fighter === selectedOption;

  return (
    <div
      className={`selection-box ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(Fighter)}
    >
      <p>{Fighter}</p>
      <p>{option}</p>
    </div>
  );
};
