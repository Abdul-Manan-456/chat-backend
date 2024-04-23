let onlineUsers = new Map();
// let onlineUsers = [];
export default function (socket, io) {
  //user joins or opens the application
  socket.on("join", (user) => {
    console.log("user joined------", user);
    socket.join(user);
    //add joined user to online users
    onlineUsers.set(user, socket.id);
    console.log("onlineUsers--------------", onlineUsers);

    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
  });

  // Send private Messages
  socket.on("sendMessage", (msg) => {
    console.log("message send---", msg);
    const receiverSocket = onlineUsers.get(msg.receiver_id);
    if (receiverSocket) {
      console.log("receiversocket", receiverSocket);
      console.log("socketId", socket.id);
      io.to(receiverSocket).emit("receiveMessage", msg);
      console.log("receiveMessage---", msg);
    }
  });
  //socket disconnect
  socket.on("disconnect", () => {
    io.emit("get-online-users", onlineUsers);
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  //send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });
}
