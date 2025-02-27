
import { CalendarClock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Assignment {
  id: number;
  name: string;
  dueDate: string;
  subject: string;
  status: "completed" | "in-progress" | "not-started";
}

interface UpcomingAssignmentsProps {
  studentId: number;
}

export const UpcomingAssignments = ({ studentId }: UpcomingAssignmentsProps) => {
  const navigate = useNavigate();
  
  // נתונים לדוגמה
  const assignments: Assignment[] = [
    {
      id: 3,
      name: "כתיבת חיבור קצר על משפחה",
      dueDate: "22/05/2023",
      subject: "כתיבה",
      status: "in-progress"
    },
    {
      id: 4,
      name: "תרגילי חיבור וחיסור עם שברים",
      dueDate: "25/05/2023",
      subject: "חשבון",
      status: "in-progress"
    },
    {
      id: 5,
      name: "קריאת פרק 3 בספר 'הרפתקאות בגן החיות'",
      dueDate: "28/05/2023",
      subject: "קריאה",
      status: "not-started"
    }
  ];

  // פונקציה להצגת צבע לפי סטטוס המשימה
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "not-started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // פונקציה להצגת טקסט סטטוס בעברית
  const getStatusText = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return "הושלם";
      case "in-progress":
        return "בתהליך";
      case "not-started":
        return "טרם התחיל";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-medium">משימות קרובות</h3>
        </div>
        <button 
          onClick={() => navigate('/assignments')}
          className="flex items-center text-primary text-sm hover:underline"
        >
          כל המשימות
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate(`/assignments/${assignment.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{assignment.name}</h4>
                <span className="text-xs text-muted-foreground block mt-1">נושא: {assignment.subject}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}>
                  {getStatusText(assignment.status)}
                </span>
                <span className="text-xs text-muted-foreground block mt-1">תאריך: {assignment.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
