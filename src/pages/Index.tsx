
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentCard } from "@/components/StudentCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { SyncIndicator } from "@/components/SyncIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppVersionIndicator } from "@/components/AppVersionIndicator";
import { QuickHelpButton } from "@/components/QuickHelpButton";
import { Cog, ClipboardList, LayoutDashboard, Search, Plus, X, Gift, Trophy, Crown, Award, Star, Filter, Bell, Zap, BookOpen, GraduationCap, CheckCircle, Calendar, User, ArrowUpRight, UserPlus, Clock, Download, HelpCircle, Settings, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// שימור נתוני סטטיסטיקה שבועית לצורך השוואה
const weeklyStats = {
  previousWeek: {
    totalProgress: 72,
    averageScore: 78,
    completedTasks: 24
  },
  currentWeek: {
    totalProgress: 79,
    averageScore: 83,
    completedTasks: 31
  }
};

const calculateImprovement = (current: number, previous: number) => {
  const diff = current - previous;
  return {
    value: diff,
    percentage: ((diff / previous) * 100).toFixed(1),
    improved: diff > 0
  };
};

// חישוב שיפור שבועי
const progressImprovement = calculateImprovement(
  weeklyStats.currentWeek.totalProgress,
  weeklyStats.previousWeek.totalProgress
);

const scoreImprovement = calculateImprovement(
  weeklyStats.currentWeek.averageScore,
  weeklyStats.previousWeek.averageScore
);

const tasksImprovement = calculateImprovement(
  weeklyStats.currentWeek.completedTasks,
  weeklyStats.previousWeek.completedTasks
);

const students = [
  {
    id: 1,
    name: "דוד כהן",
    grade: "כיתה ג'",
    progress: 75,
    subjects: ["קריאה", "כתיבה", "חשבון"]
  },
  {
    id: 2,
    name: "שרה לוי",
    grade: "כיתה ג'",
    progress: 82,
    subjects: ["קריאה", "מדעים", "כתיבה"]
  },
  {
    id: 3,
    name: "תום אלוני",
    grade: "כיתה ד'",
    progress: 68,
    subjects: ["חשבון", "כתיבה", "אומנות"]
  },
  {
    id: 4,
    name: "מיכל ברק",
    grade: "כיתה ד'",
    progress: 90,
    subjects: ["מדעים", "קריאה", "חשבון"]
  },
  {
    id: 5,
    name: "יוסי אברהם",
    grade: "כיתה ג'",
    progress: 65,
    subjects: ["כתיבה", "אומנות", "מדעים"]
  },
  {
    id: 6,
    name: "נועה גולן",
    grade: "כיתה ד'",
    progress: 78,
    subjects: ["קריאה", "חשבון", "מדעים"]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [showSearch, setShowSearch] = useState(false);
  const [visibleCharts, setVisibleCharts] = useState(false);
  const [showRewardsPreview, setShowRewardsPreview] = useState(false);
  const [spinWheel, setSpinWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [timeFrame, setTimeFrame] = useState<"day" | "week" | "month">("week");
  const [showSettings, setShowSettings] = useState(false);

  // מידע מערכת הפרסים
  const rewardsSystem = {
    points: 320,
    level: 3,
    streakDays: 5,
    nextRewards: [
      {
        id: 1,
        title: "חותמת כוכב זהב",
        points: 350,
        image: "https://via.placeholder.com/100?text=★",
        progress: 320/350 * 100
      },
      {
        id: 2,
        title: "סימניית קריאה",
        points: 400,
        image: "https://via.placeholder.com/100?text=📚",
        progress: 320/400 * 100
      },
      {
        id: 3,
        title: "עיפרון קסמים",
        points: 500,
        image: "https://via.placeholder.com/100?text=✏️",
        progress: 320/500 * 100
      }
    ],
    avatarItems: [
      { id: 1, name: "כובע קוסם", image: "https://via.placeholder.com/60?text=🎩", level: 2 },
      { id: 2, name: "כתר מלכותי", image: "https://via.placeholder.com/60?text=👑", level: 3 },
      { id: 3, name: "שרביט קסמים", image: "https://via.placeholder.com/60?text=✨", level: 2 }
    ],
    wheelPrizes: [
      { id: 1, title: "20 נקודות", color: "#22c55e", value: 20 },
      { id: 2, title: "ללא זכייה", color: "#ef4444", value: 0 },
      { id: 3, title: "50 נקודות", color: "#3b82f6", value: 50 },
      { id: 4, title: "10 נקודות", color: "#f59e0b", value: 10 },
      { id: 5, title: "5 נקודות", color: "#8b5cf6", value: 5 },
      { id: 6, title: "100 נקודות!", color: "#db2777", value: 100 },
      { id: 7, title: "ללא זכייה", color: "#ef4444", value: 0 },
      { id: 8, title: "30 נקודות", color: "#14b8a6", value: 30 }
    ]
  };

  // התראות מערכת
  const notifications = [
    { 
      id: 1, 
      title: "משימה חדשה", 
      message: "נוספה משימת חשבון חדשה למיכל ברק", 
      time: "לפני 15 דקות",
      unread: true,
      type: "assignment"
    },
    { 
      id: 2, 
      title: "פרס חדש זמין", 
      message: "שרה לוי השיגה את הנקודות הדרושות לפרס חדש", 
      time: "לפני שעתיים",
      unread: true,
      type: "reward"
    },
    { 
      id: 3, 
      title: "יום הולדת", 
      message: "יום הולדת של דוד כהן מתקרב (15/08)", 
      time: "היום, 09:30",
      unread: false,
      type: "birthday"
    },
    { 
      id: 4, 
      title: "נוכחות", 
      message: "יוסי אברהם לא הגיע לשיעור אתמול", 
      time: "אתמול, 14:20",
      unread: false,
      type: "attendance"
    }
  ];

  // פעילות אחרונה
  const recentActivities = [
    {
      id: 1,
      studentName: "מיכל ברק",
      studentId: 4,
      activity: "סיימה מבחן חשבון",
      time: "לפני 30 דקות",
      score: 94
    },
    {
      id: 2,
      studentName: "דוד כהן",
      studentId: 1,
      activity: "השלים משימת קריאה",
      time: "לפני שעה",
      score: 85
    },
    {
      id: 3,
      studentName: "שרה לוי",
      studentId: 2,
      activity: "קיבלה פרס חדש",
      time: "לפני 3 שעות",
      rewardName: "חותמת כוכב זהב"
    }
  ];

  // מטלות קרובות
  const upcomingTasks = [
    {
      id: 1,
      title: "מבחן חשבון - כיתה ג'",
      date: "17/10/2023",
      daysLeft: 2
    },
    {
      id: 2,
      title: "הגשת פרוייקט מדעים",
      date: "20/10/2023",
      daysLeft: 5
    },
    {
      id: 3,
      title: "יום הורים",
      date: "25/10/2023",
      daysLeft: 10
    }
  ];

  // טיפים מקצועיים - חדש
  const teachingTips = [
    {
      id: 1,
      title: "שיפור מיומנויות קריאה",
      description: "תלמידי כיתה ג' מראים קושי בהבנת הנקרא. שקול להשתמש בפעילויות אינטראקטיביות.",
      category: "קריאה",
      relevance: 92
    },
    {
      id: 2,
      title: "טכניקות ריכוז",
      description: "יוסי אברהם מתקשה בריכוז לאורך זמן. טכניקת 'פומודורו' יכולה לעזור.",
      category: "התנהגות",
      relevance: 85
    },
    {
      id: 3,
      title: "חיזוק מיומנויות חשבון",
      description: "תלמידי כיתה ד' זקוקים לתרגול נוסף בשברים. הוספנו משחק דיגיטלי חדש.",
      category: "חשבון",
      relevance: 78
    }
  ];

  // חישוב סטטיסטיקות
  const totalStudents = students.length;
  const averageProgress = Math.round(students.reduce((sum, student) => sum + student.progress, 0) / totalStudents);
  const subjectsCount = [...new Set(students.flatMap(student => student.subjects))].length;

  // הוספת טוסט ברוכים הבאים בטעינת הדף
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome") === "true";
    
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "ברוך הבא למערכת המעקב והתגמולים",
          description: "כל הנתונים מסונכרנים ומעודכנים לרגע זה",
        });
        sessionStorage.setItem("hasSeenWelcome", "true");
      }, 1000);
    }
  }, []);

  useEffect(() => {
    // Apply filters on students
    let result = [...students];
    
    if (searchQuery) {
      result = result.filter(student => 
        student.name.includes(searchQuery) || 
        student.subjects.some(subject => subject.includes(searchQuery))
      );
    }
    
    if (filterGrade) {
      result = result.filter(student => student.grade === filterGrade);
    }
    
    setFilteredStudents(result);
  }, [searchQuery, filterGrade]);

  // Animation effect when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCharts(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterGrade("");
  };

  // פונקציה לסובב את גלגל המזל
  const spinLuckyWheel = () => {
    if (spinWheel) return;
    
    setSpinWheel(true);
    setWheelResult(null);
    
    // מגריל תוצאה אקראית אחרי 3 שניות
    setTimeout(() => {
      const randomPrize = Math.floor(Math.random() * rewardsSystem.wheelPrizes.length);
      setWheelResult(randomPrize);
      
      const prizeValue = rewardsSystem.wheelPrizes[randomPrize].value;
      
      // מציג התראה על תוצאת הגלגל
      if (prizeValue > 0) {
        toast({
          title: `זכית ב-${prizeValue} נקודות!`,
          description: "הנקודות נוספו לחשבונך",
          variant: "default",
        });
      } else {
        toast({
          title: "אין זכייה הפעם",
          description: "נסה שוב בשבוע הבא",
          variant: "default",
        });
      }
      
      // מאפס את הגלגל אחרי 5 שניות
      setTimeout(() => {
        setSpinWheel(false);
      }, 5000);
    }, 3000);
  };

  // פונקציה להצגת צבע רקע התראה לפי סוג
  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "assignment": return "bg-blue-50";
      case "reward": return "bg-yellow-50";
      case "birthday": return "bg-purple-50";
      case "attendance": return "bg-red-50";
      default: return "bg-gray-50";
    }
  };

  // פונקציה להצגת אייקון התראה לפי סוג
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment": return <ClipboardList className="w-4 h-4 text-blue-600" />;
      case "reward": return <Gift className="w-4 h-4 text-yellow-600" />;
      case "birthday": return <Calendar className="w-4 h-4 text-purple-600" />;
      case "attendance": return <User className="w-4 h-4 text-red-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  // פונקציה לטיפול באירוע הוספת תלמיד
  const handleAddStudent = () => {
    navigate('/add-student');
    toast({
      title: "עובר לטופס הוספת תלמיד חדש",
      description: "הפרטים יסונכרנו אוטומטית עם המערכת"
    });
  };

  // פונקציה להורדת דו"ח
  const handleDownloadReport = () => {
    toast({
      title: "מכין דו״ח למורה",
      description: "הדו״ח יהיה מוכן להורדה בעוד רגע"
    });
    
    setTimeout(() => {
      toast({
        title: "הדו״ח מוכן להורדה",
        description: "לחץ כאן להורדת קובץ הדו״ח",
        action: (
          <button 
            className="bg-primary text-white px-3 py-1 rounded-md text-xs flex items-center gap-1"
            onClick={() => {
              toast({
                title: "הדו״ח הורד בהצלחה",
                description: "הקובץ נשמר במחשבך"
              });
            }}
          >
            <Download className="w-3 h-3" />
            הורד
          </button>
        ),
      });
    }, 2000);
  };

  // פונקציה לסימון כל ההתראות כנקראו
  const markAllNotificationsAsRead = () => {
    toast({
      title: "כל ההתראות סומנו כנקראו",
      description: "ניתן לצפות בהיסטוריית התראות בעמוד ההתראות"
    });
    setShowNotifications(false);
  };

  const uniqueGrades = [...new Set(students.map(student => student.grade))];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-up">
        <header className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                  מעקב התקדמות תלמידים
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                ניטור וניתוח ביצועי תלמידים בזמן אמת
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {showSearch ? (
                <div className="relative flex items-center animate-fade-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חיפוש תלמידים..."
                    className="px-4 py-2 pr-10 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-primary/30 w-full md:w-auto"
                    autoFocus
                  />
                  <X 
                    className="w-5 h-5 absolute left-2 text-gray-500 cursor-pointer hover:text-gray-700" 
                    onClick={handleSearchToggle} 
                  />
                </div>
              ) : (
                <button
                  onClick={handleSearchToggle}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-accent transition-colors shadow-sm"
                >
                  <Search className="w-5 h-5" />
                  חיפוש
                </button>
              )}
              
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-accent transition-colors shadow-sm relative"
                >
                  <Bell className="w-5 h-5" />
                  התראות
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden animate-fade-up">
                    <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                      <h3 className="font-medium">התראות</h3>
                      <button 
                        className="text-xs text-primary hover:underline"
                        onClick={markAllNotificationsAsRead}
                      >
                        סמן הכל כנקרא
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex gap-3 items-start">
                            <div className={`${getNotificationBgColor(notification.type)} p-2 rounded-full`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                {notification.unread && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <span className="text-xs text-gray-500 block mt-1">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 bg-gray-50 border-t text-center">
                      <button className="text-sm text-primary hover:underline">צפייה בכל ההתראות</button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => navigate('/assignments')}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-accent transition-colors shadow-sm"
              >
                <ClipboardList className="w-5 h-5" />
                משימות
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-accent transition-colors shadow-sm"
              >
                <Cog className="w-5 h-5" />
                הגדרות
              </button>
              <button 
                onClick={() => setShowRewardsPreview(!showRewardsPreview)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 text-white transition-colors shadow-sm hover:shadow-md"
              >
                <Gift className="w-5 h-5" />
                פרסים
              </button>
            </div>
          </div>
          
          {/* סרגל סטטוס מערכת */}
          <div className="flex flex-wrap justify-between items-center gap-3 mt-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <SyncIndicator />
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadReport}
                className="text-sm text-primary flex items-center gap-1 px-3 py-1.5 hover:bg-primary/5 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>דו״ח למורה</span>
              </button>
              <div className="h-4 border-r mx-1"></div>
              <AppVersionIndicator />
            </div>
          </div>
        </header>
        
        {/* חלק עליון - סיכומים, סקירה כללית וסטטיסטיקות */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* כרטיסי סיכום תקופתיים */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-green-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium">התקדמות תלמידים</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-700">{weeklyStats.currentWeek.totalProgress}%</p>
                  <div className="flex items-center mt-1">
                    {progressImprovement.improved ? (
                      <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                        עלייה של {progressImprovement.percentage}%
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                        ירידה של {Math.abs(Number(progressImprovement.percentage))}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <button 
                    onClick={() => setTimeFrame("day")}
                    className={`px-2 py-1 rounded ${timeFrame === "day" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  >
                    יום
                  </button>
                  <button 
                    onClick={() => setTimeFrame("week")}
                    className={`px-2 py-1 rounded ${timeFrame === "week" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  >
                    שבוע
                  </button>
                  <button 
                    onClick={() => setTimeFrame("month")}
                    className={`px-2 py-1 rounded ${timeFrame === "month" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  >
                    חודש
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-blue-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">ממוצע ציונים</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{weeklyStats.currentWeek.averageScore}</p>
                  <div className="flex items-center mt-1">
                    {scoreImprovement.improved ? (
                      <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                        עלייה של {scoreImprovement.percentage}%
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                        ירידה של {Math.abs(Number(scoreImprovement.percentage))}%
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  השבוע הנוכחי
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-purple-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <ClipboardList className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium">משימות שהושלמו</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">{weeklyStats.currentWeek.completedTasks}</p>
                  <div className="flex items-center mt-1">
                    {tasksImprovement.improved ? (
                      <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                        עלייה של {tasksImprovement.value} משימות
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                        ירידה של {Math.abs(tasksImprovement.value)} משימות
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-purple-100 rounded-full p-2">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-700">{totalStudents}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* המידע הסטטיסטי */}
          <div className="lg:col-span-8 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                סקירה כללית
              </h2>
              <div className="flex gap-2">
                <button className="text-xs border rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50">
                  היום
                </button>
                <button className="text-xs border rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50 bg-gray-50">
                  שבוע אחרון
                </button>
                <button className="text-xs border rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50">
                  חודש אחרון
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">סך הכל תלמידים</p>
                    <h3 className="text-2xl font-bold text-blue-700">{totalStudents}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">ממוצע התקדמות</p>
                    <h3 className="text-2xl font-bold text-green-700">{averageProgress}%</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-full">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900">מקצועות נלמדים</p>
                    <h3 className="text-2xl font-bold text-purple-700">{subjectsCount}</h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                פעילות אחרונה
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                          {activity.studentName.substring(0, 1)}
                        </div>
                        <div>
                          <h4 
                            className="font-medium text-sm hover:text-primary cursor-pointer"
                            onClick={() => navigate(`/student/${activity.studentId}`)}
                          >
                            {activity.studentName}
                          </h4>
                          <p className="text-sm text-gray-600">{activity.activity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">{activity.time}</span>
                        {activity.score && (
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                            ציון: {activity.score}
                          </span>
                        )}
                        {activity.rewardName && (
                          <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {activity.rewardName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
                  צפייה בכל הפעילויות
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          
          {/* אזור ימני - מטלות קרובות וסיכום מערכת הפרסים */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-xl font-medium flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-red-500" />
                מטלות קרובות
              </h2>
              
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`border rounded-lg p-3 hover:shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer ${
                      task.daysLeft <= 3 ? 'border-red-200 bg-red-50/50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <span className="text-sm text-gray-600 block mt-1">{task.date}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        task.daysLeft <= 3 
                          ? 'bg-red-100 text-red-800' 
                          : task.daysLeft <= 7 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {task.daysLeft === 0 
                          ? 'היום!' 
                          : task.daysLeft === 1 
                            ? 'מחר'
                            : `עוד ${task.daysLeft} ימים`
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/assignments')}
                className="w-full mt-4 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <ClipboardList className="w-4 h-4" />
                צפייה בכל המטלות
              </button>
            </div>
            
            {/* סיכום מערכת הפרסים */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-xl font-medium flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                מערכת הפרסים
              </h2>
              
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full p-3 relative">
                  <Trophy className="w-6 h-6 text-amber-700" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center rounded-full font-bold">
                    4
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">פרסים ממתינים לחלוקה</h4>
                  <p className="text-sm text-gray-600">יש 4 תלמידים שהשיגו פרסים חדשים</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full p-3">
                  <Crown className="w-6 h-6 text-indigo-700" />
                </div>
                <div>
                  <h4 className="font-medium">רמות אווטר חדשות</h4>
                  <p className="text-sm text-gray-600">2 תלמידים עלו רמה השבוע</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 py-3">
                <div className="bg-gradient-to-br from-green-200 to-teal-300 rounded-full p-3">
                  <Star className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <h4 className="font-medium">תלמידי השבוע</h4>
                  <p className="text-sm text-gray-600">מיכל ברק ושרה לוי</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowRewardsPreview(true)}
                className="w-full mt-4 py-2.5 text-sm bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Gift className="w-4 h-4" />
                ניהול מערכת הפרסים
              </button>
            </div>
            
            {/* חדש: טיפים מקצועיים */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100">
              <h2 className="font-display text-xl font-medium flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                טיפים פדגוגיים
              </h2>
              
              <div className="space-y-3">
                {teachingTips.map((tip) => (
                  <div 
                    key={tip.id} 
                    className="border rounded-lg p-3 hover:border-primary hover:bg-blue-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{tip.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mr-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${tip.relevance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-700 whitespace-nowrap">{tip.relevance}% רלוונטי</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                כל הטיפים הפדגוגיים
              </button>
            </div>
          </div>
        </div>

        {/* אזור מערכת הפרסים והתמריצים */}
        {showRewardsPreview && (
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 shadow-sm animate-fade-up border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-primary flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>מערכת הפרסים והאווטרים</span>
              </h2>
              <button
                onClick={() => setShowRewardsPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* מידע כללי והתקדמות */}
              <div className="md:col-span-3 bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                      <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center relative">
                        <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold">
                          {rewardsSystem.level}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium">הנקודות שלי</h3>
                    <p className="text-2xl font-bold text-primary">{rewardsSystem.points}</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                      <Star className="w-3 h-3 fill-yellow-500" />
                      <span>רצף של {rewardsSystem.streakDays} ימים</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-2 text-center">האווטר שלי</h4>
                    <div className="flex justify-center flex-wrap gap-2">
                      {rewardsSystem.avatarItems.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-white rounded-lg p-1 w-14 h-14 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => navigate('/student/1')}
                        >
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-8 h-8 object-contain"
                          />
                          <div className="text-[10px] mt-1 text-center truncate w-full">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-2">
                      <button
                        onClick={() => navigate('/student/1')}
                        className="text-xs text-primary hover:underline"
                      >
                        ערוך את האווטר שלך
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* הפרסים הבאים */}
              <div className="md:col-span-5 bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  הפרסים הבאים שלך
                </h3>
                
                <div className="space-y-3">
                  {rewardsSystem.nextRewards.map((reward) => (
                    <div key={reward.id} className="border rounded-lg p-3 hover:bg-accent/20 transition-colors cursor-pointer" onClick={() => navigate('/student/1')}>
                      <div className="flex items-center gap-3">
                        <img 
                          src={reward.image} 
                          alt={reward.title}
                          className="w-12 h-12 object-contain opacity-75"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{reward.title}</h4>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {reward.points} נקודות
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="h-1.5 w-full bg-gray-200 rounded-full">
                              <div 
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${reward.progress}%` }}  
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>{rewardsSystem.points} נקודות</span>
                              <span>חסר {reward.points - rewardsSystem.points} נקודות</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/student/1')}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    הצג את כל הפרסים
                  </button>
                </div>
              </div>
              
              {/* גלגל המזל */}
              <div className="md:col-span-4 bg-white rounded-lg p-4 shadow-sm border border-purple-100 flex flex-col items-center">
                <h3 className="font-medium text-center mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  גלגל המזל השבועי
                </h3>
                
                <div className="relative w-48 h-48 my-3">
                  <div 
                    className={`w-full h-full rounded-full overflow-hidden transition-transform duration-3000 ${spinWheel ? 'animate-spin-wheel' : ''}`}
                    style={{ 
                      transformOrigin: 'center',
                      transform: wheelResult !== null ? `rotate(${wheelResult * 45 + 1080}deg)` : 'rotate(0deg)'
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {rewardsSystem.wheelPrizes.map((prize, index) => {
                        const angle = 360 / rewardsSystem.wheelPrizes.length;
                        const rotation = index * angle;
                        
                        return (
                          <g key={prize.id} transform={`rotate(${rotation} 50 50)`}>
                            <path 
                              d={`M 50 50 L 50 0 A 50 50 0 0 1 ${50 + 50 * Math.sin(angle * Math.PI / 180)} ${50 - 50 * Math.cos(angle * Math.PI / 180)} Z`}
                              fill={prize.color}
                            />
                            <text
                              x="50"
                              y="20"
                              fontSize="4"
                              fill="white"
                              fontWeight="bold"
                              textAnchor="middle"
                              transform={`rotate(${-rotation + angle/2} 50 50)`}
                            >
                              {prize.title}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  
                  {/* המחוג */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-8 z-10">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-red-600"></div>
                  </div>
                  
                  {/* תוצאת ההגרלה */}
                  {wheelResult !== null && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 text-center font-bold">
                        <p style={{ color: rewardsSystem.wheelPrizes[wheelResult].color }}>{rewardsSystem.wheelPrizes[wheelResult].title}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={spinLuckyWheel}
                  disabled={spinWheel}
                  className={`mt-4 px-6 py-2 rounded-full font-medium text-white transition-colors ${
                    spinWheel 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {spinWheel ? 'מסתובב...' : 'סובב את הגלגל'}
                </button>
                
                <p className="text-xs text-center text-muted-foreground mt-2">
                  זמין פעם בשבוע | הסיבוב הבא: בעוד 5 ימים
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/student/1')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span>עבור למערכת הפרסים המלאה</span>
              </button>
            </div>
          </div>
        )}

        {/* פילטרים וחיפוש תלמידים */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <h2 className="font-display text-xl font-medium flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              תלמידים
            </h2>
            
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm text-muted-foreground font-medium">סינון לפי כיתה:</div>
              <div className="flex gap-2 flex-wrap">
                {uniqueGrades.map(grade => (
                  <button
                    key={grade}
                    onClick={() => setFilterGrade(filterGrade === grade ? "" : grade)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      filterGrade === grade 
                        ? "bg-primary text-white" 
                        : "bg-accent hover:bg-accent/80"
                    }`}
                  >
                    {grade}
                  </button>
                ))}
                {(filterGrade || searchQuery) && (
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    נקה סינון
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end mb-2">
            <button 
              onClick={handleAddStudent}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm text-primary hover:bg-primary/5 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              הוסף תלמיד חדש
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              סינון מתקדם
            </button>
          </div>
        </div>

        {/* כרטיסי תלמידים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard 
                key={student.id} 
                {...student} 
                onClick={() => navigate(`/student/${student.id}`)}
              />
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="py-8 flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-lg text-muted-foreground">לא נמצאו תלמידים מתאימים לחיפוש</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  הצג את כל התלמידים
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate('/add-student')}
            className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-accent/20 transition-all cursor-pointer h-[260px]"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <span className="text-lg font-medium">הוסף תלמיד חדש</span>
            <p className="text-sm text-gray-500 text-center max-w-[200px]">
              הוסף פרטי תלמיד חדש למערכת המעקב והתגמולים
            </p>
          </button>
        </div>

        {/* Charts section */}
        <div 
          className={`transition-opacity duration-700 ease-in-out ${visibleCharts ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="font-display text-xl font-medium flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              ניתוח ביצועי תלמידים
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 text-lg">התקדמות לפי חודשים</h3>
                <div className="h-[300px]">
                  <PerformanceChart />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-lg">התפלגות מקצועות לימוד</h3>
                <div className="h-[300px] flex items-center justify-center">
                  {/* This is a placeholder for a future subject distribution chart */}
                  <div className="text-center text-muted-foreground">
                    <div className="w-32 h-32 mx-auto rounded-full border-8 border-t-primary border-r-blue-400 border-b-orange-400 border-l-green-400 animate-spin"></div>
                    <p className="mt-4">נתונים מתעדכנים...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* הוספת CSS לאנימציות */}
      <style>
        {`
        @keyframes spin-wheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(1080deg); }
        }
        
        .animate-spin-wheel {
          animation: spin-wheel 3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        `}
      </style>
      
      {/* הוספת כפתור עזרה מהירה */}
      <QuickHelpButton />
    </div>
  );
};

export default Index;
