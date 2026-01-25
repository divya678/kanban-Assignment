export interface Card {
  id: string;
  content: string; // title
  description?: string;
  status: string; // todo | in-progress | done
  createdAt: string; // ISO string
}

export interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

export type ColumnsState = Column[];
