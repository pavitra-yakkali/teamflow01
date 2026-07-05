import NotificationCard from "./NotificationCard";

function NotificationList({
  notifications,
  onRead,
  onDelete,
}) {
  return (
    <>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          onRead={onRead}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export default NotificationList;