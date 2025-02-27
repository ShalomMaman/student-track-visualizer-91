
import { ArrowRight, BookOpen, BookText, CalendarRange, ChartBarIcon, ChatBubble, GraduationCap, ListChecks, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentPerformanceChart } from "@/components/StudentPerformanceChart";
import { SkillRadarChart } from "@/components/SkillRadarChart";
import { UpcomingAssignments } from "@/components/UpcomingAssignments";
import { AttendanceCalendar } from "@/components/AttendanceCalendar";

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

interface Note {
  id: number;
  date: string;
  author: string;
  content: string;
}

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = id ? parseInt(id) : 1;

  // כאן בעתיד נוכל לטעון נתונים אמיתיים של תלמיד לפי המזהה
  const student = {
    id: studentId,
    name: "דוד כהן",
    grade: "כיתה ג'",
    progress: 75,
    subjects: ["קריאה", "כתיבה", "חשבון"],
    avatar: "/placeholder.svg",
    teacher: "אילנה לוי",
    attendance: "92%",
    lastActive: "היום, 09:45",
    birthDate: "15/08/2015",
    parentName: "יעקב ורבקה כהן",
    parentContact: "054-1234567",
    strengths: ["קריאה מהירה", "עבודה בקבוצות", "כישורים חברתיים"],
    areasForImprovement: ["כתיבה", "ריכוז לאורך זמן"]
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
    },
    {
      id: 3,
      title: "מצטיין חשבון",
      date: "05/05/2023",
      description: "השיג ציון מושלם במבחן חשבון",
      icon: <ChartBarIcon className="w-5 h-5 text-primary" />
    }
  ];
  
  const teacherNotes: Note[] = [
    {
      id: 1,
      date: "22/05/2023",
      author: "אילנה לוי",
      content: "דוד הראה שיפור משמעותי ביכולת הקריאה שלו. הוא מתקדם יפה מאוד בהבנת הנקרא."
    },
    {
      id: 2,
      date: "15/05/2023",
      author: "מרים כהן",
      content: "שיחה עם ההורים של דוד. הם מדווחים על תרגול יומי בבית והתקדמות בביטחון העצמי."
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
            onClick={() => navigate('/')}
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

        {/* חלק עליון - נתונים בסיסיים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* פרטים אישיים */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <h2 className="font-display text-lg font-medium mb-4">פרטים אישיים</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">תאריך לידה</span>
                <span className="text-sm">{student.birthDate}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-sm text-muted-foreground">שם הורים</span>
                <span className="text-sm">{student.parentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">טלפון הורים</span>
                <span className="text-sm">{student.parentContact}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-sm text-muted-foreground">פעילות אחרונה</span>
                <span className="text-sm">{student.lastActive}</span>
              </div>
            </div>
          </div>
          
          {/* חוזקות */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <h2 className="font-display text-lg font-medium mb-4">חוזקות</h2>
            <div className="space-y-2">
              {student.strengths.map((strength, index) => (
                <div key={index} className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* תחומים לשיפור */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <h2 className="font-display text-lg font-medium mb-4">תחומים לשיפור</h2>
            <div className="space-y-2">
              {student.areasForImprovement.map((area, index) => (
                <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* גרפים */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudentPerformanceChart studentId={studentId} />
          <SkillRadarChart studentId={studentId} />
        </div>

        {/* החלק התחתון - משימות, הישגים והערות */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          {/* משימות אחרונות שהושלמו */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <ListChecks className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-medium">משימות שהושלמו</h2>
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
          
          {/* הערות מורים */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <ChatBubble className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-medium">הערות מורים</h2>
            </div>
            
            <div className="space-y-4">
              {teacherNotes.map((note) => (
                <div key={note.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">{note.author}</h3>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))}
              
              <button className="w-full mt-2 py-2 border border-dashed rounded-md text-sm text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1">
                <span>הוסף הערה</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* נתונים נוספים */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingAssignments studentId={studentId} />
          <AttendanceCalendar studentId={studentId} month="מאי 2023" />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
