
import React from "react";
import { ArrowLeft, Star, Award, BookOpen, CheckCircle } from "lucide-react";

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
    hasNewRewards: id % 2 === 0,
    completedTasks: 3 + (id % 3),
    totalTasks: 5 + (id % 2)
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all cursor-pointer animate-fade-up relative overflow-hidden group"
      onClick={onClick}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* תג הצגת פרס חדש זמין */}
      {rewardsInfo.hasNewRewards && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="bg-yellow-500 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg shadow-md transform rotate-12 animate-pulse">
            פרס חדש!
          </div>
        </div>
      )}
    
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="font-display text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-muted-foreground">{grade}</p>
        </div>
        <div className="bg-primary/10 rounded-full p-2.5 hover:bg-primary/20 transition-colors">
          <ArrowLeft className="w-5 h-5 text-primary" />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="font-medium">התקדמות</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor(progress)} transition-all duration-500 ease-in-out relative`} 
            style={{ width: `${progress}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* משימות שהושלמו */}
      <div className="mt-4 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span className="text-sm text-gray-600">
          <span className="font-medium">{rewardsInfo.completedTasks}/{rewardsInfo.totalTasks}</span> משימות הושלמו
        </span>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2 font-medium">מקצועות:</p>
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((subject, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* הוספת מידע על מערכת הפרסים */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">{rewardsInfo.points} נקודות</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
          <Star className="w-4 h-4 text-yellow-600 fill-yellow-400" />
          <span className="text-sm font-medium text-yellow-700">רמה {rewardsInfo.level}</span>
        </div>
      </div>
    </div>
  );
};
