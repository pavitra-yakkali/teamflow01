import { useState } from "react";
import { addComment } from "../../services/taskService";

function CommentModal({
  task,
  onClose,
  onCommentAdded,
}) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await addComment(task._id, text);

      alert("Comment Added");

      onCommentAdded();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h2>Comments</h2>

        <div
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {task.comments?.length === 0 ? (
            <p>No Comments Yet</p>
          ) : (
            task.comments?.map((comment, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <strong>
                  {comment.user?.name || "User"}
                </strong>

                <p>{comment.text}</p>

                <small>
                  {new Date(
                    comment.createdAt
                  ).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write Comment..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              minHeight: "80px",
            }}
          />

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Close
            </button>

            <button type="submit">
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;