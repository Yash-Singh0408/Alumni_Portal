import React from "react";
import { BrowserRouter as Router,Routes,Route ,Link } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./components/List";
import Profile from "./pages/Profile/";
import Desktop from "./pages/Desktop";
import AluminiList from "./components/AluminiList";
import StudentList from "./components/StudentList";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/students" element={<List/>}/>
        <Route path="/college-students" element={<StudentList/>}/>
        <Route path="/alumini" element={<AluminiList/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Desktop/>}/>
      </Routes>
    </Router>
  );
};

export default App