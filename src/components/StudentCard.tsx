
import React from "react";
import { ArrowLeft } from "lucide-react";

interface StudentCardProps {
  id: number;
  name: string;
  grade: string;
  progress: number;
  subjects: string[];
  onClick?: () => void;
}

export const StudentCard = ({ id, name, grade, progress, subjects, onClick }: StudentCardProps) => {
  // Determine progress color based on value
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer animate-fade-up"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-display text-xl font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{grade}</p>
        </div>
        <div className="bg-accent rounded-full p-2">
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span>התקדמות</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor(progress)} transition-all duration-500 ease-in-out`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">מקצועות:</p>
        <div className="flex flex-wrap gap-1">
          {subjects.map((subject, index) => (
            <span 
              key={index} 
              className="text-xs bg-accent px-2 py-1 rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
