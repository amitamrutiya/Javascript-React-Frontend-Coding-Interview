import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import "./index.css";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

const App = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("kanbanData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const addTask = (content) => {
    const newTask = { id: `task-${Date.now()}`, content };
    const newTasks = [...data.tasks, newTask];
    const newBoards = {
      ...data.boards,
      todo: [...data.boards.todo, newTask.id],
    };
    setData({ tasks: newTasks, boards: newBoards });
  };

  const onDragStart = (e, boardId, taskIndex) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetBoardId) => {
    const taskIndex = e.dataTransfer.getData("taskIndex");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");

    if (sourceBoardId !== targetBoardId) {
      const task = data.boards[sourceBoardId][taskIndex];

      const newSourceBoard = data.boards[sourceBoardId].filter(
        (_, index) => index !== parseInt(taskIndex)
      );
      const newTargetBoard = [...data.boards[targetBoardId], task];

      setData({
        tasks: data.tasks,
        boards: {
          ...data.boards,
          [sourceBoardId]: newSourceBoard,
          [targetBoardId]: newTargetBoard,
        },
      });
    }
  };

  const getTasksForBoard = (boardId) =>
    data.boards[boardId].map((taskId) =>
      data.tasks.find((task) => task.id === taskId)
    );

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <div className="board-container">
        <Board
          title="To Do"
          tasks={getTasksForBoard("todo")}
          boardId="todo"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
        <Board
          title="In Progress"
          tasks={getTasksForBoard("inProgress")}
          boardId="inProgress"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
        <Board
          title="Completed"
          tasks={getTasksForBoard("completed")}
          boardId="completed"
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </div>
    </div>
  );
};

export default App;
