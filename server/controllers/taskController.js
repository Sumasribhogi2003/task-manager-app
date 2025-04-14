const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const tasksFilePath = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Read error:", err);
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

exports.getTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

exports.addTask = (req, res) => {
  console.log("Request body:", req.body);  // Log the incoming request body
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const tasks = readTasks();
  const newTask = { id: uuidv4(), title, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
};


exports.updateTask = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  let tasks = readTasks();
  let taskFound = false;

  tasks = tasks.map((task) => {
    if (task.id === id) {
      taskFound = true;
      return { ...task, ...updatedData };
    }
    return task;
  });

  if (!taskFound) {
    return res.status(404).json({ message: "Task not found" });
  }

  saveTasks(tasks);
  res.json({ message: "Task updated" });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const newTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === newTasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  saveTasks(newTasks);
  res.json({ message: "Task deleted" });
};
