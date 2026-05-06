import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "food",
    note: "",
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch Expenses
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

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // ✏️ UPDATE
        const res = await axios.put(
          `https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setExpenses((prev) =>
          prev.map((e) => (e._id === editId ? res.data : e))
        );

        setEditId(null);
      } else {
        // ➕ ADD
        const res = await axios.post(
          "https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses/add",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setExpenses((prev) => [res.data, ...prev]);
      }

      // reset form
      setForm({ amount: "", category: "food", note: "" });

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await axios.delete(`https://ai-expense-tracker-backend-rvb8.onrender.com/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ EDIT CLICK
  const handleEdit = (item) => {
    setForm({
      amount: item.amount,
      category: item.category,
      note: item.note,
    });
    setEditId(item._id);
  };

  // 🔍 FILTER + SEARCH
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchCategory = filter ? e.category === filter : true;
      const matchSearch = e.note
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [expenses, filter, search]);

  return (
    <div className="text-white">

      {/* 🔹 Header */}
      <h1 className="text-2xl font-bold mb-6">💸 Expenses</h1>

          {/* ➕ Add / Edit Form */}
         <div className="mb-6">
            <Card title={editId ? "✏️ Edit Expense" : "Add Expense"}>
                <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-4"
                >
                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                    }
                    className="p-2 rounded bg-white/10 w-full"
                    required
                />

                <select
                    value={form.category}
                    onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                    }
                    className="p-2 rounded bg-white/10 w-full text-black"
                >
                   
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                    <option value="other">Other</option>
                </select>

                <input
                    type="text"
                    placeholder="Note"
                    value={form.note}
                    onChange={(e) =>
                    setForm({ ...form, note: e.target.value })
                    }
                    className="p-2 rounded bg-white/10 w-full"
                />

                <button className="bg-green-500 px-4 py-2 rounded">
                    {editId ? "Update" : "Add"}
                </button>
                </form>
            </Card>
         </div>

          {/* 🔍 Filters */}
          <div className="mb-6">
            <Card title="Filters" className="mt-6">
                <div className="flex flex-col md:flex-row gap-4">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 rounded bg-white/10 text-black"
                >
                    
                    <option value="">All</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                           
                </select>

                <input
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded bg-white/10 w-full"
                />
                </div>
            </Card>
        </div>
      {/* 📋 List */}
      <Card title="Expense List" className="mt-6 ">
        {filteredExpenses.length === 0 ? (
          <p className="text-gray-400 text-center">
            No expenses found
          </p>
        ) : (
          filteredExpenses.map((e) => (
            <div
              key={e._id}
              className="flex flex-col md:flex-row justify-between md:items-center 
              bg-white/10 p-3 rounded mb-3 gap-2"
            >
              <div>
                <p className="font-semibold">
                  ₹{e.amount} • {e.category}
                </p>
                <p className="text-sm text-gray-400">{e.note}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(e)}
                  className="text-blue-400 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(e._id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </Card>

    </div>
  );
}