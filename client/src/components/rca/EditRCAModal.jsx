import { useState } from "react";
import { updateRCA } from "../../services/rcaService";

function EditRCAModal({ rca, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: rca.title || "",
    problem: rca.problem || "",
    rootCause: rca.rootCause || "",
    correctiveAction: rca.correctiveAction || "",
    preventiveAction: rca.preventiveAction || "",
    status: rca.status || "Open",
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
      await updateRCA(rca._id, formData);
      alert("RCA updated successfully");
      onUpdated();
    } catch (err) {
      console.error(err);
      alert("Failed to update RCA");
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
          width: "600px",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h2>Edit RCA</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            style={input}
            required
          />

          <textarea
            name="problem"
            placeholder="Problem"
            value={formData.problem}
            onChange={handleChange}
            style={input}
            required
          />

          <textarea
            name="rootCause"
            placeholder="Root Cause"
            value={formData.rootCause}
            onChange={handleChange}
            style={input}
            required
          />

          <textarea
            name="correctiveAction"
            placeholder="Corrective Action"
            value={formData.correctiveAction}
            onChange={handleChange}
            style={input}
            required
          />

          <textarea
            name="preventiveAction"
            placeholder="Preventive Action"
            value={formData.preventiveAction}
            onChange={handleChange}
            style={input}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={input}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              Update RCA
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
};

export default EditRCAModal;