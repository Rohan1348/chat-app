const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ------------ deployment
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname1, "../Frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "..", "Frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("successfull.");
  })
}

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// init the server
// Socket.IO is configured with CORS settings, allowing connections from "http://localhost:3000" with credentials.
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    // by writing an origin like this, server will only allow requests from localhost:3000
    credentials: true,
  },
});

// Socket.IO for real-time communication
// maintaining a Map called onlineUsers to track users and their corresponding socket IDs.
global.onlineUsers = new Map();

// this event gets triggered on a new socket connection
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    }
  );

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

// The connection event is triggered when a new socket connection is established.
// The add-user event is handled to add a user to the onlineUsers map.
// The send-msg event is handled to send a message to a specific user using their socket ID.
