const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");

const formatMessage = require("./utils/formatMSG");

const app = express();
app.use(cors());

const server = app.listen(4000, (_) => {
  console.log("server is running at port 4000");
});

const io = socketIO(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log("client connected");
  const BOT = "ROOM MANAGER BOT";
  socket.emit("message", formatMessage(BOT, "Welcome to the room"));

  socket.broadcast.emit(
    "message",
    formatMessage(BOT, "Anonymous user joined the room")
  );
  socket.on("disconnect", (_) => {
    io.emit("message", formatMessage(BOT, "Anonymous user leave the room"));
  });
});
