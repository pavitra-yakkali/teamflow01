import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CreateTaskModal from "../components/task/CreateTaskModal";
import EditTaskModal from "../components/task/EditTaskModal";
import CommentModal from "../components/task/CommentModal";
import ExportTasksButton from "../components/task/ExportTasksButton";
import KanbanBoard from "../components/kanban/KanbanBoard";

import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [commentTask, setCommentTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    loadTasks();
  }, [search, status, priority]);

  const loadTasks = async () => {
    try {
      const res = await getTasks(
        search,
        status,
        priority
      );

      setTasks(res.tasks || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
  };

  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {
    try {
      const task = tasks.find(
        (t) => t._id === taskId
      );

      await updateTask(taskId, {
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo?._id,
        priority: task.priority,
        dueDate: task.dueDate,
        status: newStatus,
      });

      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?"))
      return;

    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleComment = (task) => {
    setCommentTask(task);
    setShowCommentModal(true);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1>Task Management</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <ExportTasksButton tasks={tasks} />

          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Search & Filters */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "250px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="">
            All Status
          </option>
          <option value="Pending">
            Pending
          </option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="">
            All Priority
          </option>
          <option value="Low">
            Low
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="High">
            High
          </option>
        </select>
      </div>

      <KanbanBoard
        tasks={tasks}
        onStatusChange={
          handleStatusChange
        }
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComment={handleComment}
      />

      {showCreateModal && (
        <CreateTaskModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onTaskCreated={() => {
            loadTasks();
            setShowCreateModal(false);
          }}
        />
      )}

      {showEditModal &&
        selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onClose={() => {
              setShowEditModal(false);
              setSelectedTask(null);
            }}
            onTaskUpdated={() => {
              loadTasks();
              setShowEditModal(false);
              setSelectedTask(null);
            }}
          />
        )}

      {showCommentModal &&
        commentTask && (
          <CommentModal
            task={commentTask}
            onClose={() => {
              setShowCommentModal(false);
              setCommentTask(null);
            }}
            onCommentAdded={() => {
              loadTasks();
              setShowCommentModal(false);
              setCommentTask(null);
            }}
          />
        )}
    </Layout>
  );
}

export default Tasks;