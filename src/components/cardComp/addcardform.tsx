import { useState } from "react";
// import "./styles.css";

interface AddCardFormProps {
  onAdd: (content: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddCardForm = ({ onAdd, isOpen, setIsOpen }: AddCardFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="add-card-btn" onClick={() => setIsOpen(true)}>
        + Add Task
      </button>
    );
  }

  return (
    <div className="add-card-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter card title..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="add-card-actions">
        <button onClick={handleSubmit}>Add</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};
