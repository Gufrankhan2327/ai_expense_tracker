import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Summary
  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const totalTransactions = expenses.length;

  const topCategory = (() => {
    const categories = {};

    expenses.forEach((e) => {
      categories[e.category] =
        (categories[e.category] || 0) + Number(e.amount || 0);
    });

    return (
      Object.keys(categories).reduce(
        (a, b) =>
          categories[a] > categories[b] ? a : b,
        Object.keys(categories)[0]
      ) || "N/A"
    );
  })();

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Amount", "Category", "Note", "Date"],

      ...expenses.map((e) => [
        e.amount,
        e.category,
        e.note,
        new Date(e.date).toLocaleDateString(),
      ]),
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");

    link.href = encodeURI(csv);

    link.download = "user-report.csv";

    link.click();
  };

 return (
  <div className="text-white p-3 sm:p-4 md:p-6">

    {/* Header */}
    <div
      className="
        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        mb-6 md:mb-8
      "
    >
      <div>
        <h2
          className="
            text-2xl sm:text-3xl md:text-4xl
            font-bold
            break-words
          "
        >
          📤 User Reports
        </h2>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          View and export your expenses
        </p>
      </div>

      <button
        onClick={exportCSV}
        className="
          w-full sm:w-auto
          bg-green-500
          hover:bg-green-600
          px-5 py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        📥 Export CSV
      </button>
    </div>

    {/* Records */}
    <Card title="Expense Records">

      {expenses.length === 0 ? (
        <p className="text-gray-400 text-center py-6">
          No records found
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Note</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((e) => (
                  <tr
                    key={e._id}
                    className="
                      border-b border-white/5
                      hover:bg-white/5
                      transition
                    "
                  >
                    <td className="py-3">
                      {new Date(e.date).toLocaleDateString()}
                    </td>

                    <td className="capitalize">
                      {e.category}
                    </td>

                    <td>{e.note || "No Note"}</td>

                    <td className="text-right text-green-400 font-semibold">
                      ₹{e.amount}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {expenses.map((e) => (
              <div
                key={e._id}
                className="
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  p-4
                "
              >
                <div className="flex justify-between items-center">
                  <span className="capitalize font-medium">
                    {e.category}
                  </span>

                  <span className="text-green-400 font-bold">
                    ₹{e.amount}
                  </span>
                </div>

                <p className="text-gray-300 mt-2 text-sm">
                  {e.note || "No Note"}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(e.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

    </Card>

  </div>
);
}