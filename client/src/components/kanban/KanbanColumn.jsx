function KanbanColumn({
  title,
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
  onComment,
}) {
  const nextStatus = {
    "To Do": "In Progress",
    "In Progress": "Review",
    "Review": "Done",
    "Done": "Done",
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "15px",
        borderRadius: "10px",
        minHeight: "500px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {tasks.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#777",
          }}
        >
          No Tasks
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,.1)",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Assigned:</strong>{" "}
              {task.assignedTo?.name || "Unassigned"}
            </p>

            {/* Attachment */}
            {task.attachment?.path && (
              <p style={{ marginTop: "10px" }}>
                <a
                  href={`http://localhost:5000${task.attachment.path}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  📎 Download Attachment
                </a>
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "15px",
                flexWrap: "wrap",
              }}
            >
              {/* Edit */}
              <button
                onClick={() => onEdit(task)}
                style={{
                  flex: 1,
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit
              </button>

              {/* Comments */}
              <button
                onClick={() => onComment(task)}
                style={{
                  flex: 1,
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                💬 Comments
              </button>

              {/* Move */}
              {title !== "Done" && (
                <button
                  onClick={() =>
                    onStatusChange(task._id, nextStatus[title])
                  }
                  style={{
                    flex: 1,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  ➡️ Move
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() => onDelete(task._id)}
                style={{
                  flex: 1,
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default KanbanColumn;