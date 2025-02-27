
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentCard } from "@/components/StudentCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Cog, ClipboardList, LayoutDashboard, Search, Plus, X, Gift, Trophy, Crown, Award, Star } from "lucide-react";

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

  // Calculate statistics
  const totalStudents = students.length;
  const averageProgress = Math.round(students.reduce((sum, student) => sum + student.progress, 0) / totalStudents);
  const subjectsCount = [...new Set(students.flatMap(student => student.subjects))].length;

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
      
      // מאפס את הגלגל אחרי 5 שניות
      setTimeout(() => {
        setSpinWheel(false);
      }, 5000);
    }, 3000);
  };

  const uniqueGrades = [...new Set(students.map(student => student.grade))];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                מעקב התקדמות תלמידים
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              ניטור וניתוח ביצועי תלמידים בזמן אמת
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {showSearch ? (
              <div className="relative flex items-center animate-fadeIn">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש תלמידים..."
                  className="px-4 py-2 pr-10 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-primary"
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
            <button 
              onClick={() => navigate('/assignments')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-accent transition-colors shadow-sm"
            >
              <ClipboardList className="w-5 h-5" />
              משימות
            </button>
            <button 
              onClick={() => navigate('/settings')}
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
        </header>

        {/* אזור מערכת הפרסים והתמריצים - חדש */}
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

        {/* Filters and stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl p-4 shadow-sm">
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

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-accent rounded-lg">
              <div className="text-xl md:text-2xl font-semibold">{totalStudents}</div>
              <div className="text-xs md:text-sm text-muted-foreground">סך הכל תלמידים</div>
            </div>
            <div className="p-2 bg-accent rounded-lg">
              <div className="text-xl md:text-2xl font-semibold">{averageProgress}%</div>
              <div className="text-xs md:text-sm text-muted-foreground">ממוצע התקדמות</div>
            </div>
            <div className="p-2 bg-accent rounded-lg">
              <div className="text-xl md:text-2xl font-semibold">{subjectsCount}</div>
              <div className="text-xs md:text-sm text-muted-foreground">מקצועות נלמדים</div>
            </div>
          </div>
        </div>

        {/* Students cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              <p className="text-lg text-muted-foreground">לא נמצאו תלמידים מתאימים לחיפוש</p>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                הצג את כל התלמידים
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/add-student')}
            className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-accent/20 transition-all cursor-pointer h-[200px]"
          >
            <Plus className="w-10 h-10 text-gray-400" />
            <span className="text-lg font-medium">הוסף תלמיד חדש</span>
          </button>
        </div>

        {/* Charts section */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-700 ease-in-out ${
            visibleCharts ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <PerformanceChart />
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-display text-lg font-medium mb-4">התפלגות מקצועות לימוד</h3>
            <div className="h-[250px] flex items-center justify-center">
              {/* This is a placeholder for a future subject distribution chart */}
              <div className="text-center text-muted-foreground">
                <div className="w-32 h-32 mx-auto rounded-full border-8 border-t-primary border-r-blue-400 border-b-orange-400 border-l-green-400 animate-spin"></div>
                <p className="mt-4">נתונים מתעדכנים...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* הוספת CSS לאנימציות */}
      <style jsx>{`
        @keyframes spin-wheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(1080deg); }
        }
        
        .animate-spin-wheel {
          animation: spin-wheel 3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Index;
