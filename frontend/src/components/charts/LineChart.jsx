import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function CustomLineChart({ data }) {
  return (
    <div className="w-full h-[350px]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
          />

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
          />

          <YAxis
            stroke="#9CA3AF"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}


// src/components/charts/LineChart.jsx

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function CustomLineChart({ data }) {

//   return (

//     <div className="w-full h-[350px]">

//       <ResponsiveContainer width="100%" height="100%">

//         <LineChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 0,
//             bottom: 5,
//           }}
//         >

//           <CartesianGrid
//             strokeDasharray="3 3"
//             stroke="#374151"
//           />

//           <XAxis
//             dataKey="month"
//             stroke="#9CA3AF"
//           />

//           <YAxis
//             stroke="#9CA3AF"
//           />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#111827",
//               border: "none",
//               borderRadius: "12px",
//               color: "#fff",
//             }}
//           />

//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#3B82F6"
//             strokeWidth={4}
//             dot={{ r: 5 }}
//             activeDot={{ r: 8 }}
//           />

//         </LineChart>

//       </ResponsiveContainer>

//     </div>

//   );
// }