import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetails";
import Blog from "./components/Blog";
const SinglePost = () => <h1>Single Post</h1>;
const Pages = () => <h1>Pages</h1>;
const Contact = () => <h1>Contact</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogSlug" element={<BlogDetail />} />
        <Route path="/post" element={<SinglePost />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
