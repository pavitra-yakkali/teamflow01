function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,.15)",
      }}
    >
      <h2
        style={{
          fontSize: "34px",
          marginBottom: "10px",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          fontSize: "18px",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default StatCard;