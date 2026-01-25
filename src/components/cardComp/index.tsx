import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

interface CardProps {
  card: {
    id: string;
    content: string;
    createdAt: string;
    dueDate?: string; // optional due date
    labels?: { text: string; color: string; emoji?: string }[]; // labels/tags
  };
  index: number;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
  onUpdate: (columnId: string, cardId: string, content: string) => void;
  color?: string;
}

const getProgress = (columnId: string) => {
  if (columnId === "todo") return 20;
  if (columnId === "in-progress") return 60;
  if (columnId === "done") return 100;
  return 0;
};

export const Card = ({
  card,
  index,
  columnId,
  onDelete,
  onUpdate,
  color,
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(card.content);

  const progress = getProgress(columnId);

  const handleSave = () => {
    if (!value.trim()) return;
    onUpdate(columnId, card.id, value);
    setIsEditing(false);
  };

  // Check if overdue
  const isOverdue = card.dueDate ? new Date(card.dueDate) < new Date() : false;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            style={{
              opacity: snapshot.isDragging ? 0.8 : 1,
              boxShadow: snapshot.isDragging
                ? "0px 8px 20px rgba(0,0,0,0.2)"
                : "none",
              borderRadius: 8,
            }}
            className="kanban-card"
          >
            {/* Labels / Tags */}
            {card.labels && card.labels.length > 0 && (
              <div
                className="card-labels"
                style={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                {card.labels.map((label, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: label.color,
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      color: "#fff",
                    }}
                  >
                    {label.emoji && <span>{label.emoji}</span>}
                    <span>{label.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Title / Content */}
            {isEditing ? (
              <input
                className="card-edit-input"
                value={value}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                style={{
                  width: "100%",
                  fontSize: 14,
                  padding: 4,
                  borderRadius: 4,
                }}
              />
            ) : (
              <div
                className="card-content"
                onClick={() => setIsEditing(true)}
                style={{ fontSize: 14, marginBottom: 6, cursor: "pointer" }}
              >
                {card.content}
              </div>
            )}

            {/* Progress Bar */}
            <div
              className="progress-wrapper"
              style={{
                position: "relative",
                height: 7,
                borderRadius: 6,
                background: "#e5e7eb",
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  height: "100%",
                  borderRadius: 6,

                  backgroundColor: color,
                }}
              />
            </div>

            {/* Footer: Created Date + Due Date + Delete */}
            <div
              className="card-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                gap: 8,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <FiCalendar size={14} />
                  <span>{new Date(card.createdAt).toLocaleDateString()}</span>
                </div>
                {card.dueDate && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: isOverdue ? "#ef4444" : "#10b981", // red if overdue, green if upcoming
                      fontWeight: 500,
                    }}
                  >
                    <FiCalendar size={14} />
                    <span>
                      Due: {new Date(card.dueDate).toLocaleDateString()}
                      {isOverdue && " ⚠️"}
                    </span>
                  </div>
                )}
              </div>

              {columnId !== "done" && (
                <div>
                  <MdDelete
                    className="delete-icon"
                    onClick={() => onDelete(columnId, card.id)}
                    style={{ cursor: "pointer", color: "#ef4444" }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};
