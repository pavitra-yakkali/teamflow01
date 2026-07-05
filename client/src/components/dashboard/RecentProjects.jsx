function RecentProjects({ projects = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No Projects Found
        </p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="border-b last:border-none py-4"
          >
            <h3 className="font-semibold text-lg">
              {project.title}
            </h3>

            <p className="text-gray-600">
              {project.description || "No description"}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm text-white ${
                project.status === "Completed"
                  ? "bg-green-500"
                  : project.status === "Active"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
              }`}
            >
              {project.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentProjects;