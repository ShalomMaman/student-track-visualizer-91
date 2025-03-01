
import { useEffect, useState } from "react";
import { CheckCircle2, CloudOff, RefreshCw, WifiOff, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function SyncIndicator() {
  const [syncState, setSyncState] = useState<"synced" | "syncing" | "offline" | "error">("synced");
  const [lastSynced, setLastSynced] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  // סימולציה של סנכרון אוטומטי כל 30 שניות
  useEffect(() => {
    const updateLastSyncTime = () => {
      const now = new Date();
      setLastSynced(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      );
    };

    // בדיקה ראשונית - נחכה קצת לפני הבדיקה הראשונית
    const initialCheckTimeout = setTimeout(() => {
      updateLastSyncTime();
      const syncTimeout = checkSyncStatus();
      return () => {
        if (syncTimeout) clearTimeout(syncTimeout);
      };
    }, 2000);
    
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
        return null;
      }
      
      // סימולציה של תהליך סנכרון
      setSyncState("syncing");
      
      // סימולציה של סנכרון מוצלח אחרי 1.5 שניות
      const syncTimeout = setTimeout(() => {
        setSyncState("synced");
        updateLastSyncTime();
        toast({
          title: "הנתונים סונכרנו בהצלחה",
          description: "כל השינויים נשמרו בענן",
        });
      }, 1500);
      
      return syncTimeout;
    };
    
    // סנכרון אוטומטי כל 30 שניות (במערכת אמיתית נוכל לשנות את התזמון)
    const intervalId = setInterval(() => {
      checkSyncStatus();
    }, 30000);
    
    // טיפול באירועי חיבור/ניתוק מהרשת
    const handleOnline = () => {
      if (syncState === "offline") {
        checkSyncStatus();
      }
    };
    
    const handleOffline = () => {
      setSyncState("offline");
      toast({
        variant: "destructive",
        title: "אין חיבור לאינטרנט",
        description: "הנתונים ישמרו מקומית ויסונכרנו כשהחיבור יחזור",
      });
    };
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    // ניקוי משאבים בעת הסרת הקומפוננט
    return () => {
      clearTimeout(initialCheckTimeout);
      clearInterval(intervalId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [syncState, toast]);

  const handleManualSync = () => {
    if (syncState !== "syncing") {
      setSyncState("syncing");
      
      // סימולציה של סנכרון מוצלח אחרי 1.5 שניות
      setTimeout(() => {
        setSyncState("synced");
        const now = new Date();
        setLastSynced(
          `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
        );
        toast({
          title: "הנתונים סונכרנו בהצלחה",
          description: "כל השינויים נשמרו בענן",
        });
      }, 1500);
    }
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 text-sm cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors"
        onClick={handleManualSync}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        title={syncState === "syncing" ? "מסנכרן..." : "לחץ לסנכרון ידני"}
      >
        {syncState === "synced" && (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-green-700">מסונכרן</span>
            {lastSynced && <span className="text-xs text-gray-500 hidden sm:inline">({lastSynced})</span>}
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

        {syncState === "synced" && (
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-[10px] ml-1 hidden sm:flex items-center gap-1">
            <Zap className="w-3 h-3" /> אוטומטי
          </Badge>
        )}
      </div>
      
      {showDetails && syncState === "synced" && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md text-xs z-10 min-w-[180px] animate-fade-in">
          <p className="mb-1 font-medium">מצב סנכרון:</p>
          <div className="flex justify-between items-center mb-1">
            <span>סנכרון אחרון:</span>
            <span className="font-medium">{lastSynced}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>קצב סנכרון:</span>
            <span className="font-medium">כל 30 שניות</span>
          </div>
        </div>
      )}
    </div>
  );
}
