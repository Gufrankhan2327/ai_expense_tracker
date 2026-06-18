import Card from "../../components/ui/Card";
import GlassCard from "../../components/ui/GlassCard";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch data
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  // 💰 Total
  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  // 📊 Transactions
  const transactions = expenses.length;

  // 🥇 Top Category
  const topCategory = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      const cat = e.category || "other";
      map[cat] = (map[cat] || 0) + Number(e.amount || 0);
    });

    const arr = Object.entries(map);
    if (!arr.length) return "None";

    return arr.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }, [expenses]);

  // 🤖 Insight
  const insight = topCategory !== "None"
    ? `You spend most on ${topCategory}`
    : "No data yet";

  // 🧾 Recent transactions
  const recent = expenses.slice(0, 5);

return (
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-3xl sm:text-4xl font-bold">
         Welcome Back
      </h1>

      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Here’s your financial overview
      </p>

    </div>

    {/* STATS CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <Card
        title="💰 Total Spent"
        value={`₹${total}`}
      />

      <Card
        title="💳 Transactions"
        value={transactions}
      />

      <Card
        title="🏆 Top Category"
        value={topCategory}
      />

      <Card
        title="🤖 Insight"
        value={insight}
      />

    </div>

    {/* RECENT TRANSACTIONS */}
    <Card>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">

        <h2 className="font-semibold text-xl">
          📋 Recent Transactions
        </h2>

        <span
          className="
            text-sm
            bg-green-500/20
            text-green-400
            px-3 py-1
            rounded-full
            w-fit
          "
        >
          {recent.length} Records
        </span>

      </div>

      {recent.length === 0 ? (

        <div
          className="
            flex flex-col
            items-center
            justify-center
            py-10
            text-center
          "
        >
          <p className="text-5xl mb-3">
            📭
          </p>

          <p className="text-gray-400">
            No transactions yet
          </p>
        </div>

      ) : (

        <div className="space-y-3">

          {recent.map((e) => (

            <div
              key={e._id}
              className="
                flex
                justify-between
                items-center
                bg-white/5
                border border-white/10
                rounded-xl
                p-4
                hover:bg-white/10
                transition
              "
            >

              <div className="min-w-0">

                <p className="font-medium truncate">
                  {e.note}
                </p>

                <p className="text-sm text-gray-400">
                  {e.category}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-400">
                  ₹{e.amount}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(e.date).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </Card>

  </div>
);
}