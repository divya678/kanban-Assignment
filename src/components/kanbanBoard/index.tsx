import { DragDropContext } from "@hello-pangea/dnd";
import { useAppContext } from "../../context";
import { Column } from "../columnComp";

export const KanbanBoard = () => {
  const { columns, moveCard } = useAppContext();

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={moveCard}>
        <div className="columns-container">
          {columns.map((column) => (
            <Column column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
