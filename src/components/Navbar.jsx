import { Link } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import '../index.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
        MyBlog
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
        <li><Link to="/" className="transition-colors delay-75 hover:text-blue-500">Home</Link></li>
        <li><Link to="/blog" className="transition-colors delay-75 hover:text-blue-500">Blog</Link></li>
        <li><Link to="/post" className="transition-colors delay-75 hover:text-blue-500">Single Post</Link></li>
        <li><Link to="/pages" className="transition-colors delay-75 hover:text-blue-500">Pages</Link></li>
        <li><Link to="/contact" className="transition-colors delay-75 hover:text-blue-500">Contact</Link></li>
      </ul>

      {/* Search, Mode Toggle, and Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Search Bar (Hidden on Mobile) */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
          />
          <Search className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={16} />
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleMode} className="p-2 rounded-full dark:bg-white bg-gray-700 cursor-pointer">
          {darkMode ? <Sun className="text-white dark:text-black" /> : <Moon className="text-white dark:text-black" />}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-gray-900 dark:text-white cursor-pointer">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`absolute top-16 left-0 w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center space-y-4 py-6 transition-all duration-800 md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <Link to="/" className="text-gray-900 dark:text-white" onClick={toggleMenu}>Home</Link>
        <Link to="/blog" className="text-gray-900 dark:text-white" onClick={toggleMenu}>Blog</Link>
        <Link to="/post" className="text-gray-900 dark:text-white" onClick={toggleMenu}>Single Post</Link>
        <Link to="/pages" className="text-gray-900 dark:text-white" onClick={toggleMenu}>Pages</Link>
        <Link to="/contact" className="text-gray-900 dark:text-white" onClick={toggleMenu}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
