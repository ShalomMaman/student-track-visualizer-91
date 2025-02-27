
import { ArrowRight, BookOpen, BookText, CalendarRange, ChartBarIcon, MessageCircle, GraduationCap, ListChecks, Trophy, Plus, Award, Gift, Star, Zap, Medal, Crown, Lock, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

interface AvatarItem {
  id: number;
  name: string;
  type: "hat" | "outfit" | "accessory";
  image: string;
  level: number;
  isSelected: boolean;
  locked?: boolean;
}

interface Reward {
  id: number;
  title: string;
  points: number;
  image: string;
  progress: number;
  type: "avatar" | "real" | "certificate";
  acquired?: boolean;
}

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = id ? parseInt(id) : 1;
  const [selectedTab, setSelectedTab] = useState<"profile" | "avatar" | "rewards">("profile");
  const [activeAvatarCategory, setActiveAvatarCategory] = useState<"all" | "hat" | "outfit" | "accessory">("all");

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

  // נתוני מערכת האווטרים
  const avatarItems: AvatarItem[] = [
    { id: 1, name: "כובע קוסם", type: "hat", image: "https://via.placeholder.com/100?text=🎩", level: 1, isSelected: true },
    { id: 2, name: "כתר מלכותי", type: "hat", image: "https://via.placeholder.com/100?text=👑", level: 2, isSelected: false },
    { id: 3, name: "ברט אדום", type: "hat", image: "https://via.placeholder.com/100?text=🧢", level: 1, isSelected: false },
    { id: 4, name: "חליפת תלמיד", type: "outfit", image: "https://via.placeholder.com/100?text=👕", level: 1, isSelected: true },
    { id: 5, name: "גלימת קוסם", type: "outfit", image: "https://via.placeholder.com/100?text=🧙", level: 3, isSelected: false, locked: true },
    { id: 6, name: "בגדי ספורט", type: "outfit", image: "https://via.placeholder.com/100?text=🏃", level: 2, isSelected: false },
    { id: 7, name: "משקפיים", type: "accessory", image: "https://via.placeholder.com/100?text=👓", level: 1, isSelected: true },
    { id: 8, name: "שרביט קסמים", type: "accessory", image: "https://via.placeholder.com/100?text=✨", level: 2, isSelected: false },
    { id: 9, name: "תיק גב", type: "accessory", image: "https://via.placeholder.com/100?text=🎒", level: 1, isSelected: false }
  ];

  // נתוני מערכת הפרסים
  const rewards: Reward[] = [
    { id: 1, title: "חותמת כוכב זהב", points: 100, image: "https://via.placeholder.com/100?text=★", progress: 100, type: "real", acquired: true },
    { id: 2, title: "סימניית קריאה", points: 200, image: "https://via.placeholder.com/100?text=📚", progress: 100, type: "real", acquired: true },
    { id: 3, title: "עיפרון קסמים", points: 350, image: "https://via.placeholder.com/100?text=✏️", progress: 90, type: "real" },
    { id: 4, title: "כתר מלכותי לאווטר", points: 300, image: "https://via.placeholder.com/100?text=👑", progress: 80, type: "avatar" },
    { id: 5, title: "תעודת הצטיינות", points: 500, image: "https://via.placeholder.com/100?text=🏆", progress: 60, type: "certificate" },
    { id: 6, title: "ספר ילדים", points: 800, image: "https://via.placeholder.com/100?text=📕", progress: 40, type: "real" },
    { id: 7, title: "גלימת קוסם לאווטר", points: 1000, image: "https://via.placeholder.com/100?text=🧙", progress: 30, type: "avatar" }
  ];

  // מידע מערכת הפרסים
  const rewardsSystem = {
    points: 320,
    level: 3,
    streakDays: 5
  };

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

  // פונקציה למיון פריטי אווטר לפי קטגוריה
  const filteredAvatarItems = activeAvatarCategory === "all" 
    ? avatarItems 
    : avatarItems.filter(item => item.type === activeAvatarCategory);

  // פונקציה לעדכון פריט אווטר נבחר
  const toggleAvatarSelect = (itemId: number) => {
    // כאן בהמשך נעדכן את הבחירה במסד הנתונים
    console.log(`בחרת פריט אווטר מספר ${itemId}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
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
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedTab("profile")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedTab === "profile" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
              >
                <UserRound className="w-4 h-4" />
                פרופיל
              </button>
              <button 
                onClick={() => setSelectedTab("avatar")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedTab === "avatar" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
              >
                <Crown className="w-4 h-4" />
                אווטר
              </button>
              <button 
                onClick={() => setSelectedTab("rewards")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedTab === "rewards" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
              >
                <Trophy className="w-4 h-4" />
                פרסים
              </button>
            </div>
          </div>
        </header>

        {/* תצוגת מערכת האווטרים */}
        {selectedTab === "avatar" && (
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                האווטר שלי
              </h2>
              <p className="text-muted-foreground">
                כאן תוכל/י לבחור ולהתאים אישית את האווטר שלך. שים/י לב שחלק מהפריטים יפתחו כשתעלה/י ברמות או תצבור/י נקודות.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* תצוגת האווטר הנוכחי */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-xl p-6 max-w-xs w-full">
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 mb-4">
                      {/* בסיס האווטר */}
                      <div className="bg-white rounded-full w-32 h-32 absolute top-4 left-4 flex items-center justify-center shadow-md">
                        <UserRound className="w-20 h-20 text-gray-400" />
                      </div>
                      
                      {/* פריטי האווטר הנבחרים */}
                      {avatarItems.filter(item => item.isSelected && item.type === "hat").map(hat => (
                        <div key={hat.id} className="absolute top-0 left-10 w-20 h-20">
                          <img src={hat.image} alt={hat.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                      
                      {avatarItems.filter(item => item.isSelected && item.type === "accessory").map(accessory => (
                        <div key={accessory.id} className="absolute top-10 right-2 w-14 h-14">
                          <img src={accessory.image} alt={accessory.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                      
                      {avatarItems.filter(item => item.isSelected && item.type === "outfit").map(outfit => (
                        <div key={outfit.id} className="absolute bottom-0 left-10 w-20 h-20">
                          <img src={outfit.image} alt={outfit.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-medium">{student.name}</h3>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">רמה {rewardsSystem.level}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{rewardsSystem.points} נקודות</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* בחירת פריטי אווטר */}
              <div className="lg:col-span-8">
                <div className="bg-white border rounded-lg p-2 mb-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveAvatarCategory("all")}
                      className={`flex-1 px-3 py-2 rounded-md text-sm ${activeAvatarCategory === "all" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
                    >
                      הכל
                    </button>
                    <button 
                      onClick={() => setActiveAvatarCategory("hat")}
                      className={`flex-1 px-3 py-2 rounded-md text-sm ${activeAvatarCategory === "hat" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
                    >
                      כובעים
                    </button>
                    <button 
                      onClick={() => setActiveAvatarCategory("outfit")}
                      className={`flex-1 px-3 py-2 rounded-md text-sm ${activeAvatarCategory === "outfit" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
                    >
                      בגדים
                    </button>
                    <button 
                      onClick={() => setActiveAvatarCategory("accessory")}
                      className={`flex-1 px-3 py-2 rounded-md text-sm ${activeAvatarCategory === "accessory" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80"}`}
                    >
                      אביזרים
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredAvatarItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`relative border rounded-lg p-4 flex flex-col items-center hover:border-primary transition-colors ${item.isSelected ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => !item.locked && toggleAvatarSelect(item.id)}
                    >
                      {item.locked ? (
                        <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
                          <Lock className="w-6 h-6 text-gray-400" />
                          <p className="text-xs text-gray-500 mt-1">נפתח ברמה {item.level}</p>
                        </div>
                      ) : (
                        <>
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mb-2" />
                          <p className="text-sm text-center">{item.name}</p>
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 mt-1">רמה {item.level}</span>
                          {item.isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* תצוגת מערכת הפרסים */}
        {selectedTab === "rewards" && (
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-medium mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                מערכת הפרסים
              </h2>
              <p className="text-muted-foreground">
                צבירת נקודות מאפשרת לך לקבל פרסים! השלם משימות, ענה על שאלות נכון וצבור נקודות.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* מידע על הנקודות */}
              <div className="lg:col-span-4">
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 h-full">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                      <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center relative">
                        <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold">
                          {rewardsSystem.level}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg">הנקודות שלי</h3>
                    <p className="text-3xl font-bold text-primary">{rewardsSystem.points}</p>
                    
                    <div className="w-full mt-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>רמה {rewardsSystem.level}</span>
                        <span>רמה {rewardsSystem.level + 1}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        עוד 180 נקודות לרמה הבאה
                      </p>
                    </div>
                    
                    <div className="w-full mt-6 p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">רצף למידה</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                          <div 
                            key={day}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              index < rewardsSystem.streakDays 
                                ? "bg-primary text-white" 
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        רצף של {rewardsSystem.streakDays} ימים
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* רשימת הפרסים */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rewards.map(reward => (
                    <div key={reward.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative min-w-16 min-h-16 flex items-center justify-center">
                          <img 
                            src={reward.image} 
                            alt={reward.title}
                            className={`w-16 h-16 object-contain ${reward.acquired ? "" : "opacity-75"}`}
                          />
                          {reward.acquired && (
                            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                              <div className="w-3 h-3 text-white">✓</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{reward.title}</h4>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {reward.points} נקודות
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-xs text-muted-foreground">
                                {reward.type === "avatar" && "פריט אווטר"}
                                {reward.type === "real" && "פרס ממשי"}
                                {reward.type === "certificate" && "תעודה"}
                              </span>
                              {reward.acquired && (
                                <span className="text-xs text-green-600">• הושג</span>
                              )}
                            </div>
                            
                            <div className="h-1.5 w-full bg-gray-200 rounded-full">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  reward.acquired 
                                    ? "bg-green-500" 
                                    : "bg-primary"
                                }`}
                                style={{ width: `${reward.progress}%` }}  
                              ></div>
                            </div>
                            
                            {!reward.acquired && (
                              <div className="flex justify-between text-xs mt-1">
                                <span>{Math.round(reward.progress / 100 * reward.points)} נקודות</span>
                                <span>חסר {reward.points - Math.round(reward.progress / 100 * reward.points)} נקודות</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "profile" && (
          <>
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
                  <MessageCircle className="w-5 h-5 text-primary" />
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
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
