const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");
const mongoose = require("mongoose");
const User = require("./model/userModel");
const socket = require("socket.io");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch all contacts (username and avatar only)
app.get("/api/contacts", async (req, res) => {
  try {
    const users = await User.find({}, "username avatarImage");
    res.json(users);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// API routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("MongoDB error:", err.message);
  });

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Socket.io setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // frontend origin
    credentials: true,
  },
});

// ✅ Store online users
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
