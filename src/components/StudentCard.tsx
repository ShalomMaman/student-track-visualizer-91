
import React from "react";
import { ArrowLeft, Star, Award } from "lucide-react";

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

  // מידע מערכת הפרסים - בעתיד יגיע מהשרת
  const rewardsInfo = {
    points: 100 + (id * 55), // נשתמש ב-ID כדי לדמות מידע שונה לכל תלמיד
    level: Math.min(5, Math.floor(1 + (id / 2))),
    hasNewRewards: id % 2 === 0
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer animate-fade-up relative overflow-hidden"
      onClick={onClick}
    >
      {/* תג הצגת פרס חדש זמין */}
      {rewardsInfo.hasNewRewards && (
        <div className="absolute -top-1 -right-1 transform rotate-12">
          <div className="bg-yellow-500 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg shadow-md">
            פרס חדש!
          </div>
        </div>
      )}
    
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

      {/* הוספת מידע על מערכת הפרסים */}
      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{rewardsInfo.points} נקודות</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm">רמה {rewardsInfo.level}</span>
        </div>
      </div>
    </div>
  );
};
