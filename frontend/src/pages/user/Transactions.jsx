import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // latest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter
  const filtered = transactions.filter((t) =>
    t.note?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">📋 Transactions</h1>

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-white/10 border border-white/10 w-full md:w-64"
        />
      </div>

      {/* Table */}
      <Card title="Transaction History">

        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No transactions found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* Header */}
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Note</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-3">
                      {t.date
                        ? new Date(t.date).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="capitalize">{t.category}</td>

                    <td className="text-gray-300">
                      {t.note || "No note"}
                    </td>

                    <td className="text-right font-semibold text-green-400">
                      ₹{t.amount}
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