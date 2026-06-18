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
    <div className="text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">
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
        w-full lg:w-80
        px-4 py-3
        rounded-xl
        bg-white/10
        border border-white/10
        outline-none
        focus:border-green-500
      "
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <Card
          title="Total Users"
          value={users.length}
        />

        <Card
          title="Admins"
          value={
            users.filter(
              (u) => u.role === "admin"
            ).length
          }
        />

        <Card
          title="Users"
          value={
            users.filter(
              (u) => u.role === "user"
            ).length
          }
        />

      </div>

      {/* USERS GRID */}
      {filteredUsers.length === 0 ? (

        <Card>
          <p className="text-center text-gray-400 py-10">
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
                w-20 h-20
                rounded-full
                bg-gradient-to-r
                from-green-500
                to-emerald-500
                flex items-center justify-center
                text-3xl font-bold
                mb-4
                shadow-lg shadow-green-500/30
              "
                >
                  {u.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <h3 className="font-bold text-lg">
                  {u.name}
                </h3>

                {/* Email */}
                <p className="text-gray-400 text-sm break-all mt-2">
                  {u.email}
                </p>

                {/* Role Badge */}
                <span
                  className={`
                mt-4 px-4 py-1 rounded-full text-xs font-semibold
                ${u.role === "admin"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }
              `}
                >
                  {u.role.toUpperCase()}
                </span>

                {/* Delete */}
                {u.role !== "admin" && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="
                  mt-5
                  bg-red-500
                  hover:bg-red-600
                  px-5 py-2
                  rounded-xl
                  text-sm
                  font-semibold
                  transition
                "
                  >
                    Delete User
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