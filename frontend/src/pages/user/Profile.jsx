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
  <div className="text-white p-4 sm:p-6">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
        👤 Profile
      </h1>

      <p className="text-gray-400">
        Manage your profile and account settings
      </p>
    </div>

    {/* Main Section */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col items-center text-center p-4">

          <div
            className="
            w-24 h-24
            md:w-28 md:h-28
            lg:w-32 lg:h-32
            rounded-full
            bg-gradient-to-r
            from-green-400
            to-emerald-600
            flex items-center justify-center
            text-3xl md:text-4xl
            font-bold
          "
          >
            {initial}
          </div>

          <h2 className="mt-4 text-xl md:text-2xl font-bold">
            {name}
          </h2>

          <p className="text-gray-400 text-sm break-all mt-2">
            {user.email}
          </p>

          <span
            className="
            mt-4
            px-4 py-2
            rounded-full
            bg-green-500/20
            border border-green-500/30
            text-green-400
            text-sm
            font-semibold
          "
          >
            USER
          </span>

        </div>
      </Card>

      {/* Account Details */}
      <div className="xl:col-span-2">

        <Card title="⚙️ Account Details">

          <div className="space-y-5 mt-4">

            <div>
              <label className="text-sm text-gray-400">
                Name
              </label>

              <input
                type="text"
                value={name}
                disabled={!isEditing}
                onChange={(e) => setName(e.target.value)}
                className="
                w-full
                mt-2
                px-4
                py-3
                rounded-xl
                bg-white/10
                border border-white/10
                focus:border-green-500
                outline-none
                transition
              "
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Email
              </label>

              <input
                type="text"
                value={user.email || ""}
                disabled
                className="
                w-full
                mt-2
                px-4
                py-3
                rounded-xl
                bg-white/10
                border border-white/10
                opacity-60
              "
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="
                    bg-green-500
                    hover:bg-green-600
                    px-5 py-3
                    rounded-xl
                    font-semibold
                    transition
                    w-full sm:w-auto
                  "
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="
                    bg-gray-500
                    hover:bg-gray-600
                    px-5 py-3
                    rounded-xl
                    font-semibold
                    transition
                    w-full sm:w-auto
                  "
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="
                  bg-blue-500
                  hover:bg-blue-600
                  px-5 py-3
                  rounded-xl
                  font-semibold
                  transition
                  w-full sm:w-auto
                "
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleLogout}
                className="
                bg-red-500
                hover:bg-red-600
                px-5 py-3
                rounded-xl
                font-semibold
                transition
                w-full sm:w-auto
                sm:ml-auto
              "
              >
                Logout
              </button>

            </div>

          </div>

        </Card>

      </div>

    </div>

    {/* Password Section */}
    <div className="mt-8">

      <Card title="🔒 Change Password">

        <div className="grid md:grid-cols-2 gap-4 mt-4">

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
            className="
            p-3
            rounded-xl
            bg-white/10
            border border-white/10
            outline-none
          "
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
            className="
            p-3
            rounded-xl
            bg-white/10
            border border-white/10
            outline-none
          "
          />

        </div>

        <button
          onClick={handlePassword}
          className="
          mt-5
          bg-purple-500
          hover:bg-purple-600
          px-6 py-3
          rounded-xl
          font-semibold
          transition
          w-full md:w-auto
        "
        >
          Update Password
        </button>

      </Card>

    </div>

  </div>
);
}