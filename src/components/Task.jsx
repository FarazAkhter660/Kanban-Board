import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Avatar } from "antd";

const TaskContainer = styled.div`
  border-radius: 12px;
  padding: clamp(12px, 2vw, 16px);
  color: #333;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
  min-height: 120px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin: 8px;
  }
`;

const TextContent = styled.div`
  font-size: clamp(13px, 2vw, 14px);
  line-height: 1.4;
  color: #444;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const TaskId = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "rgba(100, 255, 100, 0.2)"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#f5f5f5"
    : props.isBacklog
    ? "#F2D7D5"
    : "#f0f8ff";
}

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start" }}>
            <TaskId>#{task.id}</TaskId>
          </div>
          <div style={{ margin: "8px 0" }}>
            <TextContent>{task.title}</TextContent>
          </div>
          <Icons>
            <div style={{ flex: 1 }}>
              {task.completed ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>✓ Completed</span>
              ) : (
                <span style={{ color: "#FF9800", fontWeight: "bold" }}>⌛ Pending</span>
              )}
            </div>
            <Avatar
              onClick={() => console.log(task)}
              src={`https://joesch.moe/api/v1/random?key=${task.id}`}
              style={{
                border: "2px solid #fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                width: "32px",
                height: "32px",
              }}
            />
          </Icons>
          {provided.placeholder}
        </TaskContainer>
      )}
    </Draggable>
  );
}
