import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface CardProps {
  card: unknown & { id: string; content: string };
  index: number;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
  onUpdate: (columnId: string, cardId: string, content: string) => void;
}

export const Card = ({
  card,
  index,
  onDelete,
  onUpdate,
  columnId,
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(card.content);

  const handleSave = () => {
    if (value.trim() === "") return;
    onUpdate(columnId, card.id, value);
    setIsEditing(false);
  };

  console.log("Rendering Card:", columnId);

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          className="kanban-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              className="card-edit-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          ) : (
            <div className="card-content" onClick={() => setIsEditing(true)}>
              {card.content}
            </div>
          )}
          {columnId.toLowerCase() == "done" ? null : (
            <button className="delete-btn">
              <MdDelete
                className="delete-icon"
                onClick={() => onDelete(columnId, card.id)}
              />
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};
