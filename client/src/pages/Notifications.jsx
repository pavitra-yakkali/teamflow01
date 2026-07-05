import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import NotificationBell from "../components/notifications/NotificationBell";
import NotificationList from "../components/notifications/NotificationList";
import EmptyNotification from "../components/notifications/EmptyNotification";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] =
    useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.notifications || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, read: true }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this notification?"
      )
    )
      return;

    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount =
    notifications.filter((n) => !n.read)
      .length;

  const filteredNotifications =
    useMemo(() => {
      return notifications.filter((n) => {
        const matchesSearch =
          n.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          n.message
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesUnread =
          !showUnreadOnly || !n.read;

        return (
          matchesSearch &&
          matchesUnread
        );
      });
    }, [
      notifications,
      search,
      showUnreadOnly,
    ]);

  const markAllRead = async () => {
    for (const notification of notifications) {
      if (!notification.read) {
        await handleRead(notification._id);
      }
    }
  };

  const deleteAll = async () => {
    if (
      !window.confirm(
        "Delete all notifications?"
      )
    )
      return;

    for (const notification of notifications) {
      await deleteNotification(
        notification._id
      );
    }

    setNotifications([]);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>
          Notifications
        </h1>

        <NotificationBell
          count={unreadCount}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button
          onClick={() =>
            setShowUnreadOnly(
              !showUnreadOnly
            )
          }
        >
          {showUnreadOnly
            ? "Show All"
            : "Unread Only"}
        </button>

        <button
          onClick={markAllRead}
        >
          Mark All Read
        </button>

        <button
          onClick={deleteAll}
        >
          Delete All
        </button>
      </div>

      {filteredNotifications
        .length === 0 ? (
        <EmptyNotification />
      ) : (
        <NotificationList
          notifications={
            filteredNotifications
          }
          onRead={handleRead}
          onDelete={
            handleDelete
          }
        />
      )}
    </Layout>
  );
}

export default Notifications;