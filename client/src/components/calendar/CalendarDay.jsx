function CalendarDay({ day, tasks }) {
  return (
    <div
      style={{
        minHeight: "150px",
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "10px",
          color: "#2563eb",
        }}
      >
        {day}
      </h3>

      {tasks.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#999",
            fontSize: "12px",
          }}
        >
          No Tasks
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "6px",
              borderRadius: "5px",
              marginBottom: "6px",
              fontSize: "12px",
            }}
          >
            <strong>{task.title}</strong>

            <br />

            {task.priority}
          </div>
        ))
      )}
    </div>
  );
}

export default CalendarDay;