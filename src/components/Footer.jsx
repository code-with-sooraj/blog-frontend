import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [thankYou, setThankYou] = useState(false);
  const handleSubscribe = (e)=>{
    e.preventDefault();
    setThankYou(true);
    setTimeout(() => {
      setThankYou(false);
    }, 2000);
  }
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 shadow-md py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-lg font-semibold dark:text-white">About</h2>
          <p className="text-sm dark:text-white">
            MyBlog is your go-to platform for insightful articles and discussions. Stay informed with our latest posts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold dark:text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Home</Link></li>
            <li><Link to="/blog" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Blog</Link></li>
            <li><Link to="/contact" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold dark:text-white">Categories</h2>
          <ul className="space-y-2">
            <li><Link to="/category/tech" className="hover:text-blue-400 dark:text-white">Tech</Link></li>
            <li><Link to="/category/lifestyle" className="hover:text-blue-400 dark:text-white">Lifestyle</Link></li>
            <li><Link to="/category/travel" className="hover:text-blue-400 dark:text-white">Travel</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold dark:text-white">Newsletter</h2>
          <p className="text-sm mb-2 dark:text-white">Subscribe to get the latest updates.</p>
          <form className="flex flex-col sm:flex-row items-center relative space-y-2 sm:space-y-0" onSubmit={handleSubscribe}>
            <Mail className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={16} />
            <input
              type="email"
              placeholder="Enter email"
              className="w-full sm:w-auto pl-8 pr-3 py-2 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              required
            />
            <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg sm:rounded-r-lg hover:bg-blue-600" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm dark:text-white">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <div className="mt-2 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link to="/terms" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Terms of Use</Link>
          <Link to="/privacy" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Privacy Policy</Link>
          <Link to="/cookies" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Cookies Policy</Link>
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
