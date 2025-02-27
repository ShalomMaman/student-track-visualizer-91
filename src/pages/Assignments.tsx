
import { useState, useEffect } from "react";
import { 
  AlertCircle,
  ArrowRight, 
  Calendar,
  CheckCircle, 
  CircleDashed, 
  ClipboardCheck, 
  Clock, 
  Download,
  Filter, 
  MoreHorizontal,
  Pencil,
  Plus, 
  Search, 
  SortAsc,
  Tag, 
  Trash,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// סטטוס משימות
type AssignmentStatus = "all" | "completed" | "in-progress" | "not-started";

// סוג קדימות
type Priority = "high" | "medium" | "low";

// סוג משימה
interface Assignment {
  id: number;
  name: string;
  subject: string;
  dueDate: string;
  assignedTo: string[];
  status: "completed" | "in-progress" | "not-started";
  description?: string;
  priority?: Priority;
  completionPercentage?: number;
  attachments?: string[];
}

// סוג מיון
type SortType = "dueDate" | "name" | "status" | "priority";

const Assignments = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [sortBy, setSortBy] = useState<SortType>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"cards" | "table" | "kanban">("cards");
  const [isEditMode, setIsEditMode] = useState(false);
  
  // ערכים למשימה חדשה
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    name: "",
    subject: "קריאה",
    dueDate: "",
    assignedTo: [],
    status: "not-started",
    description: "",
    priority: "medium",
    completionPercentage: 0,
    attachments: []
  });
  
  // רשימת הנושאים הזמינים
  const subjects = ["קריאה", "חשבון", "כתיבה", "מדעים", "אומנות"];

  // נתוני דוגמה למשימות
  const assignments: Assignment[] = [
    {
      id: 1,
      name: "קריאת הסיפור 'הברווזון המכוער'",
      subject: "קריאה",
      dueDate: "15/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "completed",
      description: "קריאת הסיפור במלואו והבנת המסר העיקרי. יש לענות על שאלות בדף העבודה.",
      priority: "medium",
      completionPercentage: 100,
      attachments: ["ברווזון_מכוער.pdf", "שאלות_לדיון.docx"]
    },
    {
      id: 2,
      name: "דף עבודה - חיבור וחיסור עד 100",
      subject: "חשבון",
      dueDate: "18/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי"],
      status: "completed",
      description: "השלמת כל התרגילים בדף העבודה. יש לנמק את הפתרונות.",
      priority: "high",
      completionPercentage: 100,
      attachments: ["דף_עבודה_חשבון.pdf"]
    },
    {
      id: 3,
      name: "כתיבת חיבור קצר על משפחה",
      subject: "כתיבה",
      dueDate: "22/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "in-progress",
      description: "כתיבת חיבור באורך של 200-300 מילים על המשפחה. יש להתייחס לתפקידים במשפחה.",
      priority: "medium",
      completionPercentage: 60,
      attachments: ["הנחיות_כתיבה.pdf"]
    },
    {
      id: 4,
      name: "תרגילי חיבור וחיסור עם שברים",
      subject: "חשבון",
      dueDate: "25/05/2023",
      assignedTo: ["תום אלוני"],
      status: "in-progress",
      description: "פתירת תרגילי שברים בספר בעמודים 45-48.",
      priority: "low",
      completionPercentage: 30
    },
    {
      id: 5,
      name: "קריאת פרק 3 בספר 'הרפתקאות בגן החיות'",
      subject: "קריאה",
      dueDate: "28/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "not-started",
      description: "קריאת הפרק וסיכום קצר של האירועים המרכזיים.",
      priority: "high",
      completionPercentage: 0,
      attachments: ["ספר_דיגיטלי.pdf"]
    }
  ];

  // מיון משימות
  const sortAssignments = (assignments: Assignment[]) => {
    return [...assignments].sort((a, b) => {
      if (sortBy === "dueDate") {
        // מיון לפי תאריך
        const dateA = a.dueDate.split("/").reverse().join("");
        const dateB = b.dueDate.split("/").reverse().join("");
        return sortDirection === "asc" 
          ? dateA.localeCompare(dateB) 
          : dateB.localeCompare(dateA);
      } else if (sortBy === "name") {
        // מיון לפי שם
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === "status") {
        // מיון לפי סטטוס - לפי סדר: טרם התחיל, בתהליך, הושלם
        const statusOrder = {
          "not-started": 1,
          "in-progress": 2,
          "completed": 3
        };
        const orderA = statusOrder[a.status];
        const orderB = statusOrder[b.status];
        return sortDirection === "asc" 
          ? orderA - orderB 
          : orderB - orderA;
      } else if (sortBy === "priority") {
        // מיון לפי עדיפות
        const priorityOrder = {
          "high": 1,
          "medium": 2,
          "low": 3
        };
        const orderA = priorityOrder[a.priority || "medium"];
        const orderB = priorityOrder[b.priority || "medium"];
        return sortDirection === "asc" 
          ? orderA - orderB 
          : orderB - orderA;
      }
      return 0;
    });
  };

  // סינון משימות לפי סטטוס, נושא, עדיפות וחיפוש
  const filteredAssignments = assignments.filter(assignment => {
    // סינון לפי סטטוס
    if (statusFilter !== "all" && assignment.status !== statusFilter) {
      return false;
    }
    
    // סינון לפי נושא
    if (subjectFilter !== "all" && assignment.subject !== subjectFilter) {
      return false;
    }
    
    // סינון לפי עדיפות
    if (priorityFilter !== "all" && assignment.priority !== priorityFilter) {
      return false;
    }
    
    // סינון לפי חיפוש
    if (searchQuery && !assignment.name.includes(searchQuery) && 
        !assignment.subject.includes(searchQuery) && 
        !assignment.description?.includes(searchQuery)) {
      return false;
    }
    
    return true;
  });

  // מיון אחרי סינון
  const sortedAndFilteredAssignments = sortAssignments(filteredAssignments);

  // חלוקה לפי סטטוס לתצוגת קנבן
  const kanbanGroups = {
    "not-started": sortedAndFilteredAssignments.filter(a => a.status === "not-started"),
    "in-progress": sortedAndFilteredAssignments.filter(a => a.status === "in-progress"),
    "completed": sortedAndFilteredAssignments.filter(a => a.status === "completed")
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

  // פונקציה להצגת צבע רקע לסטטוס
  const getStatusBgColor = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50";
      case "in-progress":
        return "bg-blue-50";
      case "not-started":
        return "bg-gray-50";
      default:
        return "";
    }
  };

  // פונקציה להצגת צבע לפי עדיפות
  const getPriorityColor = (priority?: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
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

  // פונקציה להצגת טקסט עדיפות בעברית
  const getPriorityText = (priority?: Priority) => {
    switch (priority) {
      case "high":
        return "גבוהה";
      case "medium":
        return "בינונית";
      case "low":
        return "נמוכה";
      default:
        return "בינונית";
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

  // פונקציה להצגת אייקון לפי עדיפות
  const getPriorityIcon = (priority?: Priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "low":
        return <AlertCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  // פונקציה לאיפוס הטופס של משימה חדשה
  const resetNewAssignmentForm = () => {
    setNewAssignment({
      name: "",
      subject: "קריאה",
      dueDate: "",
      assignedTo: [],
      status: "not-started",
      description: "",
      priority: "medium",
      completionPercentage: 0,
      attachments: []
    });
  };
  
  // פונקציה להוספת משימה חדשה (לצורך ההדגמה)
  const handleAddAssignment = () => {
    console.log("הוספת משימה חדשה:", newAssignment);
    // בהמשך כאן יהיה קוד להוספת המשימה לשרת
    setShowAddModal(false);
    resetNewAssignmentForm();
    // הודעת טוסט - ניתן להוסיף כאן
    alert("המשימה נוספה בהצלחה!");
  };
  
  // פונקציה לטיפול בפתיחת פרטי משימה
  const handleOpenDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
    setIsEditMode(false);
  };

  // פונקציה לטיפול בעריכת משימה
  const handleEditAssignment = () => {
    if (!selectedAssignment) return;
    setIsEditMode(true);
    setNewAssignment({ ...selectedAssignment });
  };

  // פונקציה לשמירת השינויים בעריכת משימה
  const handleSaveEdit = () => {
    console.log("עדכון משימה:", newAssignment);
    // בהמשך כאן יהיה קוד לעדכון המשימה בשרת
    setShowDetailsModal(false);
    setIsEditMode(false);
    // הודעת טוסט - ניתן להוסיף כאן
    alert("המשימה עודכנה בהצלחה!");
  };

  // פונקציה לטיפול במחיקת משימה
  const handleDeleteAssignment = () => {
    if (!selectedAssignment) return;
    setShowConfirmDeleteModal(true);
  };

  // פונקציה לאישור מחיקת משימה
  const confirmDeleteAssignment = () => {
    console.log("מחיקת משימה:", selectedAssignment?.id);
    // בהמשך כאן יהיה קוד למחיקת המשימה בשרת
    setShowConfirmDeleteModal(false);
    setShowDetailsModal(false);
    // הודעת טוסט - ניתן להוסיף כאן
    alert("המשימה נמחקה בהצלחה!");
  };

  // פונקציה לטיפול במיון
  const handleSort = (type: SortType) => {
    if (sortBy === type) {
      // אם לוחצים על אותו סוג מיון, משנים את כיוון המיון
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // אם לוחצים על סוג מיון אחר, משנים את סוג המיון ומאפסים את כיוון המיון
      setSortBy(type);
      setSortDirection("asc");
    }
  };

  // פונקציה להצגת פורמט תאריך
  const formatDate = (dateString: string) => {
    return dateString; // בהמשך ניתן להוסיף פורמט משופר
  };

  // פונקציה ליצוא כקובץ CSV
  const exportToCSV = () => {
    const headers = "מזהה,שם משימה,נושא,תאריך,סטטוס,תלמידים,קדימות\n";
    const csvContent = sortedAndFilteredAssignments.map(a => {
      return `${a.id},"${a.name}",${a.subject},${a.dueDate},${getStatusText(a.status)},"${a.assignedTo.join(', ')}",${getPriorityText(a.priority)}`
    }).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `משימות_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // הודעת טוסט - ניתן להוסיף כאן
    alert("הקובץ יוצא בהצלחה!");
  };

  // פונקציה לחישוב התפלגות סטטוס
  const calculateStatusDistribution = () => {
    const total = filteredAssignments.length;
    if (total === 0) return { completed: 0, inProgress: 0, notStarted: 0 };
    
    const completed = Math.round(filteredAssignments.filter(a => a.status === "completed").length / total * 100);
    const inProgress = Math.round(filteredAssignments.filter(a => a.status === "in-progress").length / total * 100);
    const notStarted = Math.round(filteredAssignments.filter(a => a.status === "not-started").length / total * 100);
    
    return { completed, inProgress, notStarted };
  };

  const statusDistribution = calculateStatusDistribution();
  
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

        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            <h1 className="font-display text-3xl font-semibold tracking-tight">ניהול משימות</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            מעקב אחר משימות ומטלות לתלמידים
          </p>
        </header>

        {/* סטטיסטיקה ומידע כללי */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up">
          <div className="bg-white rounded-xl p-5 shadow-sm border-r-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">משימות שהושלמו</p>
                <p className="text-3xl font-semibold mt-2">{assignments.filter(a => a.status === "completed").length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 bg-gray-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${statusDistribution.completed}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{statusDistribution.completed}% מסך המשימות</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border-r-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">משימות בתהליך</p>
                <p className="text-3xl font-semibold mt-2">{assignments.filter(a => a.status === "in-progress").length}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 bg-gray-200 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${statusDistribution.inProgress}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{statusDistribution.inProgress}% מסך המשימות</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border-r-4 border-gray-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">משימות שטרם התחילו</p>
                <p className="text-3xl font-semibold mt-2">{assignments.filter(a => a.status === "not-started").length}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                <CircleDashed className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4 bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${statusDistribution.notStarted}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{statusDistribution.notStarted}% מסך המשימות</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border-r-4 border-primary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">סך הכל משימות</p>
                <p className="text-3xl font-semibold mt-2">{assignments.length}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
            <button 
              onClick={exportToCSV}
              className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-md text-xs text-primary transition-colors"
            >
              <Download className="w-3 h-3" />
              יצוא לאקסל
            </button>
          </div>
        </div>

        {/* פקדי סינון וחיפוש */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-wrap">
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
            
            <div className="flex gap-2 flex-wrap">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="חיפוש משימות..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-md py-2 px-9 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div className="relative flex-1 md:flex-none">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="border rounded-md py-2 px-9 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-auto"
                >
                  <option value="all">כל הנושאים</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              
              <div className="relative flex-1 md:flex-none">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border rounded-md py-2 px-9 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-auto"
                >
                  <option value="all">כל העדיפויות</option>
                  <option value="high">עדיפות גבוהה</option>
                  <option value="medium">עדיפות בינונית</option>
                  <option value="low">עדיפות נמוכה</option>
                </select>
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'}`}
                  title="תצוגת כרטיסים"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'}`}
                  title="תצוגת טבלה"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-md ${viewMode === 'kanban' ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'}`}
                  title="תצוגת קנבן"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3z" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  משימה חדשה
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* רשימת משימות */}
        <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-medium">רשימת משימות</h2>
            
            {/* פקדי מיון */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">מיון לפי:</span>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => handleSort("dueDate")}
                  className={`px-3 py-1.5 text-xs font-medium flex items-center ${
                    sortBy === "dueDate" ? "bg-accent/80" : "bg-accent/30"
                  }`}
                >
                  תאריך {sortBy === "dueDate" && (
                    <SortAsc className={`w-3 h-3 mr-1 ${sortDirection === "desc" && "transform rotate-180"}`} />
                  )}
                </button>
                <button
                  onClick={() => handleSort("name")}
                  className={`px-3 py-1.5 text-xs font-medium flex items-center ${
                    sortBy === "name" ? "bg-accent/80" : "bg-accent/30"
                  }`}
                >
                  שם {sortBy === "name" && (
                    <SortAsc className={`w-3 h-3 mr-1 ${sortDirection === "desc" && "transform rotate-180"}`} />
                  )}
                </button>
                <button
                  onClick={() => handleSort("status")}
                  className={`px-3 py-1.5 text-xs font-medium flex items-center ${
                    sortBy === "status" ? "bg-accent/80" : "bg-accent/30"
                  }`}
                >
                  סטטוס {sortBy === "status" && (
                    <SortAsc className={`w-3 h-3 mr-1 ${sortDirection === "desc" && "transform rotate-180"}`} />
                  )}
                </button>
                <button
                  onClick={() => handleSort("priority")}
                  className={`px-3 py-1.5 text-xs font-medium flex items-center ${
                    sortBy === "priority" ? "bg-accent/80" : "bg-accent/30"
                  }`}
                >
                  קדימות {sortBy === "priority" && (
                    <SortAsc className={`w-3 h-3 mr-1 ${sortDirection === "desc" && "transform rotate-180"}`} />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {sortedAndFilteredAssignments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              לא נמצאו משימות התואמות את החיפוש
            </div>
          ) : viewMode === 'cards' ? (
            <div className="space-y-4">
              {sortedAndFilteredAssignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => handleOpenDetails(assignment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <h3 className="font-medium">{assignment.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {assignment.subject}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {assignment.dueDate}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getPriorityColor(assignment.priority)}`}>
                            {getPriorityIcon(assignment.priority)}
                            {getPriorityText(assignment.priority)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}
                    >
                      {getStatusText(assignment.status)}
                    </span>
                  </div>
                  
                  {assignment.completionPercentage !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">התקדמות:</span>
                        <span>{assignment.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${assignment.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">הוקצה ל: {assignment.assignedTo.join(", ")}</span>
                    
                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <span className="text-xs text-primary flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                        {assignment.attachments.length} קבצים
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right w-12">סטטוס</TableHead>
                    <TableHead className="text-right">שם המשימה</TableHead>
                    <TableHead className="text-right">נושא</TableHead>
                    <TableHead className="text-right">תאריך</TableHead>
                    <TableHead className="text-right">קדימות</TableHead>
                    <TableHead className="text-right">התקדמות</TableHead>
                    <TableHead className="text-right">הוקצה ל</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredAssignments.map((assignment) => (
                    <TableRow 
                      key={assignment.id}
                      className={`cursor-pointer ${getStatusBgColor(assignment.status)} hover:shadow-sm transition-shadow`}
                      onClick={() => handleOpenDetails(assignment)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {getStatusIcon(assignment.status)}
                          <span className="sr-only">{getStatusText(assignment.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{assignment.name}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${getPriorityColor(assignment.priority)}`}>
                          {getPriorityIcon(assignment.priority)}
                          {getPriorityText(assignment.priority)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {assignment.completionPercentage !== undefined && (
                          <div className="w-full max-w-[100px]">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${assignment.completionPercentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 text-center">
                              {assignment.completionPercentage}%
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {assignment.assignedTo.map((student, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-accent px-2 py-1 rounded-full"
                            >
                              {student}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <CircleDashed className="w-5 h-5 text-gray-500" />
                    טרם התחילו
                  </h3>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {kanbanGroups["not-started"].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {kanbanGroups["not-started"].map(assignment => (
                    <div 
                      key={assignment.id}
                      className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenDetails(assignment)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{assignment.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(assignment.priority)}`}>
                          {getPriorityText(assignment.priority)}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <Tag className="w-3 h-3" /> {assignment.subject}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {assignment.dueDate}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {assignment.assignedTo.slice(0, 2).map((student, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-accent px-2 py-0.5 rounded-full"
                          >
                            {student}
                          </span>
                        ))}
                        {assignment.assignedTo.length > 2 && (
                          <span className="text-xs bg-accent px-2 py-0.5 rounded-full">
                            +{assignment.assignedTo.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-xl p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    בתהליך
                  </h3>
                  <span className="bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {kanbanGroups["in-progress"].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {kanbanGroups["in-progress"].map(assignment => (
                    <div 
                      key={assignment.id}
                      className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenDetails(assignment)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{assignment.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(assignment.priority)}`}>
                          {getPriorityText(assignment.priority)}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <Tag className="w-3 h-3" /> {assignment.subject}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {assignment.dueDate}
                      </div>
                      
                      {assignment.completionPercentage !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>התקדמות:</span>
                            <span>{assignment.completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${assignment.completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {assignment.assignedTo.slice(0, 2).map((student, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-accent px-2 py-0.5 rounded-full"
                          >
                            {student}
                          </span>
                        ))}
                        {assignment.assignedTo.length > 2 && (
                          <span className="text-xs bg-accent px-2 py-0.5 rounded-full">
                            +{assignment.assignedTo.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-xl p-4 bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    הושלמו
                  </h3>
                  <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full">
                    {kanbanGroups["completed"].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {kanbanGroups["completed"].map(assignment => (
                    <div 
                      key={assignment.id}
                      className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenDetails(assignment)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{assignment.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(assignment.priority)}`}>
                          {getPriorityText(assignment.priority)}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <Tag className="w-3 h-3" /> {assignment.subject}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {assignment.dueDate}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {assignment.assignedTo.slice(0, 2).map((student, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-accent px-2 py-0.5 rounded-full"
                          >
                            {student}
                          </span>
                        ))}
                        {assignment.assignedTo.length > 2 && (
                          <span className="text-xs bg-accent px-2 py-0.5 rounded-full">
                            +{assignment.assignedTo.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* מודאל להוספת משימה חדשה */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium">הוספת משימה חדשה</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-name">
                  שם המשימה <span className="text-red-500">*</span>
                </label>
                <input
                  id="task-name"
                  type="text"
                  value={newAssignment.name}
                  onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
                  className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="הכנס שם משימה"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-subject">
                  נושא <span className="text-red-500">*</span>
                </label>
                <select
                  id="task-subject"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-due-date">
                  תאריך הגשה <span className="text-red-500">*</span>
                </label>
                <input
                  id="task-due-date"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-status">
                  סטטוס <span className="text-red-500">*</span>
                </label>
                <select
                  id="task-status"
                  value={newAssignment.status}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment, 
                    status: e.target.value as Assignment["status"]
                  })}
                  className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="not-started">טרם התחיל</option>
                  <option value="in-progress">בתהליך</option>
                  <option value="completed">הושלם</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-priority">
                  קדימות <span className="text-red-500">*</span>
                </label>
                <select
                  id="task-priority"
                  value={newAssignment.priority}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment, 
                    priority: e.target.value as Priority
                  })}
                  className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="high">גבוהה</option>
                  <option value="medium">בינונית</option>
                  <option value="low">נמוכה</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-progress">
                  התקדמות
                </label>
                <input
                  id="task-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={newAssignment.completionPercentage || 0}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment, 
                    completionPercentage: parseInt(e.target.value)
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>{newAssignment.completionPercentage || 0}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-assigned">
                  הקצה לתלמידים <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <div 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                    onClick={() => setNewAssignment({
                      ...newAssignment,
                      assignedTo: newAssignment.assignedTo?.includes("דוד כהן") 
                        ? newAssignment.assignedTo.filter(s => s !== "דוד כהן")
                        : [...(newAssignment.assignedTo || []), "דוד כהן"]
                    })}
                  >
                    <input 
                      type="checkbox" 
                      checked={newAssignment.assignedTo?.includes("דוד כהן") || false}
                      readOnly
                    />
                    דוד כהן
                  </div>
                  <div 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                    onClick={() => setNewAssignment({
                      ...newAssignment,
                      assignedTo: newAssignment.assignedTo?.includes("שרה לוי") 
                        ? newAssignment.assignedTo.filter(s => s !== "שרה לוי")
                        : [...(newAssignment.assignedTo || []), "שרה לוי"]
                    })}
                  >
                    <input 
                      type="checkbox" 
                      checked={newAssignment.assignedTo?.includes("שרה לוי") || false}
                      readOnly
                    />
                    שרה לוי
                  </div>
                  <div 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                    onClick={() => setNewAssignment({
                      ...newAssignment,
                      assignedTo: newAssignment.assignedTo?.includes("תום אלוני") 
                        ? newAssignment.assignedTo.filter(s => s !== "תום אלוני")
                        : [...(newAssignment.assignedTo || []), "תום אלוני"]
                    })}
                  >
                    <input 
                      type="checkbox" 
                      checked={newAssignment.assignedTo?.includes("תום אלוני") || false}
                      readOnly
                    />
                    תום אלוני
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-desc">
                  תיאור
                </label>
                <textarea
                  id="task-desc"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  className="border rounded-md py-2 px-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="תיאור המשימה ופרטים נוספים"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-muted rounded-md hover:bg-accent transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleAddAssignment}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  disabled={!newAssignment.name || !newAssignment.dueDate || !(newAssignment.assignedTo?.length)}
                >
                  הוסף משימה
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* מודאל לפרטי משימה */}
      {showDetailsModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium">
                {isEditMode ? "עריכת משימה" : "פרטי משימה"}
              </h2>
              <button onClick={() => {
                setShowDetailsModal(false);
                setIsEditMode(false);
              }} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {isEditMode ? (
                // טופס עריכה
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="edit-task-name">
                      שם המשימה <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="edit-task-name"
                      type="text"
                      value={newAssignment.name}
                      onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
                      className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="edit-task-subject">
                      נושא <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="edit-task-subject"
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                      className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="edit-task-due-date">
                        תאריך הגשה <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="edit-task-due-date"
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="edit-task-status">
                        סטטוס <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="edit-task-status"
                        value={newAssignment.status}
                        onChange={(e) => setNewAssignment({
                          ...newAssignment, 
                          status: e.target.value as Assignment["status"]
                        })}
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="not-started">טרם התחיל</option>
                        <option value="in-progress">בתהליך</option>
                        <option value="completed">הושלם</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="edit-task-priority">
                        קדימות <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="edit-task-priority"
                        value={newAssignment.priority}
                        onChange={(e) => setNewAssignment({
                          ...newAssignment, 
                          priority: e.target.value as Priority
                        })}
                        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="high">גבוהה</option>
                        <option value="medium">בינונית</option>
                        <option value="low">נמוכה</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="edit-task-progress">
                        התקדמות
                      </label>
                      <input
                        id="edit-task-progress"
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={newAssignment.completionPercentage || 0}
                        onChange={(e) => setNewAssignment({
                          ...newAssignment, 
                          completionPercentage: parseInt(e.target.value)
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span>{newAssignment.completionPercentage || 0}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="edit-task-assigned">
                      הקצה לתלמידים <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div 
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                        onClick={() => setNewAssignment({
                          ...newAssignment,
                          assignedTo: newAssignment.assignedTo?.includes("דוד כהן") 
                            ? newAssignment.assignedTo.filter(s => s !== "דוד כהן")
                            : [...(newAssignment.assignedTo || []), "דוד כהן"]
                        })}
                      >
                        <input 
                          type="checkbox" 
                          checked={newAssignment.assignedTo?.includes("דוד כהן") || false}
                          readOnly
                        />
                        דוד כהן
                      </div>
                      <div 
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                        onClick={() => setNewAssignment({
                          ...newAssignment,
                          assignedTo: newAssignment.assignedTo?.includes("שרה לוי") 
                            ? newAssignment.assignedTo.filter(s => s !== "שרה לוי")
                            : [...(newAssignment.assignedTo || []), "שרה לוי"]
                        })}
                      >
                        <input 
                          type="checkbox" 
                          checked={newAssignment.assignedTo?.includes("שרה לוי") || false}
                          readOnly
                        />
                        שרה לוי
                      </div>
                      <div 
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs flex items-center gap-1 cursor-pointer"
                        onClick={() => setNewAssignment({
                          ...newAssignment,
                          assignedTo: newAssignment.assignedTo?.includes("תום אלוני") 
                            ? newAssignment.assignedTo.filter(s => s !== "תום אלוני")
                            : [...(newAssignment.assignedTo || []), "תום אלוני"]
                        })}
                      >
                        <input 
                          type="checkbox" 
                          checked={newAssignment.assignedTo?.includes("תום אלוני") || false}
                          readOnly
                        />
                        תום אלוני
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="edit-task-desc">
                      תיאור
                    </label>
                    <textarea
                      id="edit-task-desc"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      className="border rounded-md py-2 px-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="px-4 py-2 border border-muted rounded-md hover:bg-accent transition-colors"
                    >
                      ביטול
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      disabled={!newAssignment.name || !newAssignment.dueDate || !(newAssignment.assignedTo?.length)}
                    >
                      שמור שינויים
                    </button>
                  </div>
                </div>
              ) : (
                // תצוגת פרטי משימה
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(selectedAssignment.status)}
                      <h3 className="text-lg font-medium">{selectedAssignment.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedAssignment.status)}`}
                      >
                        {getStatusText(selectedAssignment.status)}
                      </span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedAssignment.priority)}`}
                      >
                        {getPriorityText(selectedAssignment.priority)}
                      </span>
                    </div>
                  </div>
                  
                  {selectedAssignment.completionPercentage !== undefined && (
                    <div className="mb-5">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">התקדמות:</span>
                        <span>{selectedAssignment.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${selectedAssignment.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-md p-3">
                      <span className="text-sm text-muted-foreground block mb-1">נושא</span>
                      <span>{selectedAssignment.subject}</span>
                    </div>
                    <div className="border rounded-md p-3">
                      <span className="text-sm text-muted-foreground block mb-1">תאריך הגשה</span>
                      <span>{selectedAssignment.dueDate}</span>
                    </div>
                  </div>
                  
                  {selectedAssignment.description && (
                    <div className="border rounded-md p-4 mb-6">
                      <span className="text-sm text-muted-foreground block mb-2">תיאור המשימה</span>
                      <p className="whitespace-pre-line">{selectedAssignment.description}</p>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground block mb-2">הוקצה לתלמידים</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssignment.assignedTo.map(student => (
                        <span 
                          key={student} 
                          className="px-3 py-1 bg-accent rounded-full text-sm"
                        >
                          {student}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                    <div className="border rounded-md p-4 mb-6">
                      <span className="text-sm text-muted-foreground block mb-2">קבצים מצורפים</span>
                      <div className="space-y-2">
                        {selectedAssignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded bg-accent/20">
                            <span className="text-sm">{file}</span>
                            <button className="text-primary hover:text-primary/80">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between gap-2 pt-4 border-t">
                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteAssignment}
                        className="px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <Trash className="w-4 h-4" />
                        מחק משימה
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowDetailsModal(false)}
                        className="px-4 py-2 border border-muted rounded-md hover:bg-accent transition-colors"
                      >
                        סגור
                      </button>
                      <button
                        onClick={handleEditAssignment}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        ערוך משימה
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* מודאל לאישור מחיקה */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-scale-in">
            <div className="text-center space-y-4">
              <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Trash className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-medium">האם למחוק את המשימה?</h3>
              <p className="text-muted-foreground">
                פעולה זו תמחק לצמיתות את המשימה "{selectedAssignment?.name}" ולא ניתן יהיה לשחזר אותה.
              </p>
              
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => setShowConfirmDeleteModal(false)}
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-accent transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={confirmDeleteAssignment}
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  כן, מחק
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
