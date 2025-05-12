import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState, useContext } from "react";
import  UserContext  from "../context/CreateContext";

const Footer = () => {
  const [thankYou, setThankYou] = useState(false);
  const { darkMode } = useContext(UserContext);
  const handleSubscribe = (e)=>{
    e.preventDefault();
    setThankYou(true);
    setTimeout(() => {
      setThankYou(false);
    }, 2000);
  }
  return (
    <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-200"} shadow-md py-10`}>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>About</h2>
          <p className={`text-sm ${darkMode ? "text-white" : "text-gray-600"}`}>
          AlgoReads is your go-to platform for insightful articles and discussions. Stay informed with our latest posts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Quick Links</h2>
          <ul className={`space-y-2 ${darkMode ? "text-white" : "text-gray-600"}`}>
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Categories</h2>
          <ul className={`space-y-2 ${darkMode ? "text-white" : "text-gray-600"}`}>
            <li><Link to="/category/tech" className="hover:text-blue-400">Tech</Link></li>
            <li><Link to="/category/lifestyle" className="hover:text-blue-400">Lifestyle</Link></li>
            <li><Link to="/category/travel" className="hover:text-blue-400">Travel</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Newsletter</h2>
          <p className={`text-sm mb-2 ${darkMode ? "text-white" : "text-gray-600"}`}>Subscribe to get the latest updates.</p>
          <form className="flex flex-col gap-4 items-center space-y-2 sm:space-y-0" onSubmit={handleSubscribe}>
            <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="email"
              placeholder="Enter email"
              className={`w-full sm:w-auto pl-8 pr-3 py-2 rounded-lg border-gray-700 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"} focus:outline-none`}
              required
            />
            <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg sm:rounded-r-lg hover:bg-blue-600" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className={`border-t border-gray-700 mt-8 pt-4 text-center text-sm ${darkMode ? "text-white" : "text-gray-600"}`}>
        <p>&copy; {new Date().getFullYear()} AlgoReads. All rights reserved.</p>
        <div className="mt-2 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link to="/terms" className="hover:text-blue-400">Terms of Use</Link>
          <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
          <Link to="/cookies" className="hover:text-blue-400">Cookies Policy</Link>
        </div>
      </div>
      {/* Thank You Overlay */}
      {thankYou && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg relative">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg">✅ You have successfully subscribed to our newsletter.</p>
          <button
            className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => setThankYou(false)}
          >
            X
          </button>
        </div>
      </div>
      )}
    </footer>
  );
};

export default Footer;
