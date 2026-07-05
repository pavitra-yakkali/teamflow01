import StatCard from "./StatCard";

function DashboardCards({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <StatCard
        title="Projects"
        value={stats.totalProjects}
        color="#2563eb"
      />

      <StatCard
        title="Tasks"
        value={stats.totalTasks}
        color="#16a34a"
      />

      <StatCard
        title="Completed"
        value={stats.completedTasks}
        color="#7c3aed"
      />

      <StatCard
        title="Pending"
        value={stats.pendingTasks}
        color="#dc2626"
      />

      <StatCard
        title="Total RCA"
        value={stats.totalRCA}
        color="#ea580c"
      />

      <StatCard
        title="Closed RCA"
        value={stats.closedRCA}
        color="#0891b2"
      />
    </div>
  );
}

export default DashboardCards;