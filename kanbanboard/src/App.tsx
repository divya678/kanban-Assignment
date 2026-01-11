import "./App.css";
import { KanbanBoard } from "./components/kanbanBoard";
import { KanbanProvider } from "./context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanProvider>
        <KanbanBoard />
      </KanbanProvider>
    </DndProvider>
  );
}

export default App;
