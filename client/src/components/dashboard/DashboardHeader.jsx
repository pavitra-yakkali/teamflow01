function DashboardHeader({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1>{greeting}, {user?.name || "User"} 👋</h1>

        <p style={{ color: "#666" }}>
          Here's what's happening in TeamFlow today.
        </p>
      </div>

      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "15px 25px",
          borderRadius: "12px",
        }}
      >
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

export default DashboardHeader;