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
    const res = await axios.get("https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data || []);
  };

  // 📤 CSV Export
  const exportCSV = () => {
    const rows = [
      ["Amount", "Category", "Note", "Date"],
      ...expenses.map((e) => [
        e.amount,
        e.category,
        e.note,
        e.date ? new Date(e.date).toLocaleDateString() : "",
      ]),
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "report.csv";
    link.click();
  };

  return (
    <div className="text-white">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          📤 Reports
        </h1>

        <button
          onClick={exportCSV}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      <Card title="Report Summary">
        <p className="text-gray-300">
          Total Records: {expenses.length}
        </p>
      </Card>

    </div>
  );
}