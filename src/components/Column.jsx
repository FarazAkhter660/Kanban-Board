import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  height: ${(props) => (props.isMobile ? "60vh" : "80vh")};
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 8px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    max-height: 60vh;
    margin: 8px 0;
  }

  @media (max-width: 480px) {
    max-height: none;
    margin: 4px 0;
  }
`;

const Title = styled.h3`
  padding: clamp(12px, 2vw, 16px);
  margin: 0;
  text-align: center;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${(props) =>
    props.title === "TO DO"
      ? "#e3f2fd"
      : props.title === "DONE"
      ? "#e8f5e9"
      : "#fff8e1"};
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px;
  }
`;

const TaskList = styled.div`
  padding: 12px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(200, 200, 200, 0.3)" : "#f8f9fa"};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    padding: 10px 8px;
  }
`;

export default function Column({ title, tasks, id, isMobile }) {
  return (
    <Container className="column" isMobile={isMobile}>
      <Title title={title}>{title}</Title>
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
