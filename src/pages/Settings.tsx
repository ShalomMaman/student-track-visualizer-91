
import { ArrowRight, Bell, Calendar, FileText, HelpCircle, Layers, Lock, Plus, Settings as SettingsIcon, User, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserPreference {
  id: string;
  name: string;
  enabled: boolean;
}

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [showResetModal, setShowResetModal] = useState(false);
  
  // הגדרות לדוגמה
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState("he");
  const [dataRefreshInterval, setDataRefreshInterval] = useState("30");
  
  // הגדרות התראות
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationPreferences, setNotificationPreferences] = useState<UserPreference[]>([
    { id: "assignments", name: "משימות חדשות", enabled: true },
    { id: "due-dates", name: "תאריכי הגשה מתקרבים", enabled: true },
    { id: "performance", name: "עדכוני ביצועים", enabled: false },
    { id: "attendance", name: "התראות נוכחות", enabled: true },
    { id: "messages", name: "הודעות מהמערכת", enabled: true },
  ]);
  
  // פונקציה לעדכון העדפת התראה
  const updateNotificationPreference = (id: string, enabled: boolean) => {
    setNotificationPreferences(
      notificationPreferences.map(pref => 
        pref.id === id ? { ...pref, enabled } : pref
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
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
            <SettingsIcon className="w-6 h-6 text-primary" />
            <h1 className="font-display text-3xl font-semibold tracking-tight">הגדרות מערכת</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            התאם את המערכת להעדפותיך
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* תפריט צד */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "general" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <User className="w-5 h-5" />
                כללי
              </button>
              <button 
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "notifications" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <Bell className="w-5 h-5" />
                התראות
              </button>
              <button 
                onClick={() => setActiveTab("calendar")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "calendar" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <Calendar className="w-5 h-5" />
                לוח שנה
              </button>
              <button 
                onClick={() => setActiveTab("reports")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "reports" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <FileText className="w-5 h-5" />
                דוחות
              </button>
              <button 
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "security" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <Lock className="w-5 h-5" />
                אבטחה
              </button>
              <button 
                onClick={() => setActiveTab("help")}
                className={`w-full flex items-center gap-2 p-3 rounded-md ${
                  activeTab === "help" ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-muted-foreground font-medium"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                עזרה ותמיכה
              </button>
            </nav>
          </div>

          {/* תוכן הגדרות - משתנה לפי הלשונית הנבחרת */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up md:col-span-3">
            {activeTab === "general" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">הגדרות כלליות</h2>
                
                <div className="space-y-6">
                  {/* הגדרות ממשק משתמש */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">ממשק משתמש</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>מצב כהה</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={darkModeEnabled}
                            onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div>
                        <span className="block mb-2">שפה</span>
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="border rounded-md p-2 w-full"
                        >
                          <option value="he">עברית</option>
                          <option value="en">אנגלית</option>
                          <option value="ar">ערבית</option>
                        </select>
                      </div>
                      
                      <div>
                        <span className="block mb-2">רענון נתונים (בשניות)</span>
                        <select 
                          value={dataRefreshInterval}
                          onChange={(e) => setDataRefreshInterval(e.target.value)}
                          className="border rounded-md p-2 w-full"
                        >
                          <option value="0">ללא רענון אוטומטי</option>
                          <option value="30">30 שניות</option>
                          <option value="60">דקה</option>
                          <option value="300">5 דקות</option>
                          <option value="600">10 דקות</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* הגדרות עריכה */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">עריכה</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>שמירה אוטומטית</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={autoSaveEnabled}
                            onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* איפוס והעדפות מתקדמות */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">העדפות מתקדמות</h3>
                    <div className="space-y-4">
                      <button 
                        onClick={() => setShowResetModal(true)}
                        className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-md hover:bg-red-100 transition-colors w-full text-center"
                      >
                        איפוס כל ההגדרות
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                      שמור הגדרות
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">הגדרות התראות</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">ערוצי התראות</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>התראות במערכת</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>התראות דוא"ל</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>התראות דחיפה</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">סוגי התראות</h3>
                    <div className="space-y-4">
                      {notificationPreferences.map(pref => (
                        <div key={pref.id} className="flex items-center justify-between">
                          <span>{pref.name}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={pref.enabled}
                              onChange={() => updateNotificationPreference(pref.id, !pref.enabled)}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                      שמור הגדרות
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "calendar" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">הגדרות לוח שנה</h2>
                <p className="text-muted-foreground mb-8">
                  התאם את הגדרות לוח השנה והאירועים במערכת.
                </p>
                
                {/* כאן יבואו הגדרות לוח שנה */}
                <div className="h-64 flex items-center justify-center border rounded-lg text-muted-foreground">
                  <span>הגדרות לוח שנה - בפיתוח</span>
                </div>
              </div>
            )}
            
            {activeTab === "reports" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">הגדרות דוחות</h2>
                <p className="text-muted-foreground mb-8">
                  הגדר את סוגי הדוחות, תדירות ייצוא ואפשרויות שיתוף.
                </p>
                
                {/* כאן יבואו הגדרות דוחות */}
                <div className="h-64 flex items-center justify-center border rounded-lg text-muted-foreground">
                  <span>הגדרות דוחות - בפיתוח</span>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">הגדרות אבטחה</h2>
                <p className="text-muted-foreground mb-8">
                  נהל את אבטחת החשבון שלך, הגדרות סיסמה והרשאות גישה.
                </p>
                
                {/* כאן יבואו הגדרות אבטחה */}
                <div className="h-64 flex items-center justify-center border rounded-lg text-muted-foreground">
                  <span>הגדרות אבטחה - בפיתוח</span>
                </div>
              </div>
            )}
            
            {activeTab === "help" && (
              <div>
                <h2 className="font-display text-lg font-medium mb-6">עזרה ותמיכה</h2>
                <p className="text-muted-foreground mb-8">
                  קבל עזרה בשימוש במערכת, צפה במדריכים ופנה לתמיכה טכנית.
                </p>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-1">מדריך למשתמש</h3>
                    <p className="text-sm text-muted-foreground">צפה במדריך המלא למשתמש במערכת</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-1">שאלות נפוצות</h3>
                    <p className="text-sm text-muted-foreground">מצא תשובות לשאלות נפוצות</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-1">פנייה לתמיכה</h3>
                    <p className="text-sm text-muted-foreground">פתח קריאת שירות חדשה לצוות התמיכה</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* מודאל לאיפוס הגדרות */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium">איפוס הגדרות</h2>
              <button onClick={() => setShowResetModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">האם אתה בטוח שברצונך לאפס את כל ההגדרות לברירת המחדל?</p>
              <p className="text-sm text-muted-foreground">פעולה זו אינה ניתנת לביטול.</p>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 border border-muted rounded-md hover:bg-accent transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  // כאן יבוא הקוד לאיפוס ההגדרות
                  setShowResetModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                אפס הגדרות
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
