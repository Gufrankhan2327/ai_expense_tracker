import Card from "../../components/ui/Card";
import CustomLineChart from "../../components/charts/LineChart";
import CustomPieChart from "../../components/charts/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 Category Data
  const categoryMap = {};
  data.forEach((e) => {
    const cat = e.category || "other";
    categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
  });

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  // 📈 Monthly Data
  const monthlyMap = {};
  data.forEach((e) => {
    if (!e.date) return;
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyMap[key] = (monthlyMap[key] || 0) + Number(e.amount);
  });

  const lineData = Object.entries(monthlyMap).map(([key, value]) => {
    const [year, month] = key.split("-");
    const date = new Date(year, month);
    return {
      month: date.toLocaleString("default", { month: "short" }),
      value,
    };
  });

  return (
    <div className="text-white">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        📊 Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card title="Category Breakdown">
          {pieData.length === 0 ? (
            <p className="text-gray-400 text-center">No data</p>
          ) : (
            <CustomPieChart data={pieData} />
          )}
        </Card>

        <Card title="Monthly Trend">
          {lineData.length === 0 ? (
            <p className="text-gray-400 text-center">No data</p>
          ) : (
            <CustomLineChart data={lineData} />
          )}
        </Card>

      </div>
    </div>
  );
}