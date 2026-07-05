import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarView from "../components/calendar/CalendarView";
import TaskCalendar from "../components/calendar/TaskCalendar";
import EventModal from "../components/calendar/EventModal";

import {
  getEvents,
  deleteEvent,
} from "../services/eventService";

import { getTasks } from "../services/taskService";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  useEffect(() => {
    loadEvents();
    loadTasks();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.events || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Event?")) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <Layout>

      <CalendarToolbar
        onAdd={handleCreate}
      />

      <CalendarView
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskCalendar
        tasks={tasks}
      />

      {showModal && (
        <EventModal
          event={selectedEvent}
          onClose={() =>
            setShowModal(false)
          }
          onSaved={() => {
            loadEvents();
            setShowModal(false);
          }}
        />
      )}

    </Layout>
  );
}

export default Calendar;