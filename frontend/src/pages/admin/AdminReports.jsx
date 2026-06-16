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
      [
        "User Name",
        "Email",
        "Role",
        "Amount",
        "Category",
        "Note",
        "Date"
      ],

      ...expenses.map((e) => [
        e.userId?.name || "",
        e.userId?.email || "",
        e.userId?.role || "",
        e.amount,
        e.category,
        e.note,
        new Date(e.date).toLocaleDateString()
      ])
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link =
      document.createElement("a");

    link.href = encodeURI(csv);

    link.download =
      "admin-platform-report.csv";

    link.click();
  };

  return (
    <div className="text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-5xl font-bold">
            Admin Reports
          </h2>

          <p className="text-gray-400 mt-2">
            Export platform analytics & reports
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="
          bg-green-500
          hover:bg-green-600
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
        "
        >
          📤 Export CSV
        </button>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <Card
          title="Users"
          value={analytics.totalUsers || 0}
        />

        <Card
          title="Transactions"
          value={analytics.totalTransactions || 0}
        />

        <Card
          title="Expenses"
          value={`₹${analytics.totalExpenses || 0}`}
        />

        <Card
          title="Avg/User"
          value={`₹${analytics.averagePerUser || 0}`}
        />

      </div>

      {/* REPORT SUMMARY + EXPORT INFO */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* REPORT SUMMARY */}
        <div className="xl:col-span-2">

          <Card title="📊 Report Summary">

            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">
                  Total Users
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {analytics.totalUsers}
                </h3>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">
                  Active Users
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {analytics.activeUsers}
                </h3>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">
                  Transactions
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {analytics.totalTransactions}
                </h3>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm">
                  Total Expenses
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  ₹{analytics.totalExpenses}
                </h3>
              </div>

            </div>

          </Card>

        </div>

        {/* EXPORT INFO */}
        <Card title="📁 Export Information">

          <div className="space-y-4">

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-300">
                CSV file contains all users,
                transactions and expense analytics.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-300">
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

              <p className="text-gray-300">
                Ready for export.
              </p>
            </div>

          </div>

        </Card>

      </div>

    </div>
  );
}