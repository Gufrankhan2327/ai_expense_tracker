import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
    setUser(res.data);
    setName(res.data.name || "");
}
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchProfile();
    }
  }, []);

  // 🔹 Update Profile
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        "https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data);
      setIsEditing(false);
      alert("✅ Profile updated");
    } catch (err) {
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Change Password
  const handlePassword = async () => {
    try {
      await axios.put(
        "https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile/password",
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Password updated");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating password");
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const initial = name?.charAt(0)?.toUpperCase();

  return (
    <div className="text-white ">

      {/* 🔹 Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        👤 Profile
      </h1>

      {/* 🔥 Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 🧑 Avatar */}
        <Card className="flex flex-col items-center justify-center text-center p-6">

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full 
          bg-gradient-to-r from-green-400 to-emerald-600 
          flex items-center justify-center text-2xl sm:text-3xl font-bold">
            {initial}
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            {name}
          </h2>

          <p className="text-gray-400 text-sm break-all">
            {user.email}
          </p>

        </Card>

        {/* 📝 Account Details */}
        <Card title="Account Details" className="p-6">

          <div className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                value={name}
                disabled={!isEditing}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded bg-white/10 border border-white/10 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="text"
                value={user.email || ""}
                disabled
                className="w-full mt-1 px-3 py-2 rounded bg-white/10 border border-white/10 opacity-60"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-500 px-4 py-2 rounded w-full sm:w-auto"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 px-4 py-2 rounded w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 px-4 py-2 rounded w-full sm:w-auto"
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded w-full sm:w-auto sm:ml-auto"
              >
                Logout
              </button>

            </div>

          </div>

        </Card>

      </div>

      {/* 🔐 Password Section */}
      <div className="mt-8 max-w-2xl mx-auto">
        <Card title="Change Password" className="p-6">

          <div className="flex flex-col gap-4">

            <input
              type="password"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  oldPassword: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-white/10 border border-white/10"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-white/10 border border-white/10"
            />

            <button
              onClick={handlePassword}
              className="bg-purple-500 px-4 py-2 rounded w-full"
            >
              Update Password
            </button>

          </div>

        </Card>
      </div>

    </div>
  );
}