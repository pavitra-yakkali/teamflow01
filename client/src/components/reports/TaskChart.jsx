import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart({ report }) {
  const data = {
    labels: ["Completed", "Pending"],

    datasets: [
      {
        data: [
          report.completedTasks,
          report.pendingTasks,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "30px auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default TaskChart;