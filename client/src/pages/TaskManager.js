import React, { useEffect, useState } from "react";
import axios from "axios";
import './TaskManager.css';


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!taskName.trim()) return;
    await axios.post("http://localhost:5000/api/tasks", { title: taskName });
    setTaskName("");
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: true });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${editId}`, { title: editTitle });
    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (

    <div className="task-manager-container">
  <h2>Task Manager</h2>

  <div className="task-input-group">
    <input
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
      placeholder="Add a new task"
    />
    <button onClick={addTask}>Add</button>
  </div>

  <ul>
    {tasks.map((task) => (
      <li key={task.id} className={task.completed ? "completed" : ""}>
        {editId === task.id ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="task-actions">
              <button onClick={saveEdit}>Save</button>
            </div>
          </>
        ) : (
          <>
            {task.title}
            <div className="task-actions">
              {!task.completed && (
                <button onClick={() => completeTask(task.id)}>Complete</button>
              )}
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
</div>

  );
};

export default TaskManager;
