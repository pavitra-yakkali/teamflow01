function ChatSidebar({
  users,
  selectedUser,
  onlineUsers,
  unreadCount,
  onSelect,
}) {
  return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #e5e7eb",
        background: "#ffffff",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "20px",
          fontWeight: "bold",
          fontSize: "20px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        Chats
      </div>

      {users.length === 0 ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          No users found
        </div>
      ) : (
        users.map((user) => {
          const isSelected =
            selectedUser?._id === user._id;

          const isOnline = onlineUsers.includes(
            user._id
          );

          return (
            <div
              key={user._id}
              onClick={() => onSelect(user)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                cursor: "pointer",
                background: isSelected
                  ? "#eff6ff"
                  : "#fff",
                borderBottom:
                  "1px solid #f3f4f6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name)
                  }
                  alt={user.name}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                />

                <div>
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {user.name}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: isOnline
                        ? "#16a34a"
                        : "#6b7280",
                    }}
                  >
                    {isOnline
                      ? "Online"
                      : "Offline"}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: isOnline
                      ? "#22c55e"
                      : "#9ca3af",
                  }}
                ></span>

                {unreadCount > 0 &&
                  selectedUser?._id !==
                    user._id && (
                    <span
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "50%",
                        minWidth: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatSidebar;