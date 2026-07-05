const { Server } = require("socket.io");

let io;

const onlineUsers = {};

const initializeSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    socket.on(
      "join",
      (userId) => {

        onlineUsers[userId] =
          socket.id;

        io.emit(
          "online-users",
          Object.keys(onlineUsers)
        );

      }
    );

    socket.on("send-message", (message) => {
  const receiverSocket = onlineUsers[message.receiver];

  if (receiverSocket) {
    io.to(receiverSocket).emit(
      "receive-message",
      message
    );

    io.to(receiverSocket).emit(
      "new-notification",
      {
        title: "New Message",
        body: `${message.sender.name} sent you a message`,
      }
    );
  }
});

    socket.on(
      "typing",
      (data) => {

        const receiverSocket =
          onlineUsers[data.receiver];

        if (receiverSocket) {

          io.to(receiverSocket).emit(
            "typing",
            data.sender
          );

        }

      }
    );

    socket.on(
      "stop-typing",
      (data) => {

        const receiverSocket =
          onlineUsers[data.receiver];

        if (receiverSocket) {

          io.to(receiverSocket).emit(
            "stop-typing"
          );

        }

      }
    );

    socket.on(
      "disconnect",
      () => {

        for (const user in onlineUsers) {

          if (
            onlineUsers[user] ===
            socket.id
          ) {
            delete onlineUsers[user];
          }

        }

        io.emit(
          "online-users",
          Object.keys(onlineUsers)
        );

        console.log(
          "Disconnected:",
          socket.id
        );

      }
    );

  });

};

module.exports = initializeSocket;