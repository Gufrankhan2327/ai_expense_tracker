import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [theme, setTheme] = useState("dark");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const profilePath =
  user.role === "admin"
    ? "/admin/profile"
    : "/user/profile";

  // 🎯 Dynamic Title
  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("analytics")) return "Analytics";
    if (path.includes("expenses")) return "Expenses";
    if (path.includes("transactions")) return "Transactions";
    if (path.includes("budget")) return "Budget";
    if (path.includes("profile")) return "Profile";
    if (path.includes("users")) return "Users";
    if (path.includes("reports")) return "Reports";
    if (path.includes("settings")) return "Settings";

    return "Dashboard";
  };

 


  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="sticky top-0 z-30
      backdrop-blur-xl bg-white/5
      border-b border-white/10
      px-4 sm:px-6 py-3
      flex items-center justify-between"
    >

      {/* 🔹 LEFT */}
      <div className="flex items-center gap-4">

        {/* ☰ Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl text-white"
        >
          ☰
        </button>

        {/* Title */}
        <h1 className="text-white text-lg sm:text-xl font-semibold">
          {getTitle()}
        </h1>
      </div>

      {/* 🔹 CENTER (Search - desktop only) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 rounded-xl
          bg-white/10 text-white
          border border-white/10
          focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 🔹 RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* 🔔 Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="text-xl text-white relative"
          >
            🔔
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
              3
            </span>
          </button>

          {openNotif && (
            <div
              className="absolute right-0 mt-3 w-64
              bg-[#0f172a] border border-white/10
              rounded-xl shadow-xl p-3"
            >
              <p className="text-white text-sm mb-2">Notifications</p>

              <div className="space-y-2 text-xs text-gray-300">
                <p>💸 New expense added</p>
                <p>⚠️ Budget exceeded</p>
                <p>📊 Weekly report ready</p>
              </div>
            </div>
          )}
        </div>

      

        {/* 👤 Profile */}
        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
            bg-gradient-to-r from-purple-500 to-blue-500
            flex items-center justify-center
            text-white font-bold cursor-pointer"
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {openProfile && (
            <div
              className="absolute right-0 mt-3 w-56
              bg-[#0f172a] border border-white/10
              rounded-xl shadow-xl p-4"
            >
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400 mb-3">{user.email}</p>

              <button
                onClick={() => navigate(profilePath)}
                className="block w-full text-left text-gray-300 hover:text-white mb-2"
              >
                Profile
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/settings")}
                  className="block w-full text-left text-gray-300 hover:text-white mb-2"
                >
                  Settings
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
