import { useEffect, useState } from "react";

import { createRCA } from "../../services/rcaService";

import { getProjects } from "../../services/projectService";

function CreateRCAModal({
  onClose,
  onCreated,
}) {
  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      project: "",
      problem: "",
      rootCause: "",
      correctiveAction: "",
      preventiveAction: "",
    });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.projects);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await createRCA(formData);

    onCreated();
  };

  return (
    <div className="modal">

      <form onSubmit={submit}>

        <h2>Create RCA</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <select
          name="project"
          onChange={handleChange}
        >
          <option>Select</option>

          {projects.map((p) => (

            <option
              key={p._id}
              value={p._id}
            >
              {p.title}
            </option>

          ))}
        </select>

        <textarea
          name="problem"
          placeholder="Problem"
          onChange={handleChange}
        />

        <textarea
          name="rootCause"
          placeholder="Root Cause"
          onChange={handleChange}
        />

        <textarea
          name="correctiveAction"
          placeholder="Corrective Action"
          onChange={handleChange}
        />

        <textarea
          name="preventiveAction"
          placeholder="Preventive Action"
          onChange={handleChange}
        />

        <button>Create</button>

        <button
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default CreateRCAModal;