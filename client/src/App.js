import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TaskManager from "./pages/TaskManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskManager />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
