
import { useState } from "react";
import { ArrowRight, CheckCircle, CircleDashed, ClipboardCheck, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// סטטוס משימות
type AssignmentStatus = "all" | "completed" | "in-progress" | "not-started";

// סוג משימה
interface Assignment {
  id: number;
  name: string;
  subject: string;
  dueDate: string;
  assignedTo: string[];
  status: "completed" | "in-progress" | "not-started";
}

const Assignments = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // נתוני דוגמה למשימות
  const assignments: Assignment[] = [
    {
      id: 1,
      name: "קריאת הסיפור 'הברווזון המכוער'",
      subject: "קריאה",
      dueDate: "15/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "completed"
    },
    {
      id: 2,
      name: "דף עבודה - חיבור וחיסור עד 100",
      subject: "חשבון",
      dueDate: "18/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי"],
      status: "completed"
    },
    {
      id: 3,
      name: "כתיבת חיבור קצר על משפחה",
      subject: "כתיבה",
      dueDate: "22/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "in-progress"
    },
    {
      id: 4,
      name: "תרגילי חיבור וחיסור עם שברים",
      subject: "חשבון",
      dueDate: "25/05/2023",
      assignedTo: ["תום אלוני"],
      status: "in-progress"
    },
    {
      id: 5,
      name: "קריאת פרק 3 בספר 'הרפתקאות בגן החיות'",
      subject: "קריאה",
      dueDate: "28/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "not-started"
    }
  ];

  // סינון משימות לפי סטטוס וחיפוש
  const filteredAssignments = assignments.filter(assignment => {
    // סינון לפי סטטוס
    if (statusFilter !== "all" && assignment.status !== statusFilter) {
      return false;
    }
    
    // סינון לפי חיפוש
    if (searchQuery && !assignment.name.includes(searchQuery) && 
        !assignment.subject.includes(searchQuery)) {
      return false;
    }
    
    return true;
  });

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

  // פונקציה להצגת אייקון לפי סטטוס
  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "not-started":
        return <CircleDashed className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:underline"
          >
            <ArrowRight className="w-4 h-4 ml-1" />
            חזרה לדשבורד
          </button>
        </div>

        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            <h1 className="font-display text-3xl font-semibold tracking-tight">ניהול משימות</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            מעקב אחר משימות ומטלות לתלמידים
          </p>
        </header>

        {/* פקדי סינון וחיפוש */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "all" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"
                }`}
              >
                הכל
              </button>
              <button
                onClick={() => setStatusFilter("in-progress")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "in-progress" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"
                }`}
              >
                בתהליך
              </button>
              <button
                onClick={() => setStatusFilter("completed")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "completed" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"
                }`}
              >
                הושלמו
              </button>
              <button
                onClick={() => setStatusFilter("not-started")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "not-started" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"
                }`}
              >
                טרם התחילו
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש משימות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-md py-2 px-9 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* רשימת משימות */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <h2 className="font-display text-lg font-medium mb-6">רשימת משימות</h2>
          
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              לא נמצאו משימות התואמות את החיפוש
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/assignments/${assignment.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <h3 className="font-medium">{assignment.name}</h3>
                        <div className="flex gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">מקצוע: {assignment.subject}</span>
                          <span className="text-sm text-muted-foreground">תאריך הגשה: {assignment.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}
                    >
                      {getStatusText(assignment.status)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-muted-foreground">הוקצה ל: {assignment.assignedTo.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
