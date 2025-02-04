import { Link } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Search } from "lucide-react";
import '../index.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
        MyBlog
      </Link>

      {/* Nav Links */}
      <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
        <li><Link to="/" className="transition-colors delay-75 hover:text-blue-500">Home</Link></li>
        <li><Link to="/blog" className="transition-colors delay-75 hover:text-blue-500">Blog</Link></li>
        <li><Link to="/post" className="transition-colors delay-75 hover:text-blue-500">Single Post</Link></li>
        <li><Link to="/pages" className="transition-colors delay-75 hover:text-blue-500">Pages</Link></li>
        <li><Link to="/contact" className="transition-colors delay-75 hover:text-blue-500">Contact</Link></li>
      </ul>

      {/* Search & Mode Toggle */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative border-none outline-none">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
          />
          <Search className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={16} />
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer" >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-900" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
