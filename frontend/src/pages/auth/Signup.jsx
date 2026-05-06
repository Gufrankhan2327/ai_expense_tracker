import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = () => {
    console.log("User Registered:", form);

    // 👉 later connect backend API
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/10">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            Create Account
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Signup to get started
          </p>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}