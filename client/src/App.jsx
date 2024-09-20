import React from "react";
import { BrowserRouter as Router,Routes,Route ,Link } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./components/List";
import EventCard from "./components/EventCard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/slist" element={<List/>}/>
        <Route path="/event" element={<EventCard/>}/>

        
      </Routes>
    </Router>
  );
};

export default App