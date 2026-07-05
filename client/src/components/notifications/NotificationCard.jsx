function NotificationCard({
  notification,
  onRead,
  onDelete,
}) {
  return (
    <div
      style={{
        background: notification.read
          ? "#fff"
          : "#eef4ff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        boxShadow:
          "0 2px 5px rgba(0,0,0,.1)",
      }}
    >
      <h3>{notification.title}</h3>

      <p>{notification.message}</p>

      <small>
        {new Date(
          notification.createdAt
        ).toLocaleString()}
      </small>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "12px",
        }}
      >
        {!notification.read && (
          <button
            onClick={() =>
              onRead(notification._id)
            }
          >
            Mark Read
          </button>
        )}

        <button
          onClick={() =>
            onDelete(notification._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;