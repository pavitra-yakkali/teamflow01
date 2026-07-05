import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CreateProjectModal from "../components/project/CreateProjectModal";
import UpdateProjectModal from "../components/project/UpdateProjectModal";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, [search]);

  const loadProjects = async () => {
    try {
      const res = await getProjects(search);
      setProjects(res.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      alert("Project deleted successfully");
      loadProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + New Project
        </button>
      </div>

      {/* 🔍 Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Click "New Project" to create your first project.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold">
                {project.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {project.description || "No description"}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {project.status}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowUpdateModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(project._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 border-t pt-3 text-sm text-gray-500">
                <p>
                  <strong>Owner:</strong>{" "}
                  {project.owner?.name || "Unknown"}
                </p>

                <p>
                  <strong>Members:</strong>{" "}
                  {project.members?.length || 0}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={loadProjects}
        />
      )}

      {showUpdateModal && (
        <UpdateProjectModal
          project={selectedProject}
          onClose={() =>
            setShowUpdateModal(false)
          }
          onUpdated={() => {
            loadProjects();
            setShowUpdateModal(false);
          }}
        />
      )}
    </Layout>
  );
}

export default Projects;