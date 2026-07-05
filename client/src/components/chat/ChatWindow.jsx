import { useEffect, useRef } from "react";

function ChatWindow({
  messages,
  currentUser,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        background: "#f1f5f9",
      }}
    >
      {messages.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#777",
            fontSize: "18px",
          }}
        >
          💬 No messages yet.
          <br />
          Start the conversation!
        </div>
      ) : (
        messages.map((msg) => {
          const own =
            msg.sender._id === currentUser.id;

          return (
            <div
              key={msg._id}
              style={{
                display: "flex",
                justifyContent: own
                  ? "flex-end"
                  : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  background: own
                    ? "#2563eb"
                    : "#ffffff",
                  color: own
                    ? "#fff"
                    : "#111827",
                  padding: "12px",
                  borderRadius: "14px",
                  maxWidth: "70%",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {!own && (
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#2563eb",
                      marginBottom: "5px",
                    }}
                  >
                    {msg.sender.name}
                  </div>
                )}

                {msg.message && (
                  <div
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.message}
                  </div>
                )}

                {msg.attachment && (
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {msg.attachment.mimetype?.startsWith(
                      "image"
                    ) ? (
                      <img
                        src={`http://localhost:5000${msg.attachment.path}`}
                        alt="attachment"
                        style={{
                          width: "220px",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <a
                        href={`http://localhost:5000${msg.attachment.path}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: own
                            ? "#fff"
                            : "#2563eb",
                          textDecoration:
                            "underline",
                        }}
                      >
                        📎 {msg.attachment.filename}
                      </a>
                    )}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginTop: "8px",
                    fontSize: "12px",
                    opacity: 0.8,
                  }}
                >
                  <span>
                    {formatTime(
                      msg.createdAt
                    )}
                  </span>

                  {own && (
                    <span>
                      {msg.isSeen
                        ? "✔✔ Seen"
                        : msg.isDelivered
                        ? "✔✔ Delivered"
                        : "✔ Sent"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatWindow;