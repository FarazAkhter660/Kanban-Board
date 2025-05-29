import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);

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
      case "1":   // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2":  // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case "3":  // IN REVIEW
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
    <div style={{ 
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      padding: '24px'
    }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "24px",
          color: "#333",
          fontSize: "28px",
          fontWeight: "600"
        }}>
          PROGRESS BOARD
        </h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "16px"
        }}>
          <Column title={"TO DO"} tasks={incomplete} id={"1"} />
          <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
          <Column title={"DONE"} tasks={completed} id={"2"} />
        </div>
      </DragDropContext>
    </div>
  );
}