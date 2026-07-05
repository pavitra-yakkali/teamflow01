function ExportTasksButton({ tasks }) {
  const exportCSV = () => {
    if (!tasks.length) {
      alert("No tasks to export");
      return;
    }

    const headers = [
      "Title",
      "Description",
      "Status",
      "Priority",
      "Assigned To",
      "Due Date",
    ];

    const rows = tasks.map((task) => [
      task.title,
      task.description,
      task.status,
      task.priority,
      task.assignedTo?.name || "",
      task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "",
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row.map((value) => `"${value ?? ""}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "teamflow_tasks.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      📄 Export Tasks (CSV)
    </button>
  );
}

export default ExportTasksButton;