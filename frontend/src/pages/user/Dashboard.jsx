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
        const res = await axios.get("http://localhost:5000/api/expenses", {
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
    <div className="text-white">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm">
          Here’s your financial overview
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card title="Total Spent" value={`₹${total}`}/>
        <Card title="Transactions" value={transactions}/>
        <Card title="Top Category" value={topCategory} />
        <Card title="Insight" value={insight}/>
      </div>

      {/* Recent Activity */}
      <Card>
        <h2 className="mb-4 font-semibold text-lg">
          Recent Transactions
        </h2>

        {recent.length === 0 ? (
          <p className="text-gray-400">No transactions yet</p>
        ) : (
          recent.map((e) => (
            <div
              key={e._id}
              className="flex justify-between items-center border-b border-white/10 py-2"
            >
              <div>
                <p className="text-sm">{e.note}</p>
                <p className="text-xs text-gray-400">
                  {e.category}
                </p>
              </div>
              <span className="text-sm font-semibold">
                ₹{e.amount}
              </span>
            </div>
          ))
        )}
      </Card>

    </div>
  );
}