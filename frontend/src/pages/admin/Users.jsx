import { useEffect, useState } from "react";
import { getUsers, removeUser, updateUserRole } from "../../services/userService";
import Card from "../../components/ui/Card";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await removeUser(id);
    fetchUsers();
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white">

      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          👥 User Management
        </h1>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-white/10 border border-white/10 outline-none"
        />
      </div>

      {/* 🔹 Users List */}
      <Card title="All Users">

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No users found
          </p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="flex flex-col md:flex-row justify-between md:items-center gap-4 
                bg-white/10 p-4 rounded-xl border border-white/10"
              >
                {/* Info */}
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-400">{u.email}</p>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded mt-1 inline-block">
                    {u.role}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center">

                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                    className="bg-white/10 px-3 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}