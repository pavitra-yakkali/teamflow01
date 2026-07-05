function ChatMessage({
  message,
  currentUser,
}) {
  const own =
    message.sender._id === currentUser.id;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: own
          ? "flex-end"
          : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: own
            ? "#2563eb"
            : "#f3f4f6",
          color: own ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
        }}
      >
        {message.message}
      </div>
    </div>
  );
}

export default ChatMessage;