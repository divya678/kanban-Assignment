import { DragDropContext } from "@hello-pangea/dnd";
import { useAppContext } from "../../context";
import { Column } from "../columnComp";

export const KanbanBoard = () => {
  const { columns, moveCard } = useAppContext();

  // const filteredCards = filterDate
  //   ? cards.filter((card) => {
  //       if (!card.dueDate) return false;

  //       const cardDate = new Date(card.dueDate);
  //       return cardDate.toDateString() === filterDate.toDateString();
  //     })
  //   : cards;

  console.log("Filtered Cards:", columns);

  return (
    <>
      <div className="kanban-board">
        <DragDropContext onDragEnd={moveCard}>
          <div className="columns-container">
            {columns.map((column) => (
              <Column column={column} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
