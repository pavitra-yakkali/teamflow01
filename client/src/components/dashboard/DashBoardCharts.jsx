import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function DashboardCharts({ projects, tasks }) {
  const pieData = [
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "Done").length,
    },
    {
      name: "Pending",
      value: tasks.filter((t) => t.status !== "Done").length,
    },
  ];

  const barData = [
    {
      name: "Projects",
      Total: projects.length,
    },
    {
      name: "Tasks",
      Total: tasks.length,
    },
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-bold mb-5">
          Task Completion
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-bold mb-5">
          Project Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>

            <Bar
              dataKey="Total"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default DashboardCharts;