import { useState } from "react";

export default function AIInput({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    onAdd({
      amount,
      category,
      note,
    });

    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded bg-white/10 text-white"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded bg-white/10 text-white"
      >
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="bills">Bills</option>
        <option value="other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 rounded bg-white/10 text-white"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 p-3 rounded"
      >
        Add Expense
      </button>
    </div>
  );
}