import { Link } from "react-router-dom";
import {Mail} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 shadow-md py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <h2 className="text-lg font-semibold dark:text-white">Category</h2>
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
          <div className="flex relative">
            <input
              type="email"
              placeholder="Enter email"
              className="pl-8 pr-3 py-1 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
            />
            <Mail className="absolute left-2 top-3 text-gray-500 dark:text-gray-400" size={16} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm dark:text-white">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/terms" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Terms of Use</Link>
          <Link to="/privacy" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Privacy Policy</Link>
          <Link to="/cookies" className="transition-colors delay-75 hover:text-blue-400 dark:text-white">Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
