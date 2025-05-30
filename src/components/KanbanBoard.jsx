import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useMediaQuery } from "react-responsive";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("1");

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  useEffect(() => {
    const saved = localStorage.getItem("tasks-data");
    if (saved) {
      const { completed, incomplete, inReview } = JSON.parse(saved);
      setCompleted(completed);
      setIncomplete(incomplete);
      setInReview(inReview);
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((json) => {
          setCompleted(json.filter((task) => task.completed));
          setIncomplete(json.filter((task) => !task.completed));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tasks-data",
      JSON.stringify({ completed, incomplete, inReview })
    );
  }, [completed, incomplete, inReview]);

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

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setTaskTitle("");
    setTaskStatus("1");
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      userId: 1,
      id: Date.now(),
      title: taskTitle,
      completed: taskStatus === "2", 
    };
    setNewState(taskStatus, newTask);
    closeModal();
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto 16px",
            padding: "0 12px",
          }}
        >
          <h2
            style={{
              color: "#333",
              fontSize: isMobile ? "22px" : isTablet ? "26px" : "28px",
              fontWeight: "600",
            }}
          >
            PROGRESS BOARD
          </h2>
          <button
            onClick={openModal}
            style={{
              padding: "8px 14px",
              fontSize: "14px",
              borderRadius: "6px",
              backgroundColor: "#3f51b5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Task
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: "1400px",
            width: "100%",
            zIndex: 1,
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task"
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            zIndex: 1000000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>Add New Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="1">BACKLOG</option>
          <option value="3">IN REVIEW</option>
          <option value="2">DONE</option>
        </select>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={closeModal} style={{ padding: "8px 14px" }}>
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            style={{
              padding: "8px 14px",
              backgroundColor: "#3f51b5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
}
