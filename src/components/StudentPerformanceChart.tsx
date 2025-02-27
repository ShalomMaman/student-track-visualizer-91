
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
  Area,
  ComposedChart,
} from "recharts";
import { useState, useEffect } from "react";

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

  // מצב לאנימציה
  const [animationActive, setAnimationActive] = useState(false);
  
  // מצב לסוג התצוגה (קו או אזור)
  const [displayMode, setDisplayMode] = useState<"line" | "area">("line");

  // מצב לציון החודש הנבחר
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // פעילות אנימציה בטעינה
  useEffect(() => {
    setAnimationActive(true);
    
    // הפעלת אנימציית סלקציה אוטומטית על החודש האחרון לאחר טעינת האנימציה הראשונית
    const timer = setTimeout(() => {
      setSelectedMonth(data[data.length - 1].month);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // פונקציה להחלפת מצב הנראות של כל נושא
  const toggleSubjectVisibility = (subject: keyof typeof visibleSubjects) => {
    setAnimationActive(true);
    setVisibleSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  // פונקציה להחלפת מצב התצוגה
  const toggleDisplayMode = () => {
    setAnimationActive(true);
    setDisplayMode(prev => (prev === "line" ? "area" : "line"));
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

  // משתמש-מותאם tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-bold text-sm mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-sm">
                  <span className="font-medium">
                    {entry.name === "reading" ? "קריאה" : 
                      entry.name === "math" ? "חשבון" : 
                      entry.name === "writing" ? "כתיבה" : 
                      entry.name}
                  </span>:{" "}
                  <span className="font-bold">{entry.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // פונקציה לטיפול בלחיצה על נקודת נתונים בגרף
  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length) {
      setSelectedMonth(data.activePayload[0].payload.month);
    }
  };

  // הנפשת הדגשת הנקודה הנבחרת
  useEffect(() => {
    if (selectedMonth) {
      const timer = setTimeout(() => {
        setSelectedMonth(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedMonth]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChartLine className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-medium">התקדמות לאורך זמן</h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={toggleDisplayMode}
            className="px-3 py-1 text-xs font-medium rounded-full transition-colors bg-purple-100 text-purple-800 hover:bg-purple-200"
          >
            {displayMode === "line" ? "הצג כאזורים" : "הצג כקווים"}
          </button>
          
          <div className="flex gap-1 text-sm">
            <button
              onClick={() => toggleSubjectVisibility("reading")}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                visibleSubjects.reading
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              קריאה
            </button>
            <button
              onClick={() => toggleSubjectVisibility("math")}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                visibleSubjects.math
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              חשבון
            </button>
            <button
              onClick={() => toggleSubjectVisibility("writing")}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                visibleSubjects.writing
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              כתיבה
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] w-full overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          {displayMode === "line" ? (
            <LineChart 
              data={data} 
              onClick={handleClick}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} domain={[40, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => {
                  const translations = {
                    reading: "קריאה",
                    math: "חשבון",
                    writing: "כתיבה",
                  };
                  return translations[value as keyof typeof translations] || value;
                }}
              />
              
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
                  name="reading"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <g>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={selectedMonth === payload.month ? 6 : 4} 
                          fill={selectedMonth === payload.month ? "#3b82f6" : "#fff"} 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          className={selectedMonth === payload.month ? "animate-pulse" : ""}
                        />
                      </g>
                    );
                  }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                  isAnimationActive={animationActive}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              )}
              
              {visibleSubjects.math && (
                <Line
                  type="monotone"
                  dataKey="math"
                  name="math"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <g>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={selectedMonth === payload.month ? 6 : 4} 
                          fill={selectedMonth === payload.month ? "#10b981" : "#fff"} 
                          stroke="#10b981" 
                          strokeWidth={2}
                          className={selectedMonth === payload.month ? "animate-pulse" : ""}
                        />
                      </g>
                    );
                  }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                  isAnimationActive={animationActive}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={300}
                />
              )}
              
              {visibleSubjects.writing && (
                <Line
                  type="monotone"
                  dataKey="writing"
                  name="writing"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <g>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={selectedMonth === payload.month ? 6 : 4} 
                          fill={selectedMonth === payload.month ? "#8b5cf6" : "#fff"} 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          className={selectedMonth === payload.month ? "animate-pulse" : ""}
                        />
                      </g>
                    );
                  }}
                  activeDot={{ r: 6, fill: "#8b5cf6" }}
                  isAnimationActive={animationActive}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={600}
                />
              )}
            </LineChart>
          ) : (
            <ComposedChart 
              data={data}
              onClick={handleClick}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} domain={[40, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => {
                  const translations = {
                    reading: "קריאה",
                    math: "חשבון",
                    writing: "כתיבה",
                  };
                  return translations[value as keyof typeof translations] || value;
                }}
              />
              
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
                <>
                  <Area
                    type="monotone"
                    dataKey="reading"
                    name="reading"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="reading"
                    name="reading"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <g>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={selectedMonth === payload.month ? 6 : 4} 
                            fill={selectedMonth === payload.month ? "#3b82f6" : "#fff"} 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            className={selectedMonth === payload.month ? "animate-pulse" : ""}
                          />
                        </g>
                      );
                    }}
                    activeDot={{ r: 6, fill: "#3b82f6" }}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </>
              )}
              
              {visibleSubjects.math && (
                <>
                  <Area
                    type="monotone"
                    dataKey="math"
                    name="math"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                  <Line
                    type="monotone"
                    dataKey="math"
                    name="math"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <g>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={selectedMonth === payload.month ? 6 : 4} 
                            fill={selectedMonth === payload.month ? "#10b981" : "#fff"} 
                            stroke="#10b981" 
                            strokeWidth={2}
                            className={selectedMonth === payload.month ? "animate-pulse" : ""}
                          />
                        </g>
                      );
                    }}
                    activeDot={{ r: 6, fill: "#10b981" }}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                </>
              )}
              
              {visibleSubjects.writing && (
                <>
                  <Area
                    type="monotone"
                    dataKey="writing"
                    name="writing"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={600}
                  />
                  <Line
                    type="monotone"
                    dataKey="writing"
                    name="writing"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <g>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={selectedMonth === payload.month ? 6 : 4} 
                            fill={selectedMonth === payload.month ? "#8b5cf6" : "#fff"} 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            className={selectedMonth === payload.month ? "animate-pulse" : ""}
                          />
                        </g>
                      );
                    }}
                    activeDot={{ r: 6, fill: "#8b5cf6" }}
                    isAnimationActive={animationActive}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={600}
                  />
                </>
              )}
            </ComposedChart>
          )}
        </ResponsiveContainer>
        
        {/* השכבה העליונה שתופיע כאשר משנים את התצוגה */}
        {animationActive && (
          <div 
            className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-fade-out"
            onAnimationEnd={() => setAnimationActive(false)}
          >
            <div className="text-lg font-medium text-primary animate-pulse">טוען נתונים...</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div 
          className="bg-blue-50 p-3 rounded-md text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer"
          onClick={() => {
            setVisibleSubjects({ reading: true, math: false, writing: false });
            setAnimationActive(true);
          }}
        >
          <div className="font-semibold text-blue-800">קריאה</div>
          <div className="text-blue-600 text-lg font-bold">{data[data.length - 1].reading} נק'</div>
          <div className="text-xs text-blue-500">
            {data[data.length - 1].reading - data[0].reading > 0 
              ? `שיפור של ${data[data.length - 1].reading - data[0].reading} נקודות` 
              : `ירידה של ${data[0].reading - data[data.length - 1].reading} נקודות`}
          </div>
        </div>
        
        <div 
          className="bg-green-50 p-3 rounded-md text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer"
          onClick={() => {
            setVisibleSubjects({ reading: false, math: true, writing: false });
            setAnimationActive(true);
          }}
        >
          <div className="font-semibold text-green-800">חשבון</div>
          <div className="text-green-600 text-lg font-bold">{data[data.length - 1].math} נק'</div>
          <div className="text-xs text-green-500">
            {data[data.length - 1].math - data[0].math > 0 
              ? `שיפור של ${data[data.length - 1].math - data[0].math} נקודות` 
              : `ירידה של ${data[0].math - data[data.length - 1].math} נקודות`}
          </div>
        </div>
        
        <div 
          className="bg-purple-50 p-3 rounded-md text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer"
          onClick={() => {
            setVisibleSubjects({ reading: false, math: false, writing: true });
            setAnimationActive(true);
          }}
        >
          <div className="font-semibold text-purple-800">כתיבה</div>
          <div className="text-purple-600 text-lg font-bold">{data[data.length - 1].writing} נק'</div>
          <div className="text-xs text-purple-500">
            {data[data.length - 1].writing - data[0].writing > 0 
              ? `שיפור של ${data[data.length - 1].writing - data[0].writing} נקודות` 
              : `ירידה של ${data[0].writing - data[data.length - 1].writing} נקודות`}
          </div>
        </div>
      </div>
    </div>
  );
};
