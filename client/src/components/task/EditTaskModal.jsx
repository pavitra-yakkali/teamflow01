import { useEffect, useState } from "react";
import { updateTask } from "../../services/taskService";

function EditTaskModal({
  task,
  onClose,
  onTaskUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        status: task.status || "To Do",
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTask(task._id, {
        ...formData,
        assignedTo: task.assignedTo?._id,
      });

      alert("Task updated successfully");

      onTaskUpdated();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h2>Edit Task</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Done</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 20px",
              background: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;