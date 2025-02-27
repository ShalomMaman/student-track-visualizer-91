
import { GraduationCap, ChartBar, Book } from "lucide-react";

interface StudentCardProps {
  name: string;
  grade: string;
  progress: number;
  subjects: string[];
}

export const StudentCard = ({ name, grade, progress, subjects }: StudentCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{grade}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">התקדמות כללית</span>
            <span className="text-sm text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {subjects.map((subject) => (
            <span 
              key={subject}
              className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
