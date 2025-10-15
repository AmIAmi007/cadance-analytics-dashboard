import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, Circle } from "lucide-react";

const COLORS = ["#ef4444", "#3b82f6"];

const DataVisualization = ({
  chartType,
  onChartTypeChange,
  chartData,
  pieData,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Data Visualization</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onChartTypeChange("bar")}
            className={`p-2 rounded-lg ${
              chartType === "bar" ? "bg-purple-600" : "bg-white/20"
            } text-white`}
          >
            <BarChart3 size={20} />
          </button>
          <button
            onClick={() => onChartTypeChange("pie")}
            className={`p-2 rounded-lg ${
              chartType === "pie" ? "bg-purple-600" : "bg-white/20"
            } text-white`}
          >
            <Circle size={20} />
          </button>
        </div>
      </div>
      <div className="h-80">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1b4b",
                  border: "1px solid #fff3",
                }}
              />
              <Legend />
              <Bar dataKey="P0" fill="#ef4444" />
              <Bar dataKey="P1" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;
