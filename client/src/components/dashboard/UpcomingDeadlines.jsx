function UpcomingDeadlines({ tasks }) {
  const upcoming = [...tasks]
    .filter((task) => task.dueDate)
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Upcoming Deadlines</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming tasks</p>
      ) : (
        upcoming.map((task) => (
          <div
            key={task._id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
            }}
          >
            <strong>{task.title}</strong>

            <p>
              Due:
              {" "}
              {new Date(
                task.dueDate
              ).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UpcomingDeadlines;