import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

export default function KanbanBoard({ children }) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);

  return (
    <DragDropContext>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Kanban Board
      </h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '30%' }}>
          <h3>In Progress</h3>
          <div>
            {inProgressTasks.map((task, index) => (
              <div key={index} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                {task}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '30%' }}>
          <h3>Completed</h3>
          <div>
            {completedTasks.map((task, index) => (
              <div key={index} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                {task}
              </div>
            ))}
          </div>
        </div>
            <Column title={"TO DO"} task={inProgressTasks} id={"1"} />
      </div>
    </DragDropContext>
  );
}