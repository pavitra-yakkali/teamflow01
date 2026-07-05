import { useState } from "react";
import { createProject } from "../../services/projectService";

function CreateProjectModal({ onClose, onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createProject(formData);

      console.log("Project Created:", response);

      alert("Project Created Successfully");

      onProjectCreated();

      onClose();
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          error.response.data.message || "Failed to create project"
        );
      } else {
        console.log(error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Create Project
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6"
          >
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;