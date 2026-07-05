import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TaskCompletionChart({ stats }) {
  const data = [
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
    {
      name: "Completed",
      value: stats.completedTasks,
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
      <h3>Task Completion</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskCompletionChart;