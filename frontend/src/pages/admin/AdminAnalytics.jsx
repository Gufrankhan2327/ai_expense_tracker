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
  <div className="text-white p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h2 className="text-5xl font-bold">
          Admin Analytics
        </h2>

        <p className="text-gray-400 mt-2">
          Monitor platform analytics & spending insights
        </p>
      </div>

      <div
        className="
        bg-green-500/10
        border border-green-500/20
        px-5 py-3
        rounded-2xl
      "
      >
        <p className="text-green-400 font-semibold">
          ● Analytics Live
        </p>
      </div>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <Card
        title="Active Users"
        value={analytics.activeUsers || 0}
        icon=""
      />

      <Card
        title="Avg/User"
        value={`₹${analytics.averagePerUser || 0}`}
        icon=""
      />

      <Card
        title="Transactions"
        value={analytics.totalTransactions || 0}
        icon=""
      />

      <Card
       title="Expenses"
  value={`₹${analytics.totalExpenses || 0}`}
        icon=""
      />

    </div>

    {/* MAIN SECTION */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">

      {/* CHART */}
      <div className="xl:col-span-2">

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          h-full
        "
        >

          <h2 className="text-3xl font-bold mb-6">
            Category Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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

      </div>

      {/* INSIGHTS */}
      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
        flex
        flex-col
        justify-between
        h-full
      "
      >

        <h2 className="text-3xl font-bold mb-2">
          AI Insights
        </h2>

        <p className="text-gray-400 mb-6">
          Smart analytics insights
        </p>

        <div className="space-y-4">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-lg">
      Active Users:
      <span className="font-bold">
        {" "}{analytics.activeUsers || 0}
      </span>
    </p>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-lg">
      Avg Expense/User:
      <span className="font-bold">
        {" "}₹{analytics.averagePerUser || 0}
      </span>
    </p>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-lg">
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
    <h3 className="text-xl font-bold mb-2">
      Platform Status
    </h3>

    <p className="text-gray-300">
      Analytics engine running successfully.
    </p>
  </div>

</div>

      </div>

    </div>

  </div>
);
}