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
    <div className="text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold">
            📤 User Reports
          </h2>

          <p className="text-gray-400 mt-2">
            View and export your expenses
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
          "
        >
          Export CSV
        </button>
      </div>


      {/* Recent Records */}
      <Card title="Expense Records">

        {expenses.length === 0 ? (
          <p className="text-gray-400">
            No records found
          </p>
        ) : (
          <div className="overflow-x-auto">
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
                    className="border-b border-white/5"
                  >
                    <td className="py-3">
                      {new Date(
                        e.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="capitalize">
                      {e.category}
                    </td>

                    <td>{e.note}</td>

                    <td className="text-right text-green-400 font-semibold">
                      ₹{e.amount}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </Card>

    </div>
  );
}