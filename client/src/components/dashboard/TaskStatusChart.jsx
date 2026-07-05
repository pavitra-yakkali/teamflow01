
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#f59e0b",
  "#8b5cf6",
  "#16a34a",
];

function TaskStatusChart({ tasks }) {
  const data = [
    {
      name: "To Do",
      value: tasks.filter(
        (t) => t.status === "To Do"
      ).length,
    },
    {
      name: "In Progress",
      value: tasks.filter(
        (t) => t.status === "In Progress"
      ).length,
    },
    {
      name: "Review",
      value: tasks.filter(
        (t) => t.status === "Review"
      ).length,
    },
    {
      name: "Done",
      value: tasks.filter(
        (t) => t.status === "Done"
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
      <h3>Task Status</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskStatusChart;