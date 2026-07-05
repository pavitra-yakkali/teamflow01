function CalendarToolbar({ onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h2>Calendar</h2>

      <button
        onClick={onAdd}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        + Add Event
      </button>
    </div>
  );
}

export default CalendarToolbar;