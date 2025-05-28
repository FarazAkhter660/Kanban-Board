import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ColumnContainer = styled.div`
  width: 300px;
  min-height: 100px;
  overflow-y: scroll;
  display: flex;
  scrollbar-width: none;
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 16px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ColumnTitle = styled.h3`
  text-align: center;
  padding: 8px;
  background-color: #e0e0e0;
`;

const TaskList = styled.div`
  padding: 3px;
  display: flex;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color 0.2s ease;
  background-color: #f9f9f9;
`;

export default function Column({ title, task, id }) {
  return (
    <ColumnContainer>
      <ColumnTitle
        style={{
          backgroundColor: '#e0e0e0',
          position: 'sticky',
        }}>
        {title}
      </ColumnTitle>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            style={{
              backgroundColor: '#f9f9f9',
              minHeight: '100px',
              padding: '3px',
              display: 'flex',
              flexDirection: 'column',
            }}>
            {task.map((item, index) => (
              <div key={item.id} style={{ padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                {item.content}
              </div>
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  )
}
