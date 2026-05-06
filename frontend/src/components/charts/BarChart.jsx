import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminBarChart({ data }) {
  return (
    <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-lg">
      <h2 className="text-white mb-4">📊 User Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}