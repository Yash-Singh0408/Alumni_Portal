import { BrowserRouter, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    </BrowserRouter>
  );
};

export default App