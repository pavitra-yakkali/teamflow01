import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  getDashboardReport,
  exportReport,
} from "../services/reportService";

import TaskChart from "../components/reports/TaskChart";
import ProjectProgress from "../components/reports/ProjectProgress";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await getDashboardReport();
      setReport(res.report);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportReport();

      const url = window.URL.createObjectURL(
        new Blob([data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "TeamFlow_Report.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  if (!report) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Reports & Analytics</h1>

        <button
          onClick={handleExport}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        <Card title="Projects" value={report.totalProjects} />
        <Card title="Tasks" value={report.totalTasks} />
        <Card title="Completed" value={report.completedTasks} />
        <Card title="Pending" value={report.pendingTasks} />
        <Card title="Users" value={report.totalUsers} />
        <Card title="RCA Reports" value={report.totalRCA} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <TaskChart report={report} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ProjectProgress report={report} />
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,.1)",
      }}
    >
      <h3>{title}</h3>
      <h1 style={{ color: "#2563eb" }}>{value}</h1>
    </div>
  );
}

export default Reports;