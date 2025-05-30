#  Mini Kanban Board (React)

A simple and responsive Kanban board built with React. It supports task creation, drag-and-drop task management, and persists data using localStorage.

##  Features

- Three columns: **Backlog**, **In Progress**, and **Done**
- Drag and drop tasks between columns
- Add new tasks via modal
- Responsive layout for mobile, tablet, and desktop
- Data persistence with localStorage

##  Tech Stack

- React
- react-beautiful-dnd
- react-responsive

##  Project Setup

1. Clone the repo:
   git clone https://github.com/FarazAkhter660/kanban-board.git
   cd .\kanban-board\

2. npm install

3. npm start

##  Notes

Tasks are fetched from JSONPlaceholder API if no local data is found.

Task states are stored under keys:
"1" → Backlog
"3" → In Progress
"2" → Done