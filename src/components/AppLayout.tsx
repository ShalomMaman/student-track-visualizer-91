
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  ChevronLeft, 
  ClipboardList, 
  Home, 
  Settings, 
  User 
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: "דשבורד", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "משימות", path: "/assignments", icon: <ClipboardList className="w-5 h-5" /> },
    { name: "הגדרות", path: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafafa]">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 bg-white border-r shadow-sm py-6 flex-shrink-0">
        <div className="w-full">
          <div className="px-6 mb-8">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              <Link to="/" className="flex items-center">
                <BookOpen className="w-6 h-6 text-primary mr-2" />
                <span>מעקב תלמידים</span>
              </Link>
            </h1>
          </div>
          
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-accent"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden bg-white p-4 border-b shadow-sm flex justify-between items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-md ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>

        <Link to="/" className="flex items-center">
          <span className="font-display font-medium">מעקב תלמידים</span>
          <BookOpen className="w-5 h-5 text-primary mr-2" />
        </Link>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
