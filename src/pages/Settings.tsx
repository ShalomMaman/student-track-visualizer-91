
import { ArrowRight, Bell, Calendar, FileText, Settings as SettingsIcon, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  
  // הגדרות לדוגמה
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState("he");

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={() => navigate(-1)}
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
              <button className="w-full flex items-center gap-2 p-3 rounded-md bg-primary/10 text-primary font-medium">
                <User className="w-5 h-5" />
                כללי
              </button>
              <button className="w-full flex items-center gap-2 p-3 rounded-md hover:bg-accent text-muted-foreground font-medium">
                <Bell className="w-5 h-5" />
                התראות
              </button>
              <button className="w-full flex items-center gap-2 p-3 rounded-md hover:bg-accent text-muted-foreground font-medium">
                <Calendar className="w-5 h-5" />
                לוח שנה
              </button>
              <button className="w-full flex items-center gap-2 p-3 rounded-md hover:bg-accent text-muted-foreground font-medium">
                <FileText className="w-5 h-5" />
                דוחות
              </button>
            </nav>
          </div>

          {/* הגדרות ראשיות */}
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up md:col-span-3">
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
                </div>
              </div>

              {/* הגדרות התראות */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">התראות</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>התראות מערכת</span>
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

              <div className="flex justify-end pt-4">
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  שמור הגדרות
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
