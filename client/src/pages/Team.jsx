import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import {
  getTeamMembers,
  addMember,
  removeMember,
} from "../services/teamService";

function Team() {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");

  // Replace this with your project id
  const projectId = "YOUR_PROJECT_ID";

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await getTeamMembers(projectId);
      setMembers(res.members || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!memberId) return;

    try {
      await addMember(projectId, memberId);

      setMemberId("");

      loadMembers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeMember(projectId, id);

      loadMembers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      <h1>Team Management</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) =>
            setMemberId(e.target.value)
          }
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button
          onClick={handleAdd}
        >
          Add Member
        </button>

      </div>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {members.map((member) => (

            <tr key={member._id}>

              <td>{member.name}</td>

              <td>{member.email}</td>

              <td>{member.role}</td>

              <td>

                <button
                  onClick={() =>
                    handleRemove(member._id)
                  }
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Layout>
  );
}

export default Team;