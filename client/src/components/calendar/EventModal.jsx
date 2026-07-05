import { useState } from "react";
import {
  createEvent,
  updateEvent,
} from "../../services/eventService";

function EventModal({
  event,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    title: event?.title || "",
    description:
      event?.description || "",
    startDate: event?.startDate
      ? event.startDate.substring(0, 10)
      : "",
    endDate: event?.endDate
      ? event.endDate.substring(0, 10)
      : "",
    color:
      event?.color || "#2563eb",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (event) {
        await updateEvent(
          event._id,
          form
        );
      } else {
        await createEvent(form);
      }

      onSaved();
    } catch (err) {
      console.log(err);
      alert("Failed to save event");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          width: "450px",
        }}
      >
        <h2>
          {event
            ? "Edit Event"
            : "Create Event"}
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={
              handleChange
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />

          <label>
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={
              form.startDate
            }
            onChange={
              handleChange
            }
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <label>
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={
              handleChange
            }
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <label>Color</label>

          <input
            type="color"
            name="color"
            value={form.color}
            onChange={
              handleChange
            }
            style={{
              width: "100%",
              height: "45px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                background:
                  "#2563eb",
                color: "#fff",
                border: "none",
                padding:
                  "10px 20px",
                borderRadius:
                  "5px",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;