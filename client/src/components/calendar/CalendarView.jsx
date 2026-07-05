function CalendarView({
  events,
  onEdit,
  onDelete,
}) {
  const today = new Date();

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {[
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ].map((day) => (
        <div
          key={day}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          {day}
        </div>
      ))}

      {days.map((day, index) => {
        const dayEvents = events.filter((event) => {
          const d = new Date(event.startDate).getDate();
          return d === day;
        });

        return (
          <div
            key={index}
            style={{
              minHeight: "120px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <strong>{day}</strong>

            {dayEvents.map((event) => (
              <div
                key={event._id}
                style={{
                  marginTop: "6px",
                  padding: "5px",
                  background: event.color,
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                onClick={() => onEdit(event)}
              >
                {event.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarView;