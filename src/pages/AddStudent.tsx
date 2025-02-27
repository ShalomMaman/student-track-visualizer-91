
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, X } from "lucide-react";

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("כיתה ג'");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");

  const gradeOptions = ["כיתה א'", "כיתה ב'", "כיתה ג'", "כיתה ד'", "כיתה ה'", "כיתה ו'"];

  const handleAddSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (index: number) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the new student to your database
    // For now, we'll just navigate back to the index page
    alert(`תלמיד חדש נוסף: ${name}`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="font-display text-2xl font-semibold">הוספת תלמיד חדש</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              שם התלמיד
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="הכנס את שם התלמיד"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="grade" className="block text-sm font-medium">
              כיתה
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {gradeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              מקצועות לימוד
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="הכנס מקצוע לימוד"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {subjects.map((subject, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {subjects.length === 0 && (
                <p className="text-sm text-muted-foreground">לא נבחרו מקצועות עדיין</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              הוסף תלמיד
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
