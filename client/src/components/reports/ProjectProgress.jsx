function ProjectProgress({ report }) {
  const progress = report.totalTasks
    ? Math.round(
        (report.completedTasks /
          report.totalTasks) *
          100
      )
    : 0;

  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <h2>Overall Progress</h2>

      <div
        style={{
          background: "#ddd",
          borderRadius: "8px",
          height: "25px",
        }}
      >
        <div
          style={{
            width: progress + "%",
            height: "25px",
            background: "#2563eb",
            borderRadius: "8px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default ProjectProgress;