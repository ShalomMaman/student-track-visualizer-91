
import { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  CircleDashed, 
  ClipboardCheck, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  SortAsc,
  Tag, 
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

// סוג משימה
interface Assignment {
  id: number;
  name: string;
  subject: string;
  dueDate: string;
  assignedTo: string[];
  status: "completed" | "in-progress" | "not-started";
  description?: string;
}

// סוג מיון
type SortType = "dueDate" | "name" | "status";

const Assignments = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [sortBy, setSortBy] = useState<SortType>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  
  // ערכים למשימה חדשה
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    name: "",
    subject: "קריאה",
    dueDate: "",
    assignedTo: [],
    status: "not-started",
    description: ""
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
      description: "קריאת הסיפור במלואו והבנת המסר העיקרי. יש לענות על שאלות בדף העבודה."
    },
    {
      id: 2,
      name: "דף עבודה - חיבור וחיסור עד 100",
      subject: "חשבון",
      dueDate: "18/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי"],
      status: "completed",
      description: "השלמת כל התרגילים בדף העבודה. יש לנמק את הפתרונות."
    },
    {
      id: 3,
      name: "כתיבת חיבור קצר על משפחה",
      subject: "כתיבה",
      dueDate: "22/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "in-progress",
      description: "כתיבת חיבור באורך של 200-300 מילים על המשפחה. יש להתייחס לתפקידים במשפחה."
    },
    {
      id: 4,
      name: "תרגילי חיבור וחיסור עם שברים",
      subject: "חשבון",
      dueDate: "25/05/2023",
      assignedTo: ["תום אלוני"],
      status: "in-progress",
      description: "פתירת תרגילי שברים בספר בעמודים 45-48."
    },
    {
      id: 5,
      name: "קריאת פרק 3 בספר 'הרפתקאות בגן החיות'",
      subject: "קריאה",
      dueDate: "28/05/2023",
      assignedTo: ["דוד כהן", "שרה לוי", "תום אלוני"],
      status: "not-started",
      description: "קריאת הפרק וסיכום קצר של האירועים המרכזיים."
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
      }
      return 0;
    });
  };

  // סינון משימות לפי סטטוס, נושא וחיפוש
  const filteredAssignments = assignments.filter(assignment => {
    // סינון לפי סטטוס
    if (statusFilter !== "all" && assignment.status !== statusFilter) {
      return false;
    }
    
    // סינון לפי נושא
    if (subjectFilter !== "all" && assignment.subject !== subjectFilter) {
      return false;
    }
    
    // סינון לפי חיפוש
    if (searchQuery && !assignment.name.includes(searchQuery) && 
        !assignment.subject.includes(searchQuery)) {
      return false;
    }
    
    return true;
  });

  // מיון אחרי סינון
  const sortedAndFilteredAssignments = sortAssignments(filteredAssignments);

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
  
  // פונקציה לאיפוס הטופס של משימה חדשה
  const resetNewAssignmentForm = () => {
    setNewAssignment({
      name: "",
      subject: "קריאה",
      dueDate: "",
      assignedTo: [],
      status: "not-started",
      description: ""
    });
  };
  
  // פונקציה להוספת משימה חדשה (לצורך ההדגמה)
  const handleAddAssignment = () => {
    console.log("הוספת משימה חדשה:", newAssignment);
    // בהמשך כאן יהיה קוד להוספת המשימה לשרת
    setShowAddModal(false);
    resetNewAssignmentForm();
    // ניתן להוסיף הודעת Toast כאן
  };
  
  // פונקציה לטיפול בפתיחת פרטי משימה
  const handleOpenDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
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
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'}`}
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
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
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleOpenDetails(assignment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <h3 className="font-medium">{assignment.name}</h3>
                        <div className="flex gap-4 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {assignment.subject}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {assignment.dueDate}
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
                  <div className="mt-3">
                    <span className="text-xs text-muted-foreground">הוקצה ל: {assignment.assignedTo.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right w-12">סטטוס</TableHead>
                    <TableHead className="text-right">שם המשימה</TableHead>
                    <TableHead className="text-right">נושא</TableHead>
                    <TableHead className="text-right">תאריך הגשה</TableHead>
                    <TableHead className="text-right">הוקצה ל</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredAssignments.map((assignment) => (
                    <TableRow 
                      key={assignment.id}
                      className={`cursor-pointer ${getStatusBgColor(assignment.status)}`}
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
                      <TableCell>{assignment.dueDate}</TableCell>
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
              <h2 className="font-display text-xl font-medium">פרטי משימה</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(selectedAssignment.status)}
                    <h3 className="text-lg font-medium">{selectedAssignment.name}</h3>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded-full ${getStatusColor(selectedAssignment.status)}`}
                  >
                    {getStatusText(selectedAssignment.status)}
                  </span>
                </div>
                
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
                
                <div>
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
              </div>
              
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-muted rounded-md hover:bg-accent transition-colors"
                >
                  סגור
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    setShowDetailsModal(false);
                    // בהמשך יהיה כאן קוד לעריכת המשימה
                  }}
                >
                  ערוך משימה
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
