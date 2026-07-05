import { useEffect, useState } from "react";
import { createTask } from "../../services/taskService";
import { getProjects } from "../../services/projectService";
import { uploadFile } from "../../services/uploadService";
import API from "../../services/api";

function CreateTaskModal({ onClose, onTaskCreated }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectRes = await getProjects();
      setProjects(projectRes.projects);

      const userRes = await API.get("/auth/users");
      setUsers(userRes.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachment = null;

      // Upload attachment if selected
      if (selectedFile) {
        const uploadRes = await uploadFile(selectedFile);
        attachment = uploadRes.file;
      }

      await createTask({
        ...formData,
        attachment,
      });

      alert("Task Created Successfully");

      onTaskCreated();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to create task");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "550px",
          padding: "25px",
          borderRadius: "10px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>Create Task</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={input}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={input}
          />

          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
            style={input}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}
          </select>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            style={input}
          >
            <option value="">Assign User</option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={input}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={input}
          />

          {/* File Upload */}

          <div style={{ marginTop: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Attachment
            </label>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />

            {selectedFile && (
              <p
                style={{
                  marginTop: "8px",
                  color: "#2563eb",
                  fontSize: "14px",
                }}
              >
                📎 {selectedFile.name}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "25px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxSizing: "border-box",
};

export default CreateTaskModal;