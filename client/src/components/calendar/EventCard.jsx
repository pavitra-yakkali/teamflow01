function EventCard({ event, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        borderLeft: `6px solid ${event.color}`,
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,.1)",
      }}
    >
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <strong>Start:</strong>{" "}
        {new Date(event.startDate).toLocaleDateString()}
      </p>

      <p>
        <strong>End:</strong>{" "}
        {new Date(event.endDate).toLocaleDateString()}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => onEdit(event)}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(event._id)}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;