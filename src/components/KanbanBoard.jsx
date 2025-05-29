import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useMediaQuery } from "react-responsive";

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview));
        break;
    }
  }

  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1":
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2":
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case "3":
        updatedTask = { ...task, completed: false };
        setInReview([updatedTask, ...inReview]);
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        padding: isMobile ? "12px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "16px" : "24px",
            color: "#333",
            fontSize: isMobile ? "22px" : isTablet ? "26px" : "28px",
            fontWeight: "600",
            padding: isMobile ? "0 8px" : "0",
          }}
        >
          Mini Kanban Board
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            gap: isMobile ? "12px" : "20px",
            flexWrap: "wrap",
            boxSizing: "border-box",
          }}
        >
          <Column title={"BACKLOG"} tasks={incomplete} id={"1"} isMobile={isMobile} />
          <Column title={"IN PROGRESS"} tasks={inReview} id={"3"} isMobile={isMobile} />
          <Column title={"DONE"} tasks={completed} id={"2"} isMobile={isMobile} />
        </div>
      </DragDropContext>
    </div>
  );
}
