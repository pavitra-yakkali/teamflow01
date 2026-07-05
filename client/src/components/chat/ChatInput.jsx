import { useState, useRef } from "react";
import socket from "../../services/socketService";
import EmojiPickerComponent from "./EmojiPicker";

function ChatInput({
  selectedUser,
  currentUser,
  onSend,
}) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileRef = useRef();

  const handleTyping = (e) => {
    setText(e.target.value);

    if (!selectedUser) return;

    socket.emit("typing", {
      sender: currentUser.id,
      receiver: selectedUser._id,
    });

    setTimeout(() => {
      socket.emit("stop-typing", {
        sender: currentUser.id,
        receiver: selectedUser._id,
      });
    }, 1000);
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setShowEmoji(false);
  };

  const send = () => {
    if (!text.trim() && !selectedFile) return;

    const formData = new FormData();

    formData.append("receiver", selectedUser._id);
    formData.append("message", text);

    if (selectedFile) {
      formData.append(
        "attachment",
        selectedFile
      );
    }

    onSend(formData);

    setText("");
    setSelectedFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px",
        borderTop: "1px solid #ddd",
      }}
    >
      <input
        type="file"
        hidden
        ref={fileRef}
        onChange={(e) =>
          setSelectedFile(e.target.files[0])
        }
      />

      <button
        onClick={() => fileRef.current.click()}
      >
        📎
      </button>

      <input
        value={text}
        onChange={handleTyping}
        placeholder="Type message..."
        style={{
          flex: 1,
          padding: "12px",
        }}
      />

      <button
        onClick={() =>
          setShowEmoji(!showEmoji)
        }
      >
        😀
      </button>

      <button onClick={send}>
        Send
      </button>

      <EmojiPickerComponent
        show={showEmoji}
        onEmojiClick={addEmoji}
      />
    </div>
  );
}

export default ChatInput;