import React from "react";
import { BrowserRouter as Router,Routes,Route ,Link } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./components/List";
import Profile from "./pages/Profile/";
import AddEvent from "./components/AddEvent";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/slist" element={<List/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/addevent" element={<AddEvent/>}/>

        
      </Routes>
    </Router>
  );
};

export default App