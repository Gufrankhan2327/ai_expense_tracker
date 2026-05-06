export default function AIInsights({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="bg-green-100 p-4 mt-4 rounded">
      {total > 5000
        ? "⚠️ You are spending too much!"
        : "✅ Spending is under control"}
    </div>
  );
}