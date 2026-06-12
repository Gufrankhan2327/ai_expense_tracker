import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function UserAnalytics() {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
       console.log("TOKEN FROM STORAGE:", token);
      const res = await axios.get(
        "https://ai-expense-tracker-backend-rvb8.onrender.com/api/analytics/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ANALYTICS RESPONSE:", res.data);
      setData(res.data);
    } catch (err) {
  console.log("Analytics Error:", err);

  if (err.response) {
    console.log("Response:", err.response.data);
  }
}
  };

  if (!data) {
  return (
    <div className="text-white p-6">
      <h2>Analytics Not Loaded</h2>
      <p>Check Console & Network Tab</p>
    </div>
  );
}

  return (
  <div className="text-white p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h2 className="text-5xl font-bold">
          User Analytics
        </h2>

        <p className="text-gray-400 mt-2">
          Track your spending habits and insights
        </p>
      </div>

      <div className="
        bg-green-500/10
        border border-green-500/20
        px-5 py-3
        rounded-2xl
      ">
        <p className="text-green-400 font-semibold">
          ● Analytics Live
        </p>
      </div>

    </div>

    {/* STATS */}
    {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  {/* Total Expense */}
  <div
    className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-105
      hover:bg-white/15
      hover:border-green-500/30
      hover:shadow-2xl
      hover:shadow-green-500/20
    "
  >
    <p className="text-gray-400 text-sm">
      Total Expense
    </p>

    <h3 className="text-4xl font-bold mt-3">
      ₹{data.totalExpense}
    </h3>
  </div>

  {/* Transactions */}
  <div
    className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-105
      hover:bg-white/15
      hover:border-blue-500/30
      hover:shadow-2xl
      hover:shadow-blue-500/20
    "
  >
    <p className="text-gray-400 text-sm">
      Transactions
    </p>

    <h3 className="text-4xl font-bold mt-3">
      {data.totalTransactions}
    </h3>
  </div>

  {/* Average Expense */}
  <div
    className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-105
      hover:bg-white/15
      hover:border-yellow-500/30
      hover:shadow-2xl
      hover:shadow-yellow-500/20
    "
  >
    <p className="text-gray-400 text-sm">
      Average Expense
    </p>

    <h3 className="text-4xl font-bold mt-3">
      ₹{data.averageExpense}
    </h3>
  </div>

  {/* Top Category */}
  <div
    className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-105
      hover:bg-white/15
      hover:border-purple-500/30
      hover:shadow-2xl
      hover:shadow-purple-500/20
    "
  >
    <p className="text-gray-400 text-sm">
      Top Category
    </p>

    <h3 className="text-3xl font-bold mt-3">
      {data.topCategory}
    </h3>
  </div>

</div>

    {/* MAIN SECTION */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* MONTHLY CHART */}
      <div className="xl:col-span-2">

        <div className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          h-full
        ">

          <h2 className="text-3xl font-bold mb-6">
            Monthly Expenses
          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >
            <LineChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
      ">

        <h2 className="text-3xl font-bold mb-2">
          AI Insights
        </h2>

        <p className="text-gray-400 mb-6">
          Smart spending analysis
        </p>

        <div className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-lg">
              Total Spent:
              <span className="font-bold">
                {" "}₹{data.totalExpense}
              </span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-lg">
              Highest Spending:
              <span className="font-bold">
                {" "}{data.topCategory}
              </span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-lg">
              Transactions:
              <span className="font-bold">
                {" "}{data.totalTransactions}
              </span>
            </p>
          </div>

          <div className="
            bg-gradient-to-r
            from-green-500/20
            to-emerald-500/20
            border border-green-500/20
            rounded-2xl
            p-5
          ">
            <h3 className="text-xl font-bold mb-2">
              Spending Status
            </h3>

            <p className="text-gray-300">
              Your expense tracking is active.
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* CATEGORY PIE CHART */}
    <div className="
      mt-8
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
    ">

      <h2 className="text-3xl font-bold mb-6">
        Category Breakdown
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={data.categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.categoryData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>

  </div>
);
}