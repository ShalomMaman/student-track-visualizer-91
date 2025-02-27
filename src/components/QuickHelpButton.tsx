
import { useState } from "react";
import { HelpCircle, X, BookOpen, Lightbulb, MessageSquare, Video } from "lucide-react";

type HelpTopic = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  videoUrl?: string;
};

const helpTopics: HelpTopic[] = [
  {
    id: 1,
    title: "מעקב אחר התקדמות תלמידים",
    description: "צפה בהתקדמות תלמידים, פילוח לפי משימות ומקצועות, והיסטוריית למידה",
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    videoUrl: "#"
  },
  {
    id: 2,
    title: "מערכת הפרסים והתגמולים",
    description: "כיצד להשתמש במערכת הפרסים, להגדיר פרסים חדשים ולחלק לתלמידים",
    icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
    videoUrl: "#"
  },
  {
    id: 3,
    title: "ניהול משימות ובחינות",
    description: "יצירת וניהול של משימות מותאמות אישית, הגדרת תאריכי יעד ומעקב אחר ביצוע",
    icon: <MessageSquare className="w-5 h-5 text-green-600" />
  }
];

export function QuickHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
        aria-label="עזרה מהירה"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden animate-fade-up">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                עזרה מהירה
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedTopic(null);
                }}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              {selectedTopic ? (
                <div className="animate-fade-in">
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="text-primary hover:underline flex items-center gap-1 mb-3"
                  >
                    <span>← חזרה לכל הנושאים</span>
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {selectedTopic.icon}
                    </div>
                    <h4 className="font-medium text-lg">{selectedTopic.title}</h4>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {selectedTopic.description}
                  </p>
                  
                  {selectedTopic.videoUrl && (
                    <div className="mb-4">
                      <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center border">
                        <div className="flex flex-col items-center gap-2">
                          <Video className="w-12 h-12 text-gray-400" />
                          <span className="text-sm text-gray-500">סרטון הדרכה</span>
                        </div>
                      </div>
                      <button className="w-full mt-2 bg-primary text-white py-2 rounded-md flex items-center justify-center gap-2">
                        <Video className="w-4 h-4" />
                        צפה בסרטון הדרכה
                      </button>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h5 className="font-medium mb-2 text-blue-800 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      טיפים מקצועיים
                    </h5>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-1.5">
                        <span className="bg-blue-200 text-blue-800 w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5 shrink-0">1</span>
                        <span>השתמש בתצוגת הגרף המרכזית לצפייה בהתקדמות כוללת</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="bg-blue-200 text-blue-800 w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5 shrink-0">2</span>
                        <span>ניתן לסנן את התצוגה לפי כיתות ומקצועות לימוד</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="bg-blue-200 text-blue-800 w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5 shrink-0">3</span>
                        <span>הגדר התראות מותאמות אישית בעמוד ההגדרות</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <button className="w-full bg-primary/10 text-primary py-2 rounded-md hover:bg-primary/20 transition-colors">
                      שאל שאלה נוספת
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-600 mb-4">
                    בחר נושא מהרשימה לקבלת עזרה מפורטת ומדריכים:
                  </p>
                  
                  {helpTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="border rounded-lg p-3 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          {topic.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{topic.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border rounded-lg p-4 bg-gray-50 mt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      צריך עזרה נוספת?
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      לא מצאת את מה שחיפשת? צור קשר עם צוות התמיכה שלנו
                    </p>
                    <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                      פתח קריאת שירות
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
