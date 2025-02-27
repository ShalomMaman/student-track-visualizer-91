
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentCard } from "@/components/StudentCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Cog, ClipboardList, LayoutDashboard, Search, Plus, X } from "lucide-react";

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
          </div>
        </header>

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
    </div>
  );
};

export default Index;
