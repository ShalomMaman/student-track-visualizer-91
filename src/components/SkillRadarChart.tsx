
import React from "react";
import { Brain, BarChart } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { useState, useEffect } from "react";

interface SkillRadarChartProps {
  studentId: number;
}

export const SkillRadarChart = ({ studentId }: SkillRadarChartProps) => {
  // בעתיד נוכל לטעון נתונים ספציפיים לתלמיד לפי המזהה
  // משתמשים ב-ID כדי לדמות מידע שונה לכל תלמיד
  const skillsData = [
    { skill: "קריאה", value: 65 + (studentId % 5) * 5, fullMark: 100 },
    { skill: "כתיבה", value: 60 + (studentId % 3) * 7, fullMark: 100 },
    { skill: "חשבון", value: 72 + (studentId % 4) * 6, fullMark: 100 },
    { skill: "הבנת הנקרא", value: 68 + (studentId % 3) * 8, fullMark: 100 },
    { skill: "עבודת צוות", value: 80 + (studentId % 2) * 5, fullMark: 100 },
    { skill: "יצירתיות", value: 75 + (studentId % 3) * 6, fullMark: 100 },
  ];

  // מצב לאנימציה
  const [animationActive, setAnimationActive] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(true);

  useEffect(() => {
    // הפעלת אנימציה בטעינה
    setAnimationActive(true);

    const timer = setTimeout(() => {
      setAnimationActive(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // פונקציה לבחירת מיומנות
  const handleSkillSelect = (skill: string) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null);
      setShowAllSkills(true);
    } else {
      setSelectedSkill(skill);
      setShowAllSkills(false);
      setAnimationActive(true);
    }
  };

  // מותאם אישית tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="font-bold">{data.skill}</p>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: "#8884d8" }}
            />
            <p className="text-sm">
              ערך: <span className="font-bold">{data.value}</span>
            </p>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-1 bg-indigo-500 rounded-full" 
              style={{ width: `${data.value}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {data.value >= 80 
              ? "רמה גבוהה מאוד" 
              : data.value >= 65 
                ? "רמה טובה" 
                : "דורש שיפור"}
          </p>
        </div>
      );
    }
    return null;
  };

  // הכנת נתונים להצגה
  const dataToDisplay = showAllSkills 
    ? skillsData 
    : skillsData.filter(item => item.skill === selectedSkill);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-medium">מיומנויות וכישורים</h3>
        </div>
        
        <button
          onClick={() => {
            setShowAllSkills(true);
            setSelectedSkill(null);
            setAnimationActive(true);
          }}
          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          הצג הכל
        </button>
      </div>

      {/* Skill selector buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillsData.map((item) => (
          <button
            key={item.skill}
            onClick={() => handleSkillSelect(item.skill)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedSkill === item.skill
                ? "bg-primary text-white"
                : "bg-accent hover:bg-gray-300"
            }`}
          >
            {item.skill}
          </button>
        ))}
      </div>

      {/* מציג מספר / פירוט לכישור כאשר בוחרים אחד */}
      {selectedSkill && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{selectedSkill}</h4>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4 text-primary" />
              <span className="font-bold">
                {skillsData.find(s => s.skill === selectedSkill)?.value}%
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${skillsData.find(s => s.skill === selectedSkill)?.value}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {(() => {
              const value = skillsData.find(s => s.skill === selectedSkill)?.value || 0;
              if (value >= 80) return "התלמיד מצטיין במיומנות זו ומפגין שליטה מלאה";
              if (value >= 65) return "התלמיד מציג רמה טובה, אך יש מקום לשיפור";
              return "התלמיד זקוק לתרגול נוסף כדי לשפר מיומנות זו";
            })()}
          </p>
        </div>
      )}

      <div className="h-[300px] w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="80%" data={skillsData}>
            <PolarGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" stroke="#6b7280" fontSize={12} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#e5e7eb" />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="מיומנויות"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.5}
              isAnimationActive={animationActive}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {skillsData.map((skill) => (
          <div 
            key={skill.skill} 
            className={`p-2 border rounded-md cursor-pointer transition-all ${
              selectedSkill === skill.skill ? "border-primary bg-primary/5" : "hover:border-gray-300"
            }`}
            onClick={() => handleSkillSelect(skill.skill)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium truncate">{skill.skill}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                skill.value >= 80 ? "bg-green-100 text-green-800" :
                skill.value >= 65 ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {skill.value}%
              </span>
            </div>
            <div className="w-full h-1 bg-gray-200 mt-2 rounded-full">
              <div 
                className={`h-1 rounded-full ${
                  skill.value >= 80 ? "bg-green-500" :
                  skill.value >= 65 ? "bg-blue-500" :
                  "bg-yellow-500"
                }`}
                style={{ width: `${skill.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
