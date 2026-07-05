import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function Profile() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser(res.user);

      setFormData({
        name: res.user.name,
        email: res.user.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await updateProfile(formData);

      alert("Profile Updated Successfully");

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      setUser(res.user);

      setEditing(false);

    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1>My Profile</h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          marginTop: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >

        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <br />

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            style={{
              background: "green",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Update Profile
          </button>
        )}

      </div>

    </Layout>
  );
}

export default Profile;