import { useState } from "react";
import Card from "../../components/ui/Card";

export default function Settings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Settings Saved (demo)");
  };

return (
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-3xl sm:text-4xl font-bold">
        ⚙️ Settings
      </h1>

      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Manage your account settings and preferences
      </p>

    </div>

    {/* SETTINGS GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* PROFILE SETTINGS */}
      <Card title="👤 Profile Settings">

        <div className="space-y-4 mt-4">

          <div>
            <label className="text-sm text-gray-400">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-white/10
                border border-white/10
                outline-none
                focus:border-green-500
              "
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-white/10
                border border-white/10
                outline-none
                focus:border-green-500
              "
            />
          </div>

          <button
            onClick={handleSave}
            className="
              w-full sm:w-auto
              bg-green-500
              hover:bg-green-600
              px-6 py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Save Changes
          </button>

        </div>

      </Card>

      {/* PREFERENCES */}
      <Card title="🎨 Preferences">

        <div className="space-y-4 mt-4">

          <div
            className="
              bg-white/5
              border border-white/10
              rounded-xl
              p-4
            "
          >
            <h3 className="font-semibold mb-2">
              🌙 Dark Mode
            </h3>

            <p className="text-gray-400 text-sm">
              Enabled by default for better experience.
            </p>
          </div>

          <div
            className="
              bg-white/5
              border border-white/10
              rounded-xl
              p-4
            "
          >
            <h3 className="font-semibold mb-2">
              🔔 Notifications
            </h3>

            <p className="text-gray-400 text-sm">
              Manage alerts and system notifications.
            </p>
          </div>

          <div
            className="
              bg-gradient-to-r
              from-indigo-500/20
              to-purple-500/20
              border border-indigo-500/20
              rounded-xl
              p-4
            "
          >
            <h3 className="font-semibold mb-2">
              🚀 Coming Soon
            </h3>

            <p className="text-gray-300 text-sm">
              Theme customization, language support,
              notification controls and more.
            </p>
          </div>

        </div>

      </Card>

    </div>

  </div>
);
}