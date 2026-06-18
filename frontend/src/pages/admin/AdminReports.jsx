import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReports() {

  const [analytics, setAnalytics] =
    useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const res = await axios.get(
        "https://ai-expense-tracker-backend-rvb8.onrender.com/api/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = () => {
      const rows = [
        ["Metric", "Value"],
        ["Total Users", analytics.totalUsers || 0],
        ["Active Users", analytics.activeUsers || 0],
        ["Total Transactions", analytics.totalTransactions || 0],
        ["Total Expenses", analytics.totalExpenses || 0],
        ["Average Per User", analytics.averagePerUser || 0],
      ];

      const csv =
        "data:text/csv;charset=utf-8," +
        rows.map((r) => r.join(",")).join("\n");

      const link = document.createElement("a");

      link.href = encodeURI(csv);
      link.download = "admin-report.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Admin Reports
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Export platform analytics & reports
        </p>
      </div>

      <button
        onClick={exportCSV}
        className="
          w-full lg:w-auto
          bg-green-500
          hover:bg-green-600
          px-5 py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        📤 Export CSV
      </button>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

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
        title="📊 Avg/User"
        value={`₹${analytics.averagePerUser || 0}`}
      />

    </div>

    {/* MAIN SECTION */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* REPORT SUMMARY */}
      <div className="xl:col-span-2">

        <Card title="📊 Report Summary">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">
                Total Users
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                {analytics.totalUsers || 0}
              </h3>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">
                Active Users
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                {analytics.activeUsers || 0}
              </h3>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">
                Transactions
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                {analytics.totalTransactions || 0}
              </h3>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-sm">
                Total Expenses
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                ₹{analytics.totalExpenses || 0}
              </h3>
            </div>

          </div>

        </Card>

      </div>

      {/* EXPORT INFO */}
      <Card title="📁 Export Information">

        <div className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm sm:text-base">
              CSV file contains all users,
              transactions and expense analytics.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm sm:text-base">
              Generated from live platform data.
            </p>
          </div>

          <div
            className="
              bg-gradient-to-r
              from-green-500/20
              to-emerald-500/20
              border border-green-500/20
              rounded-xl
              p-4
            "
          >
            <h3 className="font-bold text-lg mb-2">
              Report Status
            </h3>

            <p className="text-gray-300 text-sm sm:text-base">
              Ready for export.
            </p>
          </div>

        </div>

      </Card>

    </div>

  </div>
);
}