import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardCards from "../components/dashboard/DashboardCards";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import PriorityChart from "../components/dashboard/PriorityChart";
import TaskCompletionChart from "../components/dashboard/TaskCompletionChart";
import ProjectProgressChart from "../components/dashboard/ProjectProgressChart";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import TopPriorityTasks from "../components/dashboard/TopPriorityTasks";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getDashboardStats } from "../services/dashboardService";
import { getRecentActivities } from "../services/activityService";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalRCA: 0,
    openRCA: 0,
    closedRCA: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadRecentActivities();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats(res.stats);
      setTasks(res.recentTasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRecentActivities = async () => {
    try {
      const res = await getRecentActivities();
      setActivities(res.activities || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <DashboardHeader user={user} />

      <DashboardCards stats={stats} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <TaskStatusChart tasks={tasks} />

        <PriorityChart tasks={tasks} />

        <TaskCompletionChart stats={stats} />

        <ProjectProgressChart stats={stats} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <UpcomingDeadlines tasks={tasks} />

        <TopPriorityTasks tasks={tasks} />
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <RecentActivity activities={activities} />
      </div>
    </Layout>
  );
}

export default Dashboard;