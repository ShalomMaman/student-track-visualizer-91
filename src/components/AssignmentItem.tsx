
import React from "react";
import { Clock, Tag } from "lucide-react";

interface Assignment {
  id: number;
  name: string;
  subject: string;
  dueDate: string;
  assignedTo: string[];
  status: "completed" | "in-progress" | "not-started";
  description?: string;
}

interface AssignmentItemProps {
  assignment: Assignment;
  onClick: () => void;
}

export const AssignmentItem = ({ assignment, onClick }: AssignmentItemProps) => {
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
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case "in-progress":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case "not-started":
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1.5">{getStatusIcon(assignment.status)}</div>
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
  );
};
