import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import UserContext from './context/CreateContext';
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  return (
    <UserContext.Provider value={{ darkMode, setDarkMode, user, setUser,blogs, setBlogs }}>
      <Router>
        <Navbar />
        <AnimatedRoutes/>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
