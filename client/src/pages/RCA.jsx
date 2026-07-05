import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CreateRCAModal from "../components/rca/CreateRCAModal";
import EditRCAModal from "../components/rca/EditRCAModal";
import RCATable from "../components/rca/RCATable";

import {
  getRCAs,
  deleteRCA,
} from "../services/rcaService";

function RCA() {
  const [rcas, setRCAs] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedRCA, setSelectedRCA] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRCAs();
  }, [search]);

  const fetchRCAs = async () => {
    try {
      const res = await getRCAs(search);
      setRCAs(res.rcas || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete RCA?")) return;

    try {
      await deleteRCA(id);
      fetchRCAs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (rca) => {
    setSelectedRCA(rca);
    setShowEdit(true);
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
        <h1>Root Cause Analysis</h1>

        <button
          onClick={() => setShowCreate(true)}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + New RCA
        </button>
      </div>

      {/* Search Box */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search RCA..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "320px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      </div>

      <RCATable
        rcas={rcas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showCreate && (
        <CreateRCAModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            fetchRCAs();
            setShowCreate(false);
          }}
        />
      )}

      {showEdit && selectedRCA && (
        <EditRCAModal
          rca={selectedRCA}
          onClose={() => {
            setSelectedRCA(null);
            setShowEdit(false);
          }}
          onUpdated={() => {
            fetchRCAs();
            setSelectedRCA(null);
            setShowEdit(false);
          }}
        />
      )}
    </Layout>
  );
}

export default RCA;