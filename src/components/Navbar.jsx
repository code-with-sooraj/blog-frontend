import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import '../index.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOverlay, setLoginOverlay] = useState(false);
  const [forgotOverlay, setForgotOverlay] = useState(false);
  const [signUpOverlay, setSignUpOverlay] = useState(false);
  const [user, setUser] = useState(null);
  const [error,setError] = useState(false);

  useEffect(() => {
    const loggedInUser = Cookies.get("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    Cookies.set("username", username, { expires: 1 });
    setUser(username);
    setLoginOverlay(false);
  };

  const handleLogout = () => {
    Cookies.remove("username");
    setUser(null);
  };

  const handleSignUp = (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const cpass = e.target.cpass.value;
    let data = new FormData();
    data.append('name', name);
    data.append('email',email);
    data.append('pass',pass);
    data.append('cpass',cpass);
    console.log(data);
  }

  const comparePassword = (e) =>{
    const cpass = e.target.value;
    const pass = e.target.previousSibling.value;
    console.log(pass,cpass);
    if(pass === cpass){
      setError(false);
    }else{
      setError(true);
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">MyBlog</Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/blog" className="hover:text-blue-500">Blog</Link></li>
          <li><Link to="/post" className="hover:text-blue-500">Single Post</Link></li>
          <li><Link to="/pages" className="hover:text-blue-500">Pages</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <Search className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={16} />
          </div>

          <button onClick={toggleMode} className="p-2 rounded-full dark:bg-white bg-gray-700 cursor-pointer">
            {darkMode ? <Sun className="text-white dark:text-black" /> : <Moon className="text-white dark:text-black" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-gray-800 dark:text-white">{user}</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded-md">Logout</button>
            </div>
          ) : (
            <button onClick={() => setLoginOverlay(true)} className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">Login</button>
          )}

          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-900 dark:text-white cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center space-y-4 py-6">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/post" onClick={toggleMenu}>Single Post</Link>
          <Link to="/pages" onClick={toggleMenu}>Pages</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </div>
      )}

      {/* Login Overlay */}
      {loginOverlay && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setLoginOverlay(false)} className="absolute top-2 right-2 text-gray-700 dark:text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col">
              <input type="text" name="username" placeholder="Enter Username" className="p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" required />
              <input type="password" name="password" placeholder="Enter Password" className="p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" required />
              <button type="submit" className="py-2 bg-blue-500 text-white rounded-md">Login</button>
            </form>
            <div className="flex justify-between mt-4">
              <button onClick={() => { setForgotOverlay(true); setLoginOverlay(false); }} className="text-red-500">Forgot Password</button>
              <button onClick={() => { setSignUpOverlay(true); setLoginOverlay(false); }} className="text-red-500">Sign Up</button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Overlay */}
      {forgotOverlay && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setForgotOverlay(false)} className="absolute top-2 right-2 text-gray-700 dark:text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Forgot Password</h2>
            <form className="flex flex-col">
              <input type="email" placeholder="Enter Email" className="p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" required />
              <button type="submit" className="py-2 bg-blue-500 text-white rounded-md">Reset Password</button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Overlay */}
      {signUpOverlay && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setSignUpOverlay(false)} className="absolute top-2 right-2 text-gray-700 dark:text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create an account</h2>
            <form className="flex flex-col" onSubmit={handleSignUp} autoComplete="false">
              <input type="text" placeholder="Name" className="p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none border-none" name='name' required />
              <input type="email" placeholder="Email" className="p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none border-none" name='email' required />
              <input type="password" placeholder="enter password" className={`p-2 mb-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none ${error? "border-2 border-red-700": "border-none"}`} name='pass' required />
              <input type="password" placeholder="confirm password" className={`p-2 mb-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none ${error? "border-2 border-red-700": "border-none"}`} name='cpass' onKeyUp={comparePassword} required />
              <button type="submit" className="py-2 bg-green-500 text-white rounded-md">Create Account</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
