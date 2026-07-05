import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getActivities } from "../services/activityService";

function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await getActivities();
      setActivities(res.activities);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1>Activity Logs</h1>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity._id}
              style={{
                background: "#fff",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow:
                  "0 2px 5px rgba(0,0,0,.1)",
              }}
            >
              <h3>{activity.action}</h3>

              <p>
                <strong>Module:</strong>{" "}
                {activity.module}
              </p>

              <p>{activity.description}</p>

              <p
                style={{
                  color: "gray",
                  fontSize: "13px",
                }}
              >
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default Activity;