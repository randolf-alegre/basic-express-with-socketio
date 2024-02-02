const socketio = require("socket.io");

const socket = (server) => {
  const io = socketio(server);
  io.on("connection", (socket) => {});
  return io;
};

module.exports = socket;
