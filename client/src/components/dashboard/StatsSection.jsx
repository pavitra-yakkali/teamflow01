import StatCard from "./StatCard";

function StatsSection({ projects = [], tasks = [] }) {
  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pending = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const review = tasks.filter(
    (task) => task.status === "Review"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const completionRate =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Projects"
          value={projects.length}
          color="#2563eb"
        />

        <StatCard
          title="Tasks"
          value={tasks.length}
          color="#16a34a"
        />

        <StatCard
          title="Completed"
          value={completed}
          color="#22c55e"
        />

        <StatCard
          title="Pending"
          value={pending}
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Task Overview
          </h3>

          <p>🟢 Completed: {completed}</p>
          <p>🟡 In Progress: {inProgress}</p>
          <p>🟠 Review: {review}</p>
          <p>🔵 Pending: {pending}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            High Priority
          </h3>

          <h1 className="text-5xl font-bold text-red-600">
            {highPriority}
          </h1>

          <p className="text-gray-500 mt-2">
            High-priority tasks
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Completion Rate
          </h3>

          <div className="w-full bg-gray-200 rounded-full h-5">
            <div
              className="bg-green-500 h-5 rounded-full"
              style={{
                width: `${completionRate}%`,
              }}
            ></div>
          </div>

          <p className="mt-3 font-semibold">
            {completionRate}% Completed
          </p>
        </div>

      </div>
    </>
  );
}

export default StatsSection;