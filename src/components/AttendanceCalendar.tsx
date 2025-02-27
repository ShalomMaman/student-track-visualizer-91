
import { Calendar as CalendarIcon } from "lucide-react";

interface AttendanceDay {
  date: string;
  present: boolean;
  note?: string;
}

interface AttendanceCalendarProps {
  studentId: number;
  month: string;
}

export const AttendanceCalendar = ({ studentId, month }: AttendanceCalendarProps) => {
  // נתוני נוכחות לדוגמה - בעתיד יוזנו מהשרת
  const attendanceData: AttendanceDay[] = [
    { date: "1", present: true },
    { date: "2", present: true },
    { date: "3", present: true },
    { date: "4", present: false, note: "מחלה" },
    { date: "5", present: false, note: "מחלה" },
    { date: "6", present: true },
    { date: "7", present: true },
    { date: "8", present: true },
    { date: "9", present: true },
    { date: "10", present: true },
    { date: "11", present: true },
    { date: "12", present: true },
    { date: "13", present: false, note: "חופשה משפחתית" },
    { date: "14", present: true },
    { date: "15", present: true },
    { date: "16", present: true },
    { date: "17", present: true },
    { date: "18", present: true },
    { date: "19", present: true },
    { date: "20", present: true }
  ];

  // חישוב אחוז נוכחות
  const presentDays = attendanceData.filter(day => day.present).length;
  const totalDays = attendanceData.length;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-medium">נוכחות - {month}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">אחוז נוכחות:</div>
        <div className="text-lg font-semibold">{attendancePercentage}%</div>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {attendanceData.map((day, index) => (
          <div 
            key={index} 
            className={`aspect-square rounded-md flex items-center justify-center relative ${
              day.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            title={day.note || (day.present ? 'נוכח/ת' : 'לא נוכח/ת')}
          >
            <span className="text-sm font-medium">{day.date}</span>
            {day.note && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
