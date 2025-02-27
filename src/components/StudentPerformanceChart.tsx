
import { ChartLine } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StudentPerformanceChartProps {
  studentId: number;
}

export const StudentPerformanceChart = ({ studentId }: StudentPerformanceChartProps) => {
  // בעתיד נוכל לטעון נתונים ספציפיים לתלמיד באמצעות ה-ID
  // כרגע משתמשים בנתוני דוגמה
  const data = [
    { month: "ינואר", reading: 65, math: 70, writing: 60 },
    { month: "פברואר", reading: 68, math: 72, writing: 65 },
    { month: "מרץ", reading: 72, math: 68, writing: 70 },
    { month: "אפריל", reading: 75, math: 75, writing: 72 },
    { month: "מאי", reading: 82, math: 80, writing: 78 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center gap-2 mb-6">
        <ChartLine className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-medium">התקדמות לאורך זמן</h3>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reading"
              name="קריאה"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="math"
              name="חשבון"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="writing"
              name="כתיבה"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
