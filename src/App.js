import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import LoginSignup from './Components/LoginSignup';
import TableScore from './Components/TableScore';
import TableUser from './Components/TableUser';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cohort from './Components/Cohort';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<TableUser />} />
        <Route path="/cohort" element={<Cohort />} />
      </Routes>
    </>
  );
}

export default App;
