
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
  ReferenceLine,
} from "recharts";
import { useState } from "react";

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

  // מצב לשליטה בתצוגת הגרף
  const [visibleSubjects, setVisibleSubjects] = useState({
    reading: true,
    math: true,
    writing: true,
  });

  // פונקציה להחלפת מצב הנראות של כל נושא
  const toggleSubjectVisibility = (subject: keyof typeof visibleSubjects) => {
    setVisibleSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  // חישוב ממוצע הציונים לכל חודש כדי להציג קו ייחוס
  const averageScores = data.map(item => {
    const visibleScores = [];
    if (visibleSubjects.reading) visibleScores.push(item.reading);
    if (visibleSubjects.math) visibleScores.push(item.math);
    if (visibleSubjects.writing) visibleScores.push(item.writing);
    
    const sum = visibleScores.reduce((acc, score) => acc + score, 0);
    return {
      month: item.month,
      average: visibleScores.length > 0 ? Math.round(sum / visibleScores.length) : 0,
    };
  });

  // חישוב הציון הממוצע הכללי על פני כל החודשים
  const overallAverage = Math.round(
    averageScores.reduce((acc, item) => acc + item.average, 0) / averageScores.length
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChartLine className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-medium">התקדמות לאורך זמן</h3>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => toggleSubjectVisibility("reading")}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              visibleSubjects.reading
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            קריאה
          </button>
          <button
            onClick={() => toggleSubjectVisibility("math")}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              visibleSubjects.math
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            חשבון
          </button>
          <button
            onClick={() => toggleSubjectVisibility("writing")}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              visibleSubjects.writing
                ? "bg-purple-100 text-purple-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            כתיבה
          </button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} domain={[0, 100]} />
            <Tooltip 
              formatter={(value, name) => {
                const translations = {
                  reading: "קריאה",
                  math: "חשבון",
                  writing: "כתיבה",
                };
                return [value, translations[name as keyof typeof translations] || name];
              }}
            />
            <Legend />
            
            {/* קו ייחוס לממוצע הכללי */}
            <ReferenceLine 
              y={overallAverage} 
              label={{ 
                value: `ממוצע: ${overallAverage}`, 
                position: 'right',
                fill: '#666',
                fontSize: 12 
              }} 
              stroke="#666" 
              strokeDasharray="3 3" 
            />
            
            {visibleSubjects.reading && (
              <Line
                type="monotone"
                dataKey="reading"
                name="קריאה"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            )}
            
            {visibleSubjects.math && (
              <Line
                type="monotone"
                dataKey="math"
                name="חשבון"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
                activeDot={{ r: 6 }}
              />
            )}
            
            {visibleSubjects.writing && (
              <Line
                type="monotone"
                dataKey="writing"
                name="כתיבה"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6" }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="bg-blue-50 p-2 rounded-md text-center">
          <div className="font-semibold text-blue-800">קריאה</div>
          <div className="text-blue-600">{data[data.length - 1].reading} נק'</div>
        </div>
        <div className="bg-green-50 p-2 rounded-md text-center">
          <div className="font-semibold text-green-800">חשבון</div>
          <div className="text-green-600">{data[data.length - 1].math} נק'</div>
        </div>
        <div className="bg-purple-50 p-2 rounded-md text-center">
          <div className="font-semibold text-purple-800">כתיבה</div>
          <div className="text-purple-600">{data[data.length - 1].writing} נק'</div>
        </div>
      </div>
    </div>
  );
};
