
import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/userService";
import BarChart from "../../components/charts/BarChart";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await getAnalytics();
    setAnalytics(res.data);
  };

  const chartData = Object.entries(analytics.categories || {}).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  return (
    <div className="text-white">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Users" value={analytics.totalUsers || 0} icon="" />
        <Card title="Active" value={analytics.activeUsers || 0} icon="" />
        <Card title="Expenses" value={`₹${analytics.totalExpenses || 0}`} icon="" />
        <Card title="Status" value="Live" icon="" />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card title="📊 Category Analysis">
          {chartData.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No data</p>
          ) : (
            <BarChart data={chartData} />
          )}
        </Card>

        <Card className="p-5">
          <h2 className="mb-2 font-semibold text-lg">AI Insights</h2>
          <p className="text-gray-300">
            {analytics.insights?.message || "No insights available"}
          </p>
        </Card>

      </div>

    </div>
  );
}