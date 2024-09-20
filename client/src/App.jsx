import { BrowserRouter , Routes , Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login"

const App = () => {
  return (
    <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path="/sign-up" element={<Signup/>} />
      <Route path="/sign-in" element={<Login/>} />
    </Routes>
   </BrowserRouter>
  );
};

export default App