
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SkillRadarChart } from "@/components/SkillRadarChart";
import { AttendanceCalendar } from "@/components/AttendanceCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  FileText,
  Calendar,
  GraduationCap,
  Phone,
  Mail,
  Home,
  Clock,
  Award,
  Palette,
  Book,
  HeartPulse,
  ArrowLeft,
  Settings,
  CheckCircle,
  AlertCircle,
  Book as BookIcon,
  Edit,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PerformanceChart } from "@/components/PerformanceChart";

// סימולציה של נתוני תלמיד
interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: "completed" | "pending" | "late";
}

// סימולציה של דגשים לתלמיד
interface Note {
  id: number;
  type: "strength" | "weakness" | "general";
  content: string;
  date: string;
}

export default function StudentProfile() {
  const { id } = useParams<{ id?: string }>();
  const studentId = parseInt(id || "1");
  
  // סימולציה של נתוני תלמיד
  const student = {
    id: studentId,
    name: "דניאל לוי",
    avatar: "/placeholder.svg",
    grade: "ה'",
    classroom: "2",
    phone: "052-1234567",
    parentPhone: "054-1234567",
    email: "parent@example.com",
    address: "רחוב הברוש 5, תל אביב",
    dob: "12/03/2013",
    joinedAt: "01/09/2020",
    attendance: 92,
    behaviorScore: 85,
    averageGrade: 87,
    readingLevel: "מתקדם",
    mathLevel: "בינוני-גבוה",
  };

  // סימולציה של נתוני משימות
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "דף עבודה - חיבור וחיסור",
      subject: "מתמטיקה",
      dueDate: "24/04/2023",
      status: "completed",
    },
    {
      id: 2,
      title: "קריאת סיפור והכנת סיכום",
      subject: "עברית",
      dueDate: "25/04/2023",
      status: "pending",
    },
    {
      id: 3,
      title: "הכנת מצגת קצרה על בעלי חיים",
      subject: "מדעים",
      dueDate: "20/04/2023",
      status: "late",
    },
    {
      id: 4,
      title: "משימה בהבנת הנקרא",
      subject: "עברית",
      dueDate: "23/04/2023",
      status: "completed",
    },
    {
      id: 5,
      title: "תרגול כפל וחילוק",
      subject: "מתמטיקה",
      dueDate: "26/04/2023",
      status: "pending",
    },
  ];

  // סימולציה של דגשים לתלמיד
  const notes: Note[] = [
    {
      id: 1,
      type: "strength",
      content: "יכולת ריכוז גבוהה מאוד בשיעורי מתמטיקה. מגלה עניין רב ושואל שאלות מעמיקות.",
      date: "15/03/2023",
    },
    {
      id: 2,
      type: "weakness",
      content: "לעיתים מתקשה בהבנת הנקרא בטקסטים ארוכים. צריך תרגול נוסף והנחייה צמודה.",
      date: "10/03/2023",
    },
    {
      id: 3,
      type: "general",
      content: "התלמיד מראה התקדמות משמעותית מתחילת השנה. מומלץ להמשיך לחזק את הביטחון העצמי שלו.",
      date: "22/02/2023",
    },
    {
      id: 4,
      type: "strength",
      content: "יכולת הבעה טובה מאוד בכתב. החיבורים שלו מאורגנים היטב עם אוצר מילים עשיר.",
      date: "05/03/2023",
    },
    {
      id: 5,
      type: "weakness",
      content: "לעיתים מתקשה ביצירת קשרים חברתיים. כדאי לעודד עבודה בקבוצות קטנות.",
      date: "18/02/2023",
    },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  
  // ניווט חזרה
  const handleBack = () => {
    window.history.back();
  };

  // Helper function to get badge variant based on student performance
  const getPerformanceBadgeVariant = (averageGrade: number) => {
    if (averageGrade >= 85) return "secondary";
    return "outline";
  };

  // Helper function to get badge text based on student performance
  const getPerformanceBadgeText = (averageGrade: number) => {
    if (averageGrade >= 85) return "מצטיין";
    return "בינוני";
  };

  // Helper function to get assignment status badge variant
  const getAssignmentStatusBadgeVariant = (status: "completed" | "pending" | "late") => {
    switch (status) {
      case "completed":
        return "secondary";
      case "pending":
        return "outline";
      case "late":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Helper function to get assignment status text
  const getAssignmentStatusText = (status: "completed" | "pending" | "late") => {
    switch (status) {
      case "completed":
        return "הוגש";
      case "pending":
        return "בהמתנה";
      case "late":
        return "באיחור";
      default:
        return "";
    }
  };

  // Helper function to get note type badge variant
  const getNoteTypeBadgeVariant = (type: "strength" | "weakness" | "general") => {
    switch (type) {
      case "strength":
        return "secondary";
      case "weakness":
        return "outline";
      case "general":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Helper function to get note type text
  const getNoteTypeText = (type: "strength" | "weakness" | "general") => {
    switch (type) {
      case "strength":
        return "חוזק";
      case "weakness":
        return "נקודה לשיפור";
      case "general":
        return "הערה כללית";
      default:
        return "";
    }
  };

  // Format current date to string for attendance calendar
  const currentDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="container pb-12">
      <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center gap-2">
          <Button onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">פרופיל תלמיד</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
            {editMode ? <Save size={16} /> : <Edit size={16} />}
            <span className="ms-2">{editMode ? "שמור שינויים" : "ערוך פרופיל"}</span>
          </Button>
          <Button variant="outline" size="sm">
            <Settings size={16} />
            <span className="ms-2">הגדרות</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute right-4 top-4">
                <Badge variant={getPerformanceBadgeVariant(student.averageGrade)}>
                  {getPerformanceBadgeText(student.averageGrade)}
                </Badge>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center text-xl">{student.name}</CardTitle>
                <CardDescription className="text-center">
                  כיתה {student.grade}{student.classroom}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">מזהה תלמיד</div>
                      <div>{student.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">טלפון הורים</div>
                      <div>{student.parentPhone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">אימייל</div>
                      <div>{student.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Home size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">כתובת</div>
                      <div>{student.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">תאריך לידה</div>
                      <div>{student.dob}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">הצטרף בתאריך</div>
                      <div>{student.joinedAt}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">מדדי ביצוע</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <div className="font-medium">נוכחות</div>
                  <div className="text-muted-foreground">{student.attendance}%</div>
                </div>
                <Progress value={student.attendance} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <div className="font-medium">התנהגות</div>
                  <div className="text-muted-foreground">{student.behaviorScore}%</div>
                </div>
                <Progress value={student.behaviorScore} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <div className="font-medium">ממוצע ציונים</div>
                  <div className="text-muted-foreground">{student.averageGrade}%</div>
                </div>
                <Progress value={student.averageGrade} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <BookIcon size={16} className="text-blue-500" />
                    <div className="font-medium">רמת קריאה</div>
                  </div>
                  <div className="text-sm">{student.readingLevel}</div>
                </div>

                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <GraduationCap size={16} className="text-green-500" />
                    <div className="font-medium">רמת מתמטיקה</div>
                  </div>
                  <div className="text-sm">{student.mathLevel}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
              <TabsTrigger value="attendance">נוכחות</TabsTrigger>
              <TabsTrigger value="assignments">משימות</TabsTrigger>
              <TabsTrigger value="notes">דגשים</TabsTrigger>
              <TabsTrigger value="performance">ביצועים</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">מיומנויות וכישורים</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <SkillRadarChart studentId={studentId} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">נוכחות חודשית</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AttendanceCalendar studentId={studentId} month={currentDateString} />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">ביצועים לאורך זמן</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">משימות אחרונות</CardTitle>
                      <Button size="sm" variant="outline">
                        ראה הכל
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.slice(0, 3).map((assignment) => (
                        <div key={assignment.id} className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <div
                              className={`mt-0.5 p-1 rounded-full ${
                                assignment.status === "completed"
                                  ? "bg-green-100"
                                  : assignment.status === "pending"
                                  ? "bg-blue-100"
                                  : "bg-yellow-100"
                              }`}
                            >
                              {assignment.status === "completed" ? (
                                <CheckCircle
                                  size={16}
                                  className="text-green-600"
                                />
                              ) : assignment.status === "pending" ? (
                                <Clock size={16} className="text-blue-600" />
                              ) : (
                                <AlertCircle
                                  size={16}
                                  className="text-yellow-600"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {assignment.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {assignment.subject}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs">{assignment.dueDate}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">דגשים והערות</CardTitle>
                      <Button size="sm" variant="outline">
                        ראה הכל
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notes.slice(0, 3).map((note) => (
                        <div key={note.id} className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 p-1 rounded-full ${
                              note.type === "strength"
                                ? "bg-green-100"
                                : note.type === "weakness"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                            }`}
                          >
                            {note.type === "strength" ? (
                              <Award size={16} className="text-green-600" />
                            ) : note.type === "weakness" ? (
                              <FileText size={16} className="text-yellow-600" />
                            ) : (
                              <Book size={16} className="text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm">{note.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {note.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>נוכחות</CardTitle>
                  <CardDescription>צפייה בדוח נוכחות מפורט</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceCalendar studentId={studentId} month={currentDateString} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>משימות</CardTitle>
                  <CardDescription>רשימת המשימות וסטטוס ההגשה</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 p-2 rounded-full ${
                              assignment.status === "completed"
                                ? "bg-green-100"
                                : assignment.status === "pending"
                                ? "bg-blue-100"
                                : "bg-yellow-100"
                            }`}
                          >
                            {assignment.status === "completed" ? (
                              <CheckCircle
                                size={18}
                                className="text-green-600"
                              />
                            ) : assignment.status === "pending" ? (
                              <Clock size={18} className="text-blue-600" />
                            ) : (
                              <AlertCircle
                                size={18}
                                className="text-yellow-600"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {assignment.subject}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                תאריך הגשה: {assignment.dueDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={getAssignmentStatusBadgeVariant(assignment.status)}
                        >
                          {getAssignmentStatusText(assignment.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>דגשים והערות</CardTitle>
                  <CardDescription>
                    הערות צוות החינוך לגבי התלמיד
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`p-2 rounded-full ${
                              note.type === "strength"
                                ? "bg-green-100"
                                : note.type === "weakness"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                            }`}
                          >
                            {note.type === "strength" ? (
                              <Award size={18} className="text-green-600" />
                            ) : note.type === "weakness" ? (
                              <FileText
                                size={18}
                                className="text-yellow-600"
                              />
                            ) : (
                              <Book size={18} className="text-blue-600" />
                            )}
                          </div>
                          <div>
                            <Badge variant={getNoteTypeBadgeVariant(note.type)}>
                              {getNoteTypeText(note.type)}
                            </Badge>
                            <span className="text-sm text-muted-foreground ms-2">
                              {note.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>ניתוח ביצועים</CardTitle>
                  <CardDescription>
                    ביצועי התלמיד לאורך תקופות
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <PerformanceChart />
                    <SkillRadarChart studentId={studentId} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
