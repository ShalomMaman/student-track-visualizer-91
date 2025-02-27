
import { useState } from "react";
import { StudentCard } from "@/components/StudentCard";
import { PerformanceChart } from "@/components/PerformanceChart";

const students = [
  {
    id: 1,
    name: "דוד כהן",
    grade: "כיתה ג'",
    progress: 75,
    subjects: ["קריאה", "כתיבה", "חשבון"]
  },
  {
    id: 2,
    name: "שרה לוי",
    grade: "כיתה ג'",
    progress: 82,
    subjects: ["קריאה", "מדעים", "כתיבה"]
  },
  {
    id: 3,
    name: "תום אלוני",
    grade: "כיתה ד'",
    progress: 68,
    subjects: ["חשבון", "כתיבה", "אומנות"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            מעקב התקדמות תלמידים
          </h1>
          <p className="text-muted-foreground text-lg">
            ניטור וניתוח ביצועי תלמידים בזמן אמת
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard key={student.id} {...student} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart />
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <h3 className="font-display text-lg font-medium mb-4">סטטיסטיקה מהירה</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent rounded-lg">
                <div className="text-2xl font-semibold">9</div>
                <div className="text-sm text-muted-foreground">סך הכל תלמידים</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="text-2xl font-semibold">75%</div>
                <div className="text-sm text-muted-foreground">ממוצע התקדמות</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
