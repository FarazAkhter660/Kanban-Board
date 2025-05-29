import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskContainer = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  `;

const textContent = styled.div``;

const Icons = styled.div`
    display: flex;
    justifyContent: end;
    cursor: pointer;
    padding: 0 5px;
    font-size: 16px;
    color: #888;
    &:hover {
      color: #000;
    }
  `;

function bgcolorChange(props) {
    return props.isDragging ? "#lightgreen" : props.isDraggingOver ? props.isBacklog ? "#f2d7d50" : "#DCDCDC" : props.isBacklog ? "#f2d7d50" : "#FFFADA";
}

export default function Task({ task, index }) {
    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <TaskContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                >
                    <div style={{ display: 'flex', justifyContent: 'start', padding: 2 }}>
                        <span>
                            <small>
                                #{task.id}
                                {"  "}
                            </small>
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 2 }}>
                        <textContent>{task.title}</textContent>
                    </div>
                    <Icons>
                        <div>
                            <div
                                style={{ width: 30, height: 30, borderRadius: '50%' }}
                                src={"https://joesch.moe/api/v1/random?key=" + task.id}
                                alt="Avatar"
                            />
                        </div>
                    </Icons>
                    {provided.placeholder}
                </TaskContainer>
            )}
        </Draggable>
    );
}