import { Droppable } from "@hello-pangea/dnd";
import { Card } from "../cardComp";
import { AddCardForm } from "../cardComp/addcardform";
import { useAppContext } from "../../context";
import type { Column as ColumnType } from "../../type";
import { useState } from "react";
import DateFilter from "../card-filter";

interface ColumnProps {
  column: ColumnType;
}

export const Column = ({ column }: ColumnProps) => {
  const { addCard, deleteCard, updateCard } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  return (
    <div className="kanban-column">
      <div className="column-header" style={{ backgroundColor: column.color }}>
        <span>{column.title}</span>
        <span>
          {" "}
          {column.cards.length > 0 ? ` ${column.cards.length} Total` : ""}
        </span>
      </div>
      <DateFilter value={filterDate} onChange={setFilterDate} />
      <AddCardForm
        onAdd={(content: string) => addCard(column.id, content)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div
            className="card-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card?.id}
                card={card}
                index={index}
                columnId={column?.id}
                onDelete={deleteCard}
                onUpdate={updateCard}
                color={column.color}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
