
import { useState, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  
  useEffect(() => {
    // בדיקה אם יש ערך שמור מקודם בלוקל סטורג'
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // ברירת מחדל של המערכת
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const themeToApply = newTheme === "system" ? systemTheme : newTheme;
    
    root.classList.add(themeToApply);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-accent/50 hover:bg-accent p-2 rounded-lg transition-colors"
      title={`מצב נוכחי: ${
        theme === "light" ? "תצוגת יום" : 
        theme === "dark" ? "תצוגת לילה" : 
        "תצוגת מערכת"
      }`}
    >
      {theme === "light" && <Sun className="w-4 h-4" />}
      {theme === "dark" && <Moon className="w-4 h-4" />}
      {theme === "system" && <Laptop className="w-4 h-4" />}
      <span className="text-sm">
        {theme === "light" ? "תצוגת יום" : 
         theme === "dark" ? "תצוגת לילה" : 
         "תצוגת מערכת"}
      </span>
    </button>
  );
}
