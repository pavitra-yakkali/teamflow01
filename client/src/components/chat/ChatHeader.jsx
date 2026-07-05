function ChatHeader({ user }) {
  if (!user)
    return (
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        Select a user
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>{user.name}</h2>

      <p>{user.role}</p>
    </div>
  );
}

export default ChatHeader;