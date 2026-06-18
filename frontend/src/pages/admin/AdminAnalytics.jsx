import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/userService";
import Card from "../../components/ui/Card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminAnalytics() {

  const [analytics, setAnalytics] =
    useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const chartData = Object.entries(
    analytics.categories || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Admin Analytics
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Monitor platform analytics & spending insights
        </p>
      </div>

      <div
        className="
        self-start lg:self-auto
        bg-green-500/10
        border border-green-500/20
        px-4 sm:px-5 py-2 sm:py-3
        rounded-2xl
      "
      >
        <p className="text-green-400 font-semibold text-sm sm:text-base">
          ● Analytics Live
        </p>
      </div>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <Card
        title="👥 Active Users"
        value={analytics.activeUsers || 0}
      />

      <Card
        title="💰 Avg/User"
        value={`₹${analytics.averagePerUser || 0}`}
      />

      <Card
        title="💳 Transactions"
        value={analytics.totalTransactions || 0}
      />

      <Card
        title="📈 Expenses"
        value={`₹${analytics.totalExpenses || 0}`}
      />

    </div>

    {/* MAIN SECTION */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* CATEGORY CHART */}
      <div className="xl:col-span-2">

        <Card title="📊 Category Analytics">

          <div className="h-[300px] sm:h-[400px] lg:h-[500px] mt-4">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      {/* AI INSIGHTS */}
      <Card title="🤖 AI Insights">

        <p className="text-gray-400 mb-6">
          Smart analytics insights
        </p>

        <div className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-sm sm:text-lg">
              Active Users:
              <span className="font-bold">
                {" "}
                {analytics.activeUsers || 0}
              </span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-sm sm:text-lg">
              Avg Expense/User:
              <span className="font-bold">
                {" "}
                ₹{analytics.averagePerUser || 0}
              </span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-sm sm:text-lg">
              Transactions:
              <span className="font-bold">
                {" "}
                {analytics.totalTransactions || 0}
              </span>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-sm sm:text-lg">
              Categories:
              <span className="font-bold">
                {" "}
                {Object.keys(
                  analytics.categories || {}
                ).length}
              </span>
            </p>
          </div>

          <div
            className="
            bg-gradient-to-r
            from-indigo-500/20
            to-purple-500/20
            border border-indigo-500/20
            rounded-2xl
            p-5
          "
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Platform Status
            </h3>

            <p className="text-gray-300 text-sm sm:text-base">
              Analytics engine running successfully.
            </p>
          </div>

        </div>

      </Card>

    </div>

  </div>
);
}