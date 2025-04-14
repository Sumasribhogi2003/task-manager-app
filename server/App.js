const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
