import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import LoginSignup from "./Components/LoginSignup";
import TableScore from "./Components/TableScore/scorePDT";
import TableUser from "./Components/TableUser";
import Logout from "./Components/Logout"; // ✅ Import component Logout
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cohort from "./Components/Cohort";
import TableTeacher from "./Components/TableTeacher";
import AddStudent from "./Components/TableUser/addStudent";
import Major from "./Components/Major";
import Subject from "./Components/Subject";
import SubjectDetail from "./Components/SubjectDetail";
import Class from "./Components/Class";
import AddTeacher from "./Components/TableTeacher/addTeacher";
import ScoreTeacher from "./Components/TableScore/scoreTeacher";
import StudentScoreForm from "./Components/TableScore/scorePDT";
import ScoreStudent from "./Components/TableScore/scoreStudent";
// import Cohort from "./Components/Cohort/Cohort";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token); // ✅ Cập nhật dựa vào token
  }, []);

  return (
    <>
      {/* ✅ Truyền setIsAuthenticated vào Header để Logout có thể cập nhật state */}
      <Header setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<TableUser />} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/class" element={<Class />} />
        <Route path="/subjectDetail" element={<SubjectDetail />} />
        <Route path="/teacher" element={<TableTeacher />} />
        <Route path="/add-teacher" element={<AddTeacher />} />

        <Route path="/cohort" element={<Cohort />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/score" element={<StudentScoreForm />} />
        {/* Danh cho Teacher */}
        <Route path="/score-teacher" element={<ScoreTeacher />} />
        {/* Danh cho Student */}
        <Route path="/score-student" element={<ScoreStudent />} />

        <Route path="/major" element={<Major />} />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />{" "}
        {/* ✅ Route Logout */}
      </Routes>
    </>
  );
}

export default App;
