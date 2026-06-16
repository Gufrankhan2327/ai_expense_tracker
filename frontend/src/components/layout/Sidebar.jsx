import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    role: "user",
  };

  // 🎯 MENU
  const menu = {
  user: [
    { name: "Dashboard", path: "/user", icon: "🧑" },
    { name: "Add Expenses", path: "/user/expenses", icon: "💸" },
    { name: "Transactions", path: "/user/transactions", icon: "📋" },
    { name: "Analytics", path: "/user/analytics", icon: "📊" },
    { name: "Reports", path: "/user/reports", icon: "📤" },
    { name: "Budget", path: "/user/budget", icon: "🎯" },
    { name: "Profile", path: "/user/profile", icon: "👤" },
  ],

  admin: [
    { name: "Dashboard", path: "/admin", icon: "🧑" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Analytics", path: "/admin/analytics", icon: "📊" },
    { name: "Reports", path: "/admin/reports", icon: "📤" },
    { name: "Profile", path: "/admin/profile", icon: "👤" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ],
};

  const currentMenu = menu[user.role] || menu.user;

  // ✅ Active route (FIXED)
  const isActive = (path) => {
    if (path === "/user" || path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 🔥 Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64
        bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]
        border-r border-white/10 backdrop-blur-xl
        flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* 🔹 TOP */}
        <div className="p-5">

          {/* Logo */}
          <h2 className="text-2xl font-bold text-white mb-8 tracking-wide">
            Expense Tracker
          </h2>

          {/* Menu */}
          <nav className="space-y-2">
            {currentMenu.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  
                  ${
                    active
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {/* Icon */}
                  <span className="text-lg">{item.icon}</span>

                  {/* Label */}
                  <span className="font-medium">{item.name}</span>

                  {/* Active indicator */}
                  {active && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 🔻 BOTTOM */}
        <div className="p-5 border-t border-white/10">

          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400">
              ⚡ AI Powered
            </p>
            <p className="text-xs text-gray-500">
              Version 2026
            </p>
          </div>

        </div>
      </aside>
    </>
  );
}