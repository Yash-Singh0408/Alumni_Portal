import { BrowserRouter, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Home/>
    <Footer/>
    </BrowserRouter>
  );
};

export default App