
import { useState } from "react";
import { StudentCard } from "@/components/StudentCard";
import { PerformanceChart } from "@/components/PerformanceChart";

const students = [
  {
    id: 1,
    name: "David Cohen",
    grade: "Grade 3",
    progress: 75,
    subjects: ["Reading", "Writing", "Math"]
  },
  {
    id: 2,
    name: "Sarah Levy",
    grade: "Grade 3",
    progress: 82,
    subjects: ["Reading", "Science", "Writing"]
  },
  {
    id: 3,
    name: "Tom Aloni",
    grade: "Grade 4",
    progress: 68,
    subjects: ["Math", "Writing", "Art"]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Student Progress Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and analyze student performance in real-time
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
            <h3 className="font-display text-lg font-medium mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent rounded-lg">
                <div className="text-2xl font-semibold">9</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="text-2xl font-semibold">75%</div>
                <div className="text-sm text-muted-foreground">Average Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
