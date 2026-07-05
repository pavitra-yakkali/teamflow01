function RecentTasks({ tasks }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "30px",
      }}
    >
      <h2>Recent Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            padding: "12px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>{task.title}</strong>

          <p>{task.assignedTo?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default RecentTasks;