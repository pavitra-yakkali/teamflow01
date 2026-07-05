import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import socket from "../services/socketService";

import {
  getConversation,
  sendMessage,
  markSeen,
} from "../services/messageService";

import API from "../services/api";

function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  const [notification, setNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadUsers();

    if (!currentUser) return;

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.emit("join", currentUser.id);

    socket.on("receive-message", (message) => {
      if (
        selectedUser &&
        message.sender._id === selectedUser._id
      ) {
        setMessages((prev) => [...prev, message]);

        markSeen(message.sender._id);
      }
    });

    socket.on("typing", () => {
      setTyping(true);
    });

    socket.on("stop-typing", () => {
      setTyping(false);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("new-notification", (data) => {
      setUnreadCount((prev) => prev + 1);

      setNotification(data);

      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.body,
        });
      }

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
      socket.off("stop-typing");
      socket.off("online-users");
      socket.off("new-notification");
    };
  }, [selectedUser]);

  const loadUsers = async () => {
    try {
      const res = await API.get("/auth/users");

      const filtered = res.data.users.filter(
        (user) => user._id !== currentUser.id
      );

      setUsers(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const openConversation = async (user) => {
    setUnreadCount(0);

    setSelectedUser(user);

    try {
      const res = await getConversation(user._id);

      setMessages(res.messages);

      await markSeen(user._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async (formData) => {
    if (!selectedUser) return;

    try {
      const res = await sendMessage(formData);

      setMessages((prev) => [
        ...prev,
        res.message,
      ]);

      socket.emit("send-message", res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#2563eb",
            color: "#fff",
            padding: "15px",
            borderRadius: "10px",
            zIndex: 999,
            width: "250px",
            boxShadow: "0 5px 15px rgba(0,0,0,.2)",
          }}
        >
          <strong>{notification.title}</strong>
          <br />
          {notification.body}
        </div>
      )}

      <div
        style={{
          display: "flex",
          height: "82vh",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <ChatSidebar
          users={users}
          selectedUser={selectedUser}
          onlineUsers={onlineUsers}
          unreadCount={unreadCount}
          onSelect={openConversation}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatHeader
            user={selectedUser}
            onlineUsers={onlineUsers}
          />

          <ChatWindow
            messages={messages}
            currentUser={currentUser}
          />

          {typing && (
            <div
              style={{
                paddingLeft: "20px",
                paddingBottom: "5px",
                color: "#6b7280",
                fontStyle: "italic",
              }}
            >
              Typing...
            </div>
          )}

          <ChatInput
            selectedUser={selectedUser}
            currentUser={currentUser}
            onSend={handleSend}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Chat;