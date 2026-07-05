import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

function ProjectProgressChart({ stats }) {
  const total =
    stats.totalTasks || 1;

  const percent = Math.round(
    (stats.completedTasks / total) * 100
  );

  const data = [
    {
      name: "Progress",
      value: percent,
      fill: "#16a34a",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h3>Project Progress</h3>

      <ResponsiveContainer width="100%" height={320}>
        <RadialBarChart
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            dataKey="value"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <h2
        style={{
          textAlign: "center",
        }}
      >
        {percent}%
      </h2>
    </div>
  );
}

export default ProjectProgressChart;