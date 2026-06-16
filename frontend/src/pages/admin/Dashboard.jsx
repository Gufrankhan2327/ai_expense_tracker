import { useEffect, useMemo, useState } from "react";
import { getAnalytics } from "../../services/userService";
import AdminBarChart from "../../components/charts/BarChart";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await getAnalytics();
      console.log("ADMIN RESPONSE FULL:", JSON.stringify(res.data, null, 2));
      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 Chart Data
  const chartData = Object.entries(
    analytics.categories || {}
    ).map(([key, value]) => ({
    name: key,
    users: value,
  }));

  // 🏆 Top Category
  const topCategory = useMemo(() => {
    if (!chartData.length) return "None";

    return chartData.reduce((a, b) =>
      a.users > b.users ? a : b
    ).name;
  }, [chartData]);
  console.log("ANALYTICS STATE:", analytics);

  return (
    <div className="text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-5xl font-bold  ">
            Admin Dashboard
          </h2>

          <p className="text-gray-400 mt-2">
            Monitor platform analytics & expenses
          </p>
        </div>

        <div className="
          bg-green-500/10
          border border-green-500/20
          px-5 py-3
          rounded-2xl
        ">
          <p className="text-green-400 font-semibold">
            ● System Live
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <Card
          title="👥 Users"
          value={analytics.totalUsers || 0}
        />

        <Card
          title="💳 Transactions"
          value={analytics.totalTransactions || 0}
        />

        <Card
          title="💰 Expenses"
          value={`₹${analytics.totalExpenses || 0}`}
        />

        <Card
          title="🏆 Top Category"
          value={topCategory}
        />

      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* BAR CHART */}
        <div className="xl:col-span-2">
          <Card title="📊 Expense Categories">

            <AdminBarChart data={chartData} />

          </Card>
        </div>

        {/* AI INSIGHTS */}
        <Card title="🤖 AI Insights">

          <p className="text-gray-400 mb-6">
            Smart analytics insights
          </p>

          <div className="space-y-4">

            <div
              className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-4
          "
            >
              <p className="text-lg">
                Platform spending is stable
              </p>
            </div>

            <div
              className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-4
          "
            >
              <p className="text-lg">
                Highest Category:
                <span className="font-bold">
                  {" "}{topCategory}
                </span>
              </p>
            </div>

            <div
              className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-4
          "
            >
              <p className="text-lg">
                Total Transactions:
                <span className="font-bold">
                  {" "}{analytics.totalTransactions || 0}
                </span>
              </p>
            </div>

            <div
              className="
            bg-white/5
            border border-white/10
            rounded-2xl
            p-4
          "
            >
              <p className="text-lg">
                Total Users:
                <span className="font-bold">
                  {" "}{analytics.totalUsers || 0}
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
                Real-time analytics system active.
              </p>
            </div>

          </div>

        </Card>

      </div>
    </div>
  );
}