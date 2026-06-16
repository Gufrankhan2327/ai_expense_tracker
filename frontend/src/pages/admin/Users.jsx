import { useEffect, useState } from "react";
import { getUsers, removeUser } from "../../services/userService";
import Card from "../../components/ui/Card";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await removeUser(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <div>
          <h2 className="text-4xl font-bold">
            👥 Manage Users
          </h2>

          <p className="text-gray-400 mt-2">
            View and manage registered users
          </p>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            px-4 py-3
            rounded-xl
            bg-white/10
            border border-white/10
            outline-none
            w-full md:w-72
          "
        />
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <Card>
          <p className="text-center text-gray-400 py-6">
            No users found
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {filteredUsers.map((u) => (
            <Card key={u._id}>

              <div className="flex flex-col items-center text-center">

                {/* Avatar */}
                <div
                  className="
                    w-16 h-16
                    rounded-full
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-500
                    flex items-center justify-center
                    text-2xl font-bold
                    mb-4
                  "
                >
                  {u.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold">
                  {u.name}
                </h3>

                {/* Email */}
                <p className="text-sm text-gray-400 break-all mt-1">
                  {u.email}
                </p>

                {/* Role */}
                <span
                  className="
                    mt-3
                    px-3 py-1
                    rounded-full
                    text-xs
                    bg-white/10
                    border border-white/10
                  "
                >
                  {u.role === "admin" ? "Admin" : "User"}
                </span>

                {/* Delete */}
                {u.role !== "admin" && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="
                      mt-4
                      bg-red-500
                      hover:bg-red-600
                      px-4 py-2
                      rounded-xl
                      text-sm
                      font-semibold
                      transition
                    "
                  >
                    Delete
                  </button>
                )}

              </div>

            </Card>
          ))}

        </div>
      )}
    </div>
  );
}