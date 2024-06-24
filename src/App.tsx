
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import Test from "./pages/Test";

export default function App(){
  return(
    <>
    <Router>
      <Link to="Login">Login</Link>
      <Link to="Signup">Signup</Link>
      <Link to="Test">Test</Link>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
    </>
  
  )
}