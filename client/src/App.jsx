import React from "react";
import { BrowserRouter as Router,Routes,Route ,Link } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./components/List";
import Profile from "./pages/Profile/";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/slist" element={<List/>}/>
        <Route path="/profile" element={<Profile/>}/>

        
      </Routes>
    </Router>
  );
};

export default App