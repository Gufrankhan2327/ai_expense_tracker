import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "../components/layout/Layout";

import UserDashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";


import Users from "../pages/admin/Users";
import UserAnalytics from "../pages/user/UserAnalytics";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import Expenses from "../pages/user/Expenses";
import Budget from "../pages/user/Budget";
import Profile from "../pages/user/Profile";
import Transactions from "../pages/user/Transactions";


import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// // ✅ Other user pages (temporary or real)
// const Expenses = () => <div className="text-white p-6">Expenses Page</div>;
// const Budget = () => <div className="text-white p-6">Budget Page</div>;
// const Profile = () => <div className="text-white p-6">Profile Page</div>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔐 USER ROUTES */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <RoleRoute role="user">
              <Layout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="analytics" element={<UserAnalytics />} />
        <Route path="budget" element={<Budget />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 🔐 ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <Layout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<h1 className="text-white p-6">404 Not Found</h1>} />
    </Routes>
  );
}