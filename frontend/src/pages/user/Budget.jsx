import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";
import GlassCard from "../../components/ui/GlassCard";

export default function Budget() {
  const [expenses, setExpenses] = useState([]);

  // 🔥 Dynamic Budget
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("monthlyBudget")) || 10000;
  });

  const [newBudget, setNewBudget] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch Expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
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
      console.error(err);
    }
  };

  // 💰 Total Spending
  const total = useMemo(() => {
    return expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );
  }, [expenses]);

  // 📊 Budget Percentage
  const percent = Math.min((total / budget) * 100, 100);

  // 💸 Remaining
  const remaining = budget - total;

  // 🎨 Progress Color
  const progressColor =
    percent < 50
      ? "bg-green-500"
      : percent < 80
      ? "bg-yellow-500"
      : "bg-red-500";

  // 🔥 Update Budget
  const handleSaveBudget = () => {
    if (!newBudget || Number(newBudget) <= 0) {
      return alert("Enter valid budget");
    }

    localStorage.setItem("monthlyBudget", newBudget);

    setBudget(Number(newBudget));

    setNewBudget("");

    alert("✅ Budget updated successfully");
  };

  return (
    <div className="text-white">

      {/* 🔹 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
           Budget Planner
        </h1>

        <p className="text-gray-400">
          Manage and track your monthly spending
        </p>
      </div>

      {/* 🔥 Budget Overview */}
      <GlassCard className="mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}
          <div>

            <h2 className="text-2xl font-semibold mb-2">
              Monthly Budget
            </h2>

            <p className="text-gray-300 text-lg">
              ₹{total} spent out of ₹{budget}
            </p>

          </div>

          {/* Right */}
          <div className="text-right">

            {remaining >= 0 ? (
              <p className="text-green-400 text-lg font-semibold">
                 ₹{remaining} Remaining
              </p>
            ) : (
              <p className="text-red-400 text-lg font-semibold">
                 Exceeded by ₹{Math.abs(remaining)}
              </p>
            )}

          </div>

        </div>

        {/* 🔥 Progress Bar */}
        <div className="mt-6">

          <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden">

            <div
              className={`${progressColor} h-5 rounded-full transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />

          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-400">

            <span>0%</span>

            <span>{percent.toFixed(0)}%</span>

            <span>100%</span>

          </div>

        </div>

      </GlassCard>

      {/* 🔹 Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card
          title="Total Spent"
          value={`₹${total}`}
        />

        <Card
          title="Budget Limit"
          value={`₹${budget}`}
        />

        <Card
          title="Remaining"
          value={
            remaining >= 0
              ? `₹${remaining}`
              : `-₹${Math.abs(remaining)}`
          }
        />

      </div>

      {/* 🔥 Update Budget */}
      <Card>

        <h2 className="text-xl font-semibold mb-5">
          Update Monthly Budget
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="number"
            placeholder="Enter new budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSaveBudget}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold"
          >
            Save Budget
          </button>

        </div>

      </Card>

    </div>
  );
}