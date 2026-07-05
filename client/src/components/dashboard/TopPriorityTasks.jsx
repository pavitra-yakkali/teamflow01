function TopPriorityTasks({ tasks }) {
  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>High Priority Tasks</h2>

      {highPriority.length === 0 ? (
        <p>No high priority tasks</p>
      ) : (
        highPriority.map((task) => (
          <div
            key={task._id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
            }}
          >
            <strong>{task.title}</strong>

            <p>{task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TopPriorityTasks;