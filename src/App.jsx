import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetails";
import Blog from "./components/Blog";
import UserContext from './CreateContext';
import { useState } from "react";
const Courses = () => <h1>Courses</h1>;
const Pages = () => <h1>Pages</h1>;
const Contact = () => <h1>Contact</h1>;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ darkMode, setDarkMode, user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogSlug" element={<BlogDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
