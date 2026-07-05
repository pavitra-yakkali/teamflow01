const express = require("express");
console.log("🔥 APP.JS IS RUNNING FROM:", __dirname);
const cors = require("cors");
require("dotenv").config();
console.log("Mongo URI:", process.env.MONGODB_URI);
console.log("🔥 AUTH ROUTES LOADING...");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const rcaRoutes = require("./routes/rcaRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const eventRoutes = require("./routes/eventRoutes");
const http = require("http");
const initializeSocket = require("./socket/socket");
const messageRoutes = require("./routes/messageRoutes");
const reportRoutes = require("./routes/reportRoutes");
const activityRoutes = require("./routes/activityRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const profileRoutes = require("./routes/profileRoutes");
require("./jobs/reminderJob");

const dns=require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"])

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/rca", rcaRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/profile", profileRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to TeamFlow API 🚀");
});
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

const PORT = 5001;

const server = http.createServer(app);

initializeSocket(server);

app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});