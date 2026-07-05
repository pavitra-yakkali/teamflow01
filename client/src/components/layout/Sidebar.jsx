import { NavLink } from "react-router-dom";


const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },

  {
  name: "Team",
  path: "/team",
  icon: "👥",
  roles: [
    "Admin",
    "ProjectManager",
  ],
},
  {
    name: "Projects",
    path: "/projects",
    icon: "📁",
    roles: ["Admin", "ProjectManager"],
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: "✅",
    roles: ["Admin", "ProjectManager", "Developer"],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: "📊",
    roles: ["Admin", "ProjectManager", "Reviewer"],
  },
  {
  name: "Activity",
  path: "/activity",
  icon: "📜",
  roles: [
    "Admin",
    "ProjectManager",
  ],
},
  {
    name: "Kanban",
    path: "/kanban",
    icon: "📋",
    roles: ["Admin", "ProjectManager", "Developer"],
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: "📅",
  },
  {
    name: "RCA",
    path: "/rca",
    icon: "🛠️",
    roles: ["Admin", "Reviewer"],
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: "🔔",
  },
  {
    name: "Chat",
    path: "/chat",
    icon: "💬",
    roles: [
      "Admin",
      "ProjectManager",
      "Developer",
      "Reviewer",
    ],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "👤",
  },
];


function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const canView = (item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role);
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#1e293b",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        TeamFlow
      </h2>

      {menuItems
        .filter(canView)
        .map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              marginBottom: "8px",
              textDecoration: "none",
              color: "#fff",
              borderRadius: "8px",
              background: isActive
                ? "#2563eb"
                : "transparent",
              transition: "0.2s",
            })}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
    </div>
  );
}

export default Sidebar;