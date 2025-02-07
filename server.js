const app = require("./app");
const colors = require("colors");
const { Server } = require("socket.io");
const http = require("http"); // Importă modulul HTTP

// Creează serverul HTTP folosind aplicația Express
const httpServer = http.createServer(app);

// Pornește serverul HTTP
httpServer.listen(3000, () => {
  console.log(
    colors.bgBlue.italic.bold("Server is running. Use our API on port: 3000")
  );
});

/** Socket.IO */
// Inițializează Socket.IO cu serverul HTTP
const io = new Server(httpServer, { cors: { origin: "*" } });

// Configurare evenimente Socket.IO
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat-message", (data) => {
    // Trimite mesajul la toți clienții conectați, mai puțin la cel care a trimis mesajul
    socket.broadcast.emit("chat-message-received", data);
  });

  socket.on("contact-added", (data) => {
    socket.broadcast.emit("contact-added", data);
  });
});

module.exports = { io };
