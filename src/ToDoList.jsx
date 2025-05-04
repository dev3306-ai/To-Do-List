import React, { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTaskId(id);
    setEditedTask(taskToEdit.text);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedTask } : task
      )
    );
    setEditingTaskId(null);
    setEditedTask("");
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <div className="todo-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="todo-search"
        />
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTask} className="todo-add-btn">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="todo-item">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="todo-edit-input"
                />
                <button onClick={saveEditedTask} className="todo-save-btn">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="todo-text">{task.text}</span>
                <button
                  onClick={() => editTask(task.id)}
                  className="todo-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="todo-delete-btn"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
