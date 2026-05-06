import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CustomPieChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow h-80">
      <h2 className="mb-3 font-semibold">Category Breakdown</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}