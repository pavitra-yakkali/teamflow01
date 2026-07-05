function RecentActivity({ activities }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p>No Recent Activity</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity._id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "12px 0",
            }}
          >
            <strong>
              {activity.user?.name || "Unknown User"}
            </strong>

            <p>
              <strong>Action:</strong>{" "}
              {activity.action}
            </p>

            <p>
              <strong>Module:</strong>{" "}
              {activity.module}
            </p>

            <p>{activity.description}</p>

            <small
              style={{
                color: "#777",
              }}
            >
              {new Date(
                activity.createdAt
              ).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentActivity;