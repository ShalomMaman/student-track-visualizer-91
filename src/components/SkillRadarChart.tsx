
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Award } from "lucide-react";

interface SkillRadarChartProps {
  studentId: number;
}

export const SkillRadarChart = ({ studentId }: SkillRadarChartProps) => {
  // נתונים לדוגמה - בעתיד יוזנו מהשרת
  const data = [
    { skill: "קריאה", value: 85 },
    { skill: "כתיבה", value: 75 },
    { skill: "חשבון", value: 90 },
    { skill: "מדעים", value: 65 },
    { skill: "אנגלית", value: 70 },
    { skill: "אמנות", value: 80 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-medium">פרופיל מיומנויות</h3>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="ציון"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
