export default function ExpenseList({ expenses }) {
  return (
    <div>
      <h2 className="font-bold mb-2">Transactions</h2>
      {expenses.map((e) => (
        <div key={e._id} className="p-2 border mb-2 rounded">
          ₹{e.amount} - {e.category}
        </div>
      ))}
    </div>
  );
}