function RCATable({ rcas, onEdit, onDelete }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
            <th style={th}>Title</th>
            <th style={th}>Project</th>
            <th style={th}>Status</th>
            <th style={th}>Created By</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rcas.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No RCA Records Found
              </td>
            </tr>
          ) : (
            rcas.map((rca) => (
              <tr key={rca._id}>
                <td style={td}>{rca.title}</td>

                <td style={td}>
                  {rca.project?.title || "-"}
                </td>

                <td style={td}>{rca.status}</td>

                <td style={td}>
                  {rca.createdBy?.name || "-"}
                </td>

                <td style={td}>
                  <button
                    onClick={() => onEdit(rca)}
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(rca._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #ddd",
};

const td = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default RCATable;