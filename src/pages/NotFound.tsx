
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-sm text-center animate-fade-up">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-2">
          העמוד לא נמצא
        </h1>
        <p className="text-muted-foreground mb-6">
          העמוד שחיפשת אינו קיים או שאין לך הרשאות לצפות בו.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center mx-auto gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          חזרה לדף הבית
        </button>
      </div>
    </div>
  );
};

export default NotFound;
