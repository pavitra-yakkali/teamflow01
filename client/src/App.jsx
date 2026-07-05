import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import Kanban from "./pages/Kanban";
import Notifications from "./pages/Notifications";
import RCA from "./pages/RCA";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute
            roles={["Admin", "ProjectManager"]}
          >
            <Projects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute
            roles={["Admin", "ProjectManager"]}
          >
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      {/* Team */}
      <Route
        path="/team"
        element={
          <ProtectedRoute
            roles={["Admin", "ProjectManager"]}
          >
            <Team />
          </ProtectedRoute>
        }
      />

      {/* Tasks */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "ProjectManager",
              "Developer",
            ]}
          >
            <Tasks />
          </ProtectedRoute>
        }
      />

      {/* Kanban */}
      <Route
        path="/kanban"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "ProjectManager",
              "Developer",
            ]}
          >
            <Kanban />
          </ProtectedRoute>
        }
      />

      {/* Notifications */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* RCA */}
      <Route
        path="/rca"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "Reviewer",
            ]}
          >
            <RCA />
          </ProtectedRoute>
        }
      />

      {/* Calendar */}
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />

      {/* Chat */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "ProjectManager",
              "Developer",
              "Reviewer",
            ]}
          >
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "ProjectManager",
              "Reviewer",
            ]}
          >
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* Activity */}
      <Route
        path="/activity"
        element={
          <ProtectedRoute
            roles={[
              "Admin",
              "ProjectManager",
            ]}
          >
            <Activity />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;