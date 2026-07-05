import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PriorityChart({ tasks }) {
  const data = [
    {
      priority: "Low",
      count: tasks.filter(
        (t) => t.priority === "Low"
      ).length,
    },
    {
      priority: "Medium",
      count: tasks.filter(
        (t) => t.priority === "Medium"
      ).length,
    },
    {
      priority: "High",
      count: tasks.filter(
        (t) => t.priority === "High"
      ).length,
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
      <h3>Priority Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="priority" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityChart;