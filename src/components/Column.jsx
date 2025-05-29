import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 350px;
  height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 12px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h3`
  padding: 16px;
  margin: 0;
  text-align: center;
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${props => 
    props.title === "TO DO" ? "#e3f2fd" : 
    props.title === "DONE" ? "#e8f5e9" : "#fff8e1"};
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TaskList = styled.div`
  padding: 12px;
  transition: background-color 0.2s ease;
  background-color: ${props => 
    props.isDraggingOver ? "rgba(200, 200, 200, 0.3)" : "#f8f9fa"};
  min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <Container className="column">
      <Title title={title}>
        {title}
      </Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}