import './App.css';
import Column from "./components/Column";
import KanbanBoard from './components/KanbanBoard';
import Task from './components/Task';

function App() {
    return (
        <div className="App">
            <Task task={{ id: 1, title: "Sample Task" }} index={0} />
            <KanbanBoard />
        </div>
    );
}

export default App;