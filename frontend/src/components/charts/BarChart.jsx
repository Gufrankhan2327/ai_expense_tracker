import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function AdminBarChart({
  data = [],
  title = "📊 Expense Analytics",
  subtitle = "Category-wise expense overview",
}) {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6
      h-full
    "
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>

        <div
          className="
          bg-blue-500/20
          text-blue-400
          px-4 py-2
          rounded-xl
          text-sm
        "
        >
          {data.length} Categories
        </div>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [value, "Users"]}
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="users"
              radius={[14, 14, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name || index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}