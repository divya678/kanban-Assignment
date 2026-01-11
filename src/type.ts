export interface Card {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

export type ColumnsState = Column[];
