import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import KanbanBoard from "../components/kanban/KanbanBoard";
import EditTaskModal from "../components/task/EditTaskModal";
import CommentModal from "../components/task/CommentModal";
import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

function Kanban() {
  const [tasks, setTasks] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [showCommentModal, setShowCommentModal] =
    useState(false);
  const [commentTask, setCommentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
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

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(taskId);
      fetchTasks();
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
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "25px",
        }}
      >
        Kanban Board
      </h1>

      <KanbanBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComment={handleComment}
      />

      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTask(null);
          }}
          onTaskUpdated={() => {
            fetchTasks();
            setShowEditModal(false);
            setSelectedTask(null);
          }}
        />
      )}

      {showCommentModal && commentTask && (
        <CommentModal
          task={commentTask}
          onClose={() => {
            setShowCommentModal(false);
            setCommentTask(null);
          }}
          onCommentAdded={() => {
            fetchTasks();
            setShowCommentModal(false);
            setCommentTask(null);
          }}
        />
      )}
    </Layout>
  );
}

export default Kanban;