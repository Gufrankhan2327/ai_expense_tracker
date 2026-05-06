import { useState } from "react";
import Card from "../../components/ui/Card";

export default function Settings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Settings Saved (demo)");
  };

  return (
    <div className="text-white">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        ⚙️ Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card title="Profile Settings">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-white/10"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-white/10"
          />

          <button
            onClick={handleSave}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Save
          </button>
        </Card>

        <Card title="Preferences">
          <p className="text-gray-400">
            Dark mode, notifications, and more coming soon...
          </p>
        </Card>

      </div>
    </div>
  );
}