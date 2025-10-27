import React, { useState, useEffect } from "react";
import './App.css';  // Make sure your CSS file is imported

const API_URL = "http://localhost:5000/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "PUT" });
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async () => {
    if (!text.trim() || !editingTask) return;
    try {
      await fetch(`${API_URL}/update/${editingTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setTasks(tasks.map((task) =>
        task._id === editingTask._id ? { ...task, text } : task
      ));
      setText("");
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="app">
      <h1>React To-Do List</h1>
      <div className="input-container">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editingTask ? "Update task" : "New task"}
          className="input-field"
        />
        <button onClick={editingTask ? editTask : addTask} className="button">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {task.completed ? (
                <s>{task.text}</s>
              ) : (
                <>
                  {task.text}
                  <button
                    onClick={() => completeTask(task._id)}
                    className="complete-button"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setText(task.text);
                    }}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}
