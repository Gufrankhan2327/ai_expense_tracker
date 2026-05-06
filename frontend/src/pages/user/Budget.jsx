import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

export default function Budget() {
  const [total, setTotal] = useState(0);
  const budget = 5000;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTotal();
  }, []);

  const fetchTotal = async () => {
    const res = await axios.get("https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const sum = res.data.reduce(
      (acc, e) => acc + Number(e.amount || 0),
      0
    );

    setTotal(sum);
  };

  const percent = Math.min((total / budget) * 100, 100);

  return (
    <div className="text-white">

      <h1 className="text-2xl font-bold mb-6">🎯 Budget</h1>

      <Card title="Monthly Budget">

        <p className="mb-2">
          ₹{total} / ₹{budget}
        </p>

        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-400">
          {total > budget
            ? `Exceeded by ₹${total - budget}`
            : `Remaining ₹${budget - total}`}
        </p>

      </Card>
    </div>
  );
}