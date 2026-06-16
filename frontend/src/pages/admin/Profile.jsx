import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

export default function AdminProfile() {

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

    const fetchProfile = async () => {
        try {
            const res = await axios.get(
                "https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data);
            setName(res.data.name || "");

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            fetchProfile();
        }
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await axios.put(
                "https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile",
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data);
            setIsEditing(false);

            alert("✅ Profile Updated");

        } catch (err) {
            alert("❌ Update Failed");
        } finally {
            setLoading(false);
        }
    };

    const handlePassword = async () => {
        try {
            await axios.put(
                "https://ai-expense-tracker-backend-rvb8.onrender.com/api/profile/password",
                passwords,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Password Updated");

            setPasswords({
                oldPassword: "",
                newPassword: "",
            });

        } catch (err) {
            alert(
                err.response?.data?.msg ||
                "Error Updating Password"
            );
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const initial = name?.charAt(0)?.toUpperCase();

    return (
        <div className="text-white p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h2 className="text-5xl font-bold">
                    Admin Profile
                </h2>

                <p className="text-gray-400 mt-2">
                    Manage administrator account settings
                </p>

            </div>

            {/* TOP SECTION */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* PROFILE CARD */}
                <Card>

                    <div className="flex flex-col items-center text-center">

                        <div
                            className="
                w-28 h-28
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                flex
                items-center
                justify-center
                text-4xl
                font-bold
              "
                        >
                            {initial}
                        </div>

                        <h3 className="text-2xl font-bold mt-4">
                            {name}
                        </h3>

                        <p className="text-gray-400">
                            {user.email}
                        </p>

                        <span
                            className="
                mt-4
                bg-green-500/20
                border border-green-500/30
                px-4 py-2
                rounded-full
                text-green-400
                font-semibold
              "
                        >
                            ADMIN
                        </span>

                    </div>

                </Card>

                {/* ACCOUNT DETAILS */}
                <div className="lg:col-span-2">

                    <Card title="⚙️ Account Details">

                        <div className="space-y-4 mt-4">

                            <div>
                                <label className="text-gray-400">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    disabled={!isEditing}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-white/10
                    border border-white/10
                  "
                                />
                            </div>

                            <div>
                                <label className="text-gray-400">
                                    Email
                                </label>

                                <input
                                    type="text"
                                    value={user.email || ""}
                                    disabled
                                    className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-white/10
                    border border-white/10
                    opacity-60
                  "
                                />
                            </div>

                            <div className="flex gap-3 flex-wrap">

                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="
                        bg-green-500
                        px-5
                        py-2
                        rounded-xl
                      "
                                        >
                                            {loading
                                                ? "Saving..."
                                                : "Save"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                setIsEditing(false)
                                            }
                                            className="
                        bg-gray-500
                        px-5
                        py-2
                        rounded-xl
                      "
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setIsEditing(true)
                                        }
                                        className="
                      bg-blue-500
                      px-5
                      py-2
                      rounded-xl
                    "
                                    >
                                        Edit Profile
                                    </button>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="
                    bg-red-500
                    px-5
                    py-2
                    rounded-xl
                    ml-auto
                  "
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </Card>

                </div>

            </div>

            {/* PASSWORD */}
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
              "
                        />

                    </div>

                    <button
                        onClick={handlePassword}
                        className="
              mt-4
              bg-purple-500
              px-6
              py-3
              rounded-xl
            "
                    >
                        Update Password
                    </button>

                </Card>

            </div>

        </div>
    );
}