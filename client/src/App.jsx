import React from "react";
import { BrowserRouter as Router,Routes,Route ,Link } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile/";
import Desktop from "./pages/Desktop";
import Students from "./pages/Students"
import Alumini from "./pages/Alumini";
import CollegeStudents from "./pages/CollegeStudents";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/college-students" element={<CollegeStudents/>}/>
        <Route path="/alumini" element={<Alumini/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Desktop/>}/>
      </Routes>
    </Router>
  );
};

export default App