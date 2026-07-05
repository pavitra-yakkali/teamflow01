import KanbanColumn from "./KanbanColumn";

const columns = [
  "To Do",
  "In Progress",
  "Review",
  "Done",
];

function KanbanBoard({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
  onComment,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginTop: "25px",
      }}
    >
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          title={status}
          tasks={tasks.filter(
            (task) => task.status === status
          )}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
          onComment={onComment}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;