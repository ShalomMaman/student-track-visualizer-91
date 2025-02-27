
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import StudentProfile from "./pages/StudentProfile";
import Assignments from "./pages/Assignments";
import Settings from "./pages/Settings";
import AddStudent from "./pages/AddStudent";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout><Index /></AppLayout>} />
        <Route path="/student/:id" element={<AppLayout><StudentProfile /></AppLayout>} />
        <Route path="/assignments" element={<AppLayout><Assignments /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
        <Route path="/add-student" element={<AppLayout><AddStudent /></AppLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
