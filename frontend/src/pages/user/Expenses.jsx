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
  <div className="text-white p-4 sm:p-6">

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-3xl sm:text-4xl font-bold">
        💸 Expenses
      </h1>

      <p className="text-gray-400 mt-2">
        Manage and track your daily expenses
      </p>

    </div>

    {/* ADD / EDIT FORM */}
    <div className="mb-8">

      <Card title={editId ? "✏️ Edit Expense" : "➕ Add Expense"}>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4"
        >

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/10
              outline-none
            "
            required
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/10
              text-white
            "
          >
            <option value="food" className="text-black">Food</option>
            <option value="transport" className="text-black">Transport</option>
            <option value="shopping" className="text-black">Shopping</option>
            <option value="bills" className="text-black">Bills</option>
            <option value="other" className="text-black">Other</option>
          </select>

          <input
            type="text"
            placeholder="Note"
            value={form.note}
            onChange={(e) =>
              setForm({
                ...form,
                note: e.target.value,
              })
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/10
              outline-none
            "
          />

          <button
            className="
              bg-green-500
              hover:bg-green-600
              rounded-xl
              font-semibold
              transition
              px-4
            "
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>

        </form>

      </Card>

    </div>

    {/* FILTERS */}
    <div className="mb-8">

      <Card title="🔍 Filters">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          <select
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/10
              text-white
            "
          >
            <option value="" className="text-black">All Categories</option>
            <option value="food" className="text-black">Food</option>
            <option value="transport" className="text-black">Transport</option>
            <option value="shopping" className="text-black">Shopping</option>
            <option value="bills" className="text-black">Bills</option>
          </select>

          <input
            placeholder="Search expenses..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/10
              outline-none
            "
          />

        </div>

      </Card>

    </div>

    {/* EXPENSE LIST */}
    <Card title="📋 Expense List">

      {filteredExpenses.length === 0 ? (

        <div className="py-10 text-center">

          <p className="text-5xl mb-3">
            📭
          </p>

          <p className="text-gray-400">
            No expenses found
          </p>

        </div>

      ) : (

        <div className="space-y-4 mt-4">

          {filteredExpenses.map((e) => (

            <div
              key={e._id}
              className="
                bg-white/5
                border border-white/10
                rounded-2xl
                p-4
                flex
                flex-col
                sm:flex-row
                justify-between
                gap-4
                hover:bg-white/10
                transition
              "
            >

              <div>

                <h3 className="text-lg font-bold">
                  ₹{e.amount}
                </h3>

                <p className="text-gray-400">
                  {e.category}
                </p>

                <p className="mt-2">
                  {e.note}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(
                    e.date
                  ).toLocaleDateString()}
                </p>

              </div>

              <div
                className="
                  flex
                  gap-3
                  sm:flex-col
                  md:flex-row
                  items-start
                "
              >

                <button
                  onClick={() => handleEdit(e)}
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    px-4 py-2
                    rounded-xl
                    text-sm
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(e._id)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    px-4 py-2
                    rounded-xl
                    text-sm
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </Card>

  </div>
);
}