
import { useState, useEffect } from "react";
import { Info, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AppVersionIndicator() {
  const [version, setVersion] = useState("1.0.0");
  const [hasUpdate, setHasUpdate] = useState(false);
  const { toast } = useToast();

  // סימולציה של בדיקת עדכונים
  useEffect(() => {
    // בדיקה של עדכונים חדשים בהפעלה הראשונה
    const checkForUpdates = () => {
      // סימולציה של גרסה עדכנית שאפשר לעדכן אליה
      const latestVersion = "1.0.1";
      
      if (latestVersion !== version) {
        setHasUpdate(true);
        toast({
          title: "עדכון זמין",
          description: `גרסה ${latestVersion} זמינה להתקנה`,
          action: (
            <button 
              className="bg-primary text-white px-3 py-1 rounded-md text-xs"
              onClick={() => updateApp(latestVersion)}
            >
              עדכן עכשיו
            </button>
          ),
        });
      }
    };
    
    // בדיקת עדכונים בהפעלה ראשונית ולאחר מכן כל 24 שעות
    const timeoutId = setTimeout(checkForUpdates, 5000);
    
    return () => clearTimeout(timeoutId);
  }, [version, toast]);

  const updateApp = (newVersion: string) => {
    // סימולציה של תהליך עדכון
    toast({
      title: "מעדכן את האפליקציה...",
      description: "נא לא לסגור את החלון במהלך העדכון",
    });
    
    // סימולציה של עדכון שלוקח 2 שניות
    setTimeout(() => {
      setVersion(newVersion);
      setHasUpdate(false);
      toast({
        title: "האפליקציה עודכנה בהצלחה",
        description: `עודכן לגרסה ${newVersion}`,
      });
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Info className="w-3 h-3" />
      <span>גרסה {version}</span>
      {hasUpdate && (
        <button
          onClick={() => updateApp("1.0.1")}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          <span>עדכן</span>
        </button>
      )}
    </div>
  );
}
