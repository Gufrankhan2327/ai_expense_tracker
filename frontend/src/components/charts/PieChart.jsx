import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function CustomPieChart({ data }) {
  return (
    <div className="w-full h-[350px]">

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={4}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}


// src/components/charts/PieChart.jsx

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const COLORS = [
//   "#3B82F6",
//   "#10B981",
//   "#F59E0B",
//   "#EF4444",
//   "#8B5CF6",
//   "#EC4899",
// ];

// export default function CustomPieChart({ data }) {

//   return (

//     <div className="w-full h-[350px]">

//       <ResponsiveContainer width="100%" height="100%">

//         <PieChart>

//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             innerRadius={60}
//             paddingAngle={4}
//             label={({ name, percent }) =>
//               `${name} ${(percent * 100).toFixed(0)}%`
//             }
//           >

//             {data.map((entry, index) => (

//               <Cell
//                 key={index}
//                 fill={COLORS[index % COLORS.length]}
//               />

//             ))}

//           </Pie>

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#111827",
//               border: "none",
//               borderRadius: "12px",
//               color: "#fff",
//             }}
//           />

//           <Legend />

//         </PieChart>

//       </ResponsiveContainer>

//     </div>

//   );
// }