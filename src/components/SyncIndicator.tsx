
import { useEffect, useState } from "react";
import { CheckCircle2, CloudOff, RefreshCw, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SyncIndicator() {
  const [syncState, setSyncState] = useState<"synced" | "syncing" | "offline" | "error">("synced");
  const { toast } = useToast();

  // סימולציה של סנכרון אוטומטי כל 30 שניות
  useEffect(() => {
    const checkSyncStatus = () => {
      // סימולציה של בדיקת חיבור אינטרנט
      const isOnline = navigator.onLine;
      
      if (!isOnline) {
        setSyncState("offline");
        toast({
          variant: "destructive",
          title: "אין חיבור לאינטרנט",
          description: "הנתונים ישמרו מקומית ויסונכרנו כשהחיבור יחזור",
        });
        return;
      }
      
      // סימולציה של תהליך סנכרון
      setSyncState("syncing");
      
      // סימולציה של סנכרון מוצלח אחרי 1.5 שניות
      setTimeout(() => {
        setSyncState("synced");
        toast({
          title: "הנתונים סונכרנו בהצלחה",
          description: "כל השינויים נשמרו בהצלחה",
        });
      }, 1500);
    };
    
    // בדיקה ראשונית
    checkSyncStatus();
    
    // סנכרון אוטומטי כל 30 שניות (במערכת אמיתית נוכל לשנות את התזמון)
    const intervalId = setInterval(() => {
      checkSyncStatus();
    }, 30000);
    
    // בדיקה בעת שינוי מצב התחברות
    window.addEventListener("online", () => {
      if (syncState === "offline") {
        checkSyncStatus();
      }
    });
    
    window.addEventListener("offline", () => {
      setSyncState("offline");
      toast({
        variant: "destructive",
        title: "אין חיבור לאינטרנט",
        description: "הנתונים ישמרו מקומית ויסונכרנו כשהחיבור יחזור",
      });
    });
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", checkSyncStatus);
      window.removeEventListener("offline", checkSyncStatus);
    };
  }, [syncState, toast]);

  const handleManualSync = () => {
    if (syncState !== "syncing") {
      setSyncState("syncing");
      
      // סימולציה של סנכרון מוצלח אחרי 1.5 שניות
      setTimeout(() => {
        setSyncState("synced");
        toast({
          title: "הנתונים סונכרנו בהצלחה",
          description: "כל השינויים נשמרו בהצלחה",
        });
      }, 1500);
    }
  };

  return (
    <div 
      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors"
      onClick={handleManualSync}
    >
      {syncState === "synced" && (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-green-700">מסונכרן</span>
        </>
      )}
      
      {syncState === "syncing" && (
        <>
          <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-blue-700">מסנכרן...</span>
        </>
      )}
      
      {syncState === "offline" && (
        <>
          <WifiOff className="w-4 h-4 text-red-600" />
          <span className="text-red-700">במצב לא מקוון</span>
        </>
      )}
      
      {syncState === "error" && (
        <>
          <CloudOff className="w-4 h-4 text-red-600" />
          <span className="text-red-700">שגיאת סנכרון</span>
        </>
      )}
    </div>
  );
}
