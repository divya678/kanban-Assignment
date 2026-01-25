/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ColumnsState, Card } from "../type";
import type { DropResult } from "@hello-pangea/dnd";

interface ContextType {
  columns: ColumnsState;
  addCard: (columnId: string, content: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  updateCard: (columnId: string, cardId: string, content: string) => void;
  moveCard: (result: DropResult) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const now = new Date().toISOString();
  const [columns, setColumns] = useState<ColumnsState>([
    {
      id: "todo",
      title: "Todo",
      color: "#4A90E2",
      cards: [
        {
          id: "1",
          content: "Complete the Assignment",
          description: "Finish Kanban assignment",
          status: "todo",
          createdAt: now,
        },
        {
          id: "2",
          content: "Create documentation",
          description: "",
          status: "todo",
          createdAt: now,
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "#F5A623",
      cards: [
        {
          id: "3",
          content: "Requirement Gathering",
          description: "Discuss with stakeholders",
          status: "in-progress",
          createdAt: now,
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "#7ED321",
      cards: [
        {
          id: "5",
          content: "Create Sample Doc",
          description: "",
          status: "done",
          createdAt: now,
        },
      ],
    },
  ]);

  const addCard = (columnId: string, content: string) => {
    if (!content.trim()) return;

    const now = new Date().toISOString();

    const newCard: Card = {
      id: Date.now().toString(),
      content,
      description: "",
      status: columnId,
      createdAt: now,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col,
      ),
    );
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col,
      ),
    );
  };

  const updateCard = (columnId: string, cardId: string, content: string) => {
    if (!content.trim()) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === cardId
                  ? {
                      ...c,
                      content,
                    }
                  : c,
              ),
            }
          : col,
      ),
    );
  };

  const moveCard = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        cards: [...col.cards],
      }));

      const sourceCol = newColumns.find((c) => c.id === source.droppableId)!;
      const destCol = newColumns.find((c) => c.id === destination.droppableId)!;

      const [movedCard] = sourceCol.cards.splice(source.index, 1);

      destCol.cards.splice(destination.index, 0, {
        ...movedCard,
        status: destCol.id,
      });

      return newColumns;
    });
  };

  return (
    <AppContext.Provider
      value={{ columns, addCard, deleteCard, updateCard, moveCard }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
};
