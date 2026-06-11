import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔹 Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Login
  const handleLogin = async () => {
    try {
      setLoading(true);

      // Validation
      if (!form.email || !form.password) {
        alert("Please fill all fields");
        return;
      }

      const res = await loginUser(form);

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Save Token
      localStorage.setItem("token", res.data.token);

      // ✅ Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      // ✅ Context Login
      if (login) {
        login(res.data);
      }

      // ✅ Redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {

      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  // 🔥 Enter Key Support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/10">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

// this is for one user Hemant
//  name: 'Hemant',
//  email: 'hemant@gmail.com',
//  pass: Hemant@123

// this is for one user Manav
//  name: 'Manav',
//  email: 'manav@gmail.com',
//  pass: Manav@123

// // this is for admin
//  name: 'Gufran',
//  email: 'gufran@gmail.com',
//  pass: Gufran@123
