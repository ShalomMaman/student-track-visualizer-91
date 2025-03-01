<lov-code>
import { ArrowRight, BookOpen, BookText, CalendarRange, ChartBarIcon, MessageCircle, GraduationCap, ListChecks, Trophy, Plus, Award, Gift, Star, Zap, Medal, Crown, Lock, UserRound, Edit, Save, Trash2, AlertTriangle, Check, X, Filter, Info, Clock, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Removed StudentPerformanceChart import since it's no longer needed
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
  location?: string;
  teacherNotes?: string;
  isDelivered?: boolean;
}

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = id ? parseInt(id) : 1;
  const [selectedTab, setSelectedTab] = useState<"profile" | "avatar" | "rewards">("rewards");
  const [activeAvatarCategory, setActiveAvatarCategory] = useState<"all" | "hat" | "outfit" | "accessory">("all");
  const [activeRewardsCategory, setActiveRewardsCategory] = useState<"all" | "real" | "avatar" | "certificate">("all");
  const [isTeacherMode, setIsTeacherMode] = useState(true); // במציאות יבוסס על הרשאות
  const [editingRewardId, setEditingRewardId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showRewardDetails, setShowRewardDetails] = useState<number | null>(null);

  // כאן בעתיד נוכל לטעון נתונים אמיתיים של תלמיד לפי המזהה
  const student = {
    id: studentId,
    name: studentId === 1 ? "דוד כהן" : "שרה לוי",
    grade: "כיתה ג'",
    progress: studentId === 1 ? 75 : 82,
    subjects: ["קריאה", "כתיבה", "חשבון"],
    avatar: "/placeholder.svg",
    teacher: "אילנה לוי",
    attendance: studentId === 1 ? "92%" : "95%",
    lastActive: "היום, 09:45",
    birthDate: studentId === 1 ? "15/08/2015" : "23/03/2015",
    parentName: studentId === 1 ? "יעקב ורבקה כהן" : "דוד ורחל לוי",
    parentContact: studentId === 1 ? "054-1234567" : "052-7654321",
    strengths: studentId === 1 ? 
      ["קריאה מהירה", "עבודה בקבוצות", "כישורים חברתיים"] : 
      ["כישורי מתמטיקה", "משמעת עצמית", "עזרה לחברים"],
    areasForImprovement: studentId === 1 ?
      ["כתיבה", "ריכוז לאורך זמן"] :
      ["קריאה", "הקשבה בכיתה"]
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

  // חדש: נתוני מערכת הפרסים המשופרת עם הערות מורה ומיקום פיזי
  const [rewards, setRewards] = useState<Reward[]>([
    { 
      id: 1, 
      title: "חותמת כוכב זהב", 
      points: 100, 
      image: "https://via.placeholder.com/100?text=★", 
      progress: 100, 
      type: "real", 
      acquired: true,
      location: "מגירת המורה",
      teacherNotes: "לחלק בסוף השיעור ביום ראשון",
      isDelivered: true
    },
    { 
      id: 2, 
      title: "סימניית קריאה", 
      points: 200, 
      image: "https://via.placeholder.com/100?text=📚", 
      progress: 100, 
      type: "real", 
      acquired: true,
      location: "ארון כיתה - מדף עליון",
      teacherNotes: "סימניה בצבע כחול, התלמיד/ה אוהב/ת במיוחד",
      isDelivered: false
    },
    { 
      id: 3, 
      title: "עיפרון קסמים", 
      points: 350, 
      image: "https://via.placeholder.com/100?text=✏️", 
      progress: 90, 
      type: "real",
      location: "ארון ציוד משרדי",
      teacherNotes: ""
    },
    { 
      id: 4, 
      title: "כתר מלכותי לאווטר", 
      points: 300, 
      image: "https://via.placeholder.com/100?text=👑", 
      progress: 80, 
      type: "avatar" 
    },
    { 
      id: 5, 
      title: "תעודת הצטיינות", 
      points: 500, 
      image: "https://via.placeholder.com/100?text=🏆", 
      progress: 60, 
      type: "certificate",
      location: "תיקיית תעודות במחשב",
      teacherNotes: "להדפיס ולחתום לפני חלוקה"
    },
    { 
      id: 6, 
      title: "ספר ילדים", 
      points: 800, 
      image: "https://via.placeholder.com/100?text=📕", 
      progress: 40, 
      type: "real",
      location: "ספריית הכיתה",
      teacherNotes: "לבחור בהתאם לתחומי העניין - אוהב/ת סיפורי הרפתקאות"
    },
    { 
      id: 7, 
      title: "גלימת קוסם לאווטר", 
      points: 1000, 
      image: "https://via.placeholder.com/100?text=🧙", 
      progress: 30, 
      type: "avatar" 
    }
  ]);

  // מידע מערכת הפרסים
  const rewardsSystem = {
    points: 320,
    level: 3,
    streakDays: 5
  };

  // טופס עריכת פרס - ברירת מחדל
  const [editedReward, setEditedReward] = useState<{
    title: string;
    points: number;
    location: string;
    teacherNotes: string;
    isDelivered: boolean;
  }>({
    title: "",
    points: 0,
    location: "",
    teacherNotes: "",
    isDelivered: false
  });

  // עדכון פרטי הפרס לעריכה
  useEffect(() => {
    if (editingRewardId !== null) {
      const reward = rewards.find(r => r.id === editingRewardId);
      if (reward) {
        setEditedReward({
          title: reward.title,
          points: reward.points,
          location: reward.location || "",
          teacherNotes: reward.teacherNotes || "",
          isDelivered: reward.isDelivered || false
        });
      }
    }
  }, [editingRewardId, rewards]);

  // פונקציה לשמירת שינויים בפרס
  const saveRewardChanges = () => {
    setRewards(prev => prev.map(reward => 
      reward.id === editingRewardId 
        ? { 
            ...reward, 
            title: editedReward.title,
            points: editedReward.points,
            location: editedReward.location,
            teacherNotes: editedReward.teacherNotes,
            isDelivered: editedReward.isDelivered
          } 
        : reward
    ));
    
    setEditingRewardId(null);
    setSuccessMessage("פרטי הפרס עודכנו בהצלחה");
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // פונקציה לסימון פרס כנמסר
  const markRewardAsDelivered = (rewardId: number) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId
        ? { ...reward, isDelivered: true }
        : reward
    ));
    
    setSuccessMessage("הפרס סומן כנמסר בהצלחה");
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // פונקציה למחיקת פרס
  const deleteReward = () => {
    if (rewardToDelete === null) return;
    
    setRewards(prev => prev.filter(reward => reward.id !== rewardToDelete));
    setRewardToDelete(null);
    setShowConfirmModal(false);
    
    setSuccessMessage("הפרס נמחק בהצלחה");
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // פונקציה להוספת פרס חדש
  const addNewReward = () => {
    const newId = Math.max(...rewards.map(r => r.id)) + 1;
    const newReward: Reward = {
      id: newId,
      title: "פרס חדש",
      points: 100,
      image: "https://via.placeholder.com/100?text=🎁",
      progress: 0,
      type: "real",
      location: "",
      teacherNotes: ""
    };
    
    setRewards(prev => [...prev, newReward]);
    setEditingRewardId(newId);
    
    setSuccessMessage("פרס חדש נוסף בהצלחה");
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
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

  // פונקציה למיון פרסים לפי קטגוריה
  const filteredRewards = activeRewardsCategory === "all"
    ? rewards
    : rewards.filter(reward => reward.type === activeRewardsCategory);

  // פונקציה לעדכון פריט אווטר נבחר
  const toggleAvatarSelect = (itemId: number) => {
    // כאן בהמשך נעדכן את הבחירה במסד הנתונים
    console.log(`בחרת פריט אווטר מספר ${itemId}`);
  };

  // פונקציה להצגת אייקון לפי סוג הפרס
  const getRewardTypeIcon = (type: Reward["type"]) => {
    switch (type) {
      case "avatar":
        return <Crown className="w-4 h-4" />;
      case "real":
        return <Gift className="w-4 h-4" />;
      case "certificate":
        return <Award className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  // פונקציה להצגת טקסט לפי סוג הפרס
  const getRewardTypeText = (type: Reward["type"]) => {
    switch (type) {
      case "avatar":
        return "פריט אווטר";
      case "real":
        return "פרס פיזי";
      case "certificate":
        return "תעודה";
      default:
        return "";
    }
  };

  // פונקציה להצגת צבע תגית לפי סוג הפרס
  const getRewardTypeColor = (type: Reward["type"]) => {
    switch (type) {
      case "avatar":
        return "bg-purple-100 text-purple-800";
      case "real":
        return "bg-blue-100 text-blue-800";
      case "certificate":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // פונקציה להצגת סטטוס פרס באופן יותר ידידותי
  const getRewardStatus = (reward: Reward) => {
    if (!reward.acquired) {
      return {
        text: "בתהליך השגה",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: <Clock className="w-4 h-4" />
      };
    }
    
    if (reward.type === "real" && !reward.isDelivered) {
      return {
        text: "ממתין למסירה",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        icon: <AlertTriangle className="w-4 h-4" />
      };
    }
    
    return {
      text: "הושג ונמסר",
      color: "text-green-600",
        bgColor: "bg-green-50",
      icon: <Check className="w-4 h-4" />
    };
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

        {/* הודעת הצלחה */}
        {showSuccessMessage && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-900 px-4 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-fade-up">
            <Check className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

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
        
        {/* תצוגת מערכת הפרסים משופרת */}
        {selectedTab === "rewards" && (
          <div className="animate-fade-up">
            {/* כותרת ומידע כללי */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="mb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="font-display text-2xl font-medium flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    מערכת הפרסים של {student.name}
                  </h2>
                  
                  {isTeacherMode && (
                    <div className="flex gap-2">
                      <button 
                        onClick={addNewReward}
                        className="px-3 py-1.5 rounded-md bg-primary text-white text-sm flex items-center gap-1 hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        הוסף פרס
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mt-2">
                  צבירת נקודות מאפשרת לתלמיד לקבל פרסים! השלמת משימות, מבחנים ושיעורי בית מזכים בנקודות.
                </p>
                
                {isTeacherMode && (
                  <div className="mt-3 py-2 px-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>אתה במצב מורה - באפשרותך לערוך פרסים, להוסיף הערות ולסמן פרסים שנמסרו</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* מידע על הנקודות */}
              <div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4 shadow-sm relative animate-pulse-ring">
                        <Star className="w-12 h-12 text-yellow-500 fill-yellow-400" />
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold">
                          {rewardsSystem.level}
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-xl">הנקודות של {student.name}</h3>
                      <p className="text
