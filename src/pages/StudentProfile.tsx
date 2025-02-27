
import { ArrowRight, BookOpen, CalendarRange, GraduationCap, ListChecks, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Assignment {
  id: number;
  name: string;
  dueDate: string;
  status: "completed" | "in-progress" | "not-started";
  score?: number;
}

interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // כאן בעתיד נוכל לטעון נתונים אמיתיים של תלמיד לפי המזהה
  const student = {
    id: 1,
    name: "דוד כהן",
    grade: "כיתה ג'",
    progress: 75,
    subjects: ["קריאה", "כתיבה", "חשבון"],
    avatar: "/placeholder.svg",
    teacher: "אילנה לוי",
    attendance: "92%",
    lastActive: "היום, 09:45",
  };

  const recentAssignments: Assignment[] = [
    {
      id: 1,
      name: "קריאת סיפור 'המלך והגנן'",
      dueDate: "20/05/2023",
      status: "completed",
      score: 85
    },
    {
      id: 2,
      name: "דף עבודה - חיבור וחיסור",
      dueDate: "22/05/2023",
      status: "completed",
      score: 92
    },
    {
      id: 3,
      name: "כתיבת חיבור קצר",
      dueDate: "25/05/2023",
      status: "in-progress"
    },
    {
      id: 4,
      name: "תרגול קריאה - פרק 5",
      dueDate: "28/05/2023",
      status: "not-started"
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "קריאה מהירה",
      date: "15/05/2023",
      description: "השלים 5 ספרים בחודש",
      icon: <BookOpen className="w-5 h-5 text-primary" />
    },
    {
      id: 2,
      title: "מתמיד",
      date: "10/05/2023",
      description: "הגיע לכל השיעורים בחודש האחרון",
      icon: <CalendarRange className="w-5 h-5 text-primary" />
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

        <header className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-semibold mb-2">{student.name}</h1>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">כיתה:</span>
                  <span className="text-sm font-medium">{student.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">מחנכת:</span>
                  <span className="text-sm font-medium">{student.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">נוכחות:</span>
                  <span className="text-sm font-medium">{student.attendance}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* קטע המשימות האחרונות */}
            <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-medium">משימות אחרונות</h2>
                </div>
                <button 
                  onClick={() => navigate('/assignments')}
                  className="text-sm text-primary hover:underline"
                >
                  כל המשימות
                </button>
              </div>
              
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{assignment.name}</h3>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}
                      >
                        {getStatusText(assignment.status)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">תאריך הגשה: {assignment.dueDate}</span>
                      {assignment.score && <span>ציון: {assignment.score}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* גרף התקדמות - ניתן להוסיף גרף ספציפי לתלמיד בעתיד */}
          </div>

          <div className="space-y-6">
            {/* הישגים */}
            <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-medium">הישגים</h2>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <span className="text-xs text-muted-foreground block mt-1">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* נתונים מהירים */}
            <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
              <h2 className="font-display text-lg font-medium mb-4">נתונים מהירים</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">התקדמות כללית</span>
                  <span className="text-sm font-medium">{student.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">פעילות אחרונה</span>
                    <span className="text-sm">{student.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">משימות פתוחות</span>
                    <span className="text-sm">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">משימות שהושלמו</span>
                    <span className="text-sm">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
