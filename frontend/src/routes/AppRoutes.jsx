import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Layout from "../components/layout/Layout";

import UserDashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

import Users from "../pages/admin/Users";
import UserAnalytics from "../pages/user/UserAnalytics";
import AdminAnalytics from "../pages/admin/AdminAnalytics";

import UserReports from "../pages/user/Reports";
import AdminReports from "../pages/admin/AdminReports";

import Settings from "../pages/admin/Settings";
import Expenses from "../pages/user/Expenses";
import Budget from "../pages/user/Budget";
import Profile from "../pages/user/Profile";
import AdminProfile from "../pages/admin/Profile";
import Transactions from "../pages/user/Transactions";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* USER */}
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
        <Route path="reports" element={<UserReports />} />
        <Route path="budget" element={<Budget />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ADMIN */}
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
        <Route path="reports" element={<AdminReports />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-white p-6">
            404 Not Found
          </h1>
        }
      />

    </Routes>
  );
}