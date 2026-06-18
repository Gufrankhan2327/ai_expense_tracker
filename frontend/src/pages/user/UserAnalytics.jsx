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
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          📊 User Analytics
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Track your spending habits and insights
        </p>
      </div>

      <div
        className="
          bg-green-500/10
          border border-green-500/20
          px-4 py-3
          rounded-2xl
          w-fit
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
        title="💰 Total Expense"
        value={`₹${data.totalExpense}`}
      />

      <Card
        title="💳 Transactions"
        value={data.totalTransactions}
      />

      <Card
        title="📈 Average Expense"
        value={`₹${data.averageExpense}`}
      />

      <Card
        title="🏆 Top Category"
        value={data.topCategory}
      />

    </div>

    {/* MONTHLY CHART */}
    <Card title="📈 Monthly Expenses">

      <div className="h-[300px] sm:h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
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

    </Card>

    {/* PIE + INSIGHTS */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

      {/* PIE CHART */}
      <div className="xl:col-span-2">

        <Card title="🥧 Category Breakdown">

          <div className="h-[300px] sm:h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={data.categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      {/* AI INSIGHTS */}
      <Card title="🤖 AI Insights">

        <p className="text-gray-400 mb-6">
          Smart spending analysis
        </p>

        <div className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

            <p className="text-base sm:text-lg">
              Total Spent:
              <span className="font-bold">
                {" "}₹{data.totalExpense}
              </span>
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

            <p className="text-base sm:text-lg">
              Highest Spending:
              <span className="font-bold">
                {" "}
                {data.topCategory}
              </span>
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

            <p className="text-base sm:text-lg">
              Transactions:
              <span className="font-bold">
                {" "}
                {data.totalTransactions}
              </span>
            </p>

          </div>

          <div
            className="
              bg-gradient-to-r
              from-green-500/20
              to-emerald-500/20
              border border-green-500/20
              rounded-2xl
              p-5
            "
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Spending Status
            </h3>

            <p className="text-gray-300 text-sm sm:text-base">
              Your expense tracking is active.
            </p>

          </div>

        </div>

      </Card>

    </div>

  </div>
);
}