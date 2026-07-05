function TaskCalendar({ tasks }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "25px",
      }}
    >
      <h2>Upcoming Task Deadlines</h2>

      {tasks.length === 0 ? (
        <p>No Due Tasks</p>
      ) : (
        tasks
          .filter((task) => task.dueDate)
          .sort(
            (a, b) =>
              new Date(a.dueDate) -
              new Date(b.dueDate)
          )
          .map((task) => (
            <div
              key={task._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom:
                  "1px solid #eee",
                padding: "12px 0",
              }}
            >
              <div>
                <strong>{task.title}</strong>

                <p>{task.status}</p>
              </div>

              <div>
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default TaskCalendar;