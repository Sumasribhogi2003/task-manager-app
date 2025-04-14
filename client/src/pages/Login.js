import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      if (res.data.success) {
        navigate("/tasks");
      }
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
  
      <div className="input-group">
        <input
          type="text"
          id="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username">Username</label>
      </div>
  
      <div className="input-group">
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
      </div>
  
      <button onClick={handleLogin}>Login</button>
    </div>
  );
  
};  

export default Login;
