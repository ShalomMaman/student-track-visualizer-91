
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

    // Add event listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;
    
    // Clear existing theme classes
    root.classList.remove("light", "dark");
    
    // Determine which theme to apply
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const themeToApply = newTheme === "system" ? systemTheme : newTheme;
    
    // Apply the theme class
    root.classList.add(themeToApply);
    
    // Store user preference
    localStorage.setItem("theme", newTheme);

    // Update the CSS color scheme
    document.documentElement.style.colorScheme = themeToApply;

    // Update meta theme-color for mobile devices
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content", 
        themeToApply === "dark" ? "#171717" : "#ffffff"
      );
    }
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
      type="button"
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
