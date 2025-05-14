import { Link,NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import BACKEND_IP  from "../context/Backend";
import UserContext from "../context/CreateContext";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOverlay, setLoginOverlay] = useState(false);
  const [forgotOverlay, setForgotOverlay] = useState(false);
  const [signUpOverlay, setSignUpOverlay] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loggingOut, setLoggingOut] = useState(false);
  const { darkMode, setDarkMode, user, setUser, blogs, setBlogs } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUser = Cookies.get("username");
        if (loggedInUser) {
          setUser(loggedInUser);
        }

        const response = await axios.get(`${BACKEND_IP}/api/v1/blog/get-all-blogs`);
        const data = response.data;
        if (response.status === 200) {
          setBlogs(data);
        } else {
          console.error("Error fetching blogs:", data.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData(); // call the async function
  }, []);


  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");
    setFieldErrors({});
    setLoading(true);
  
    const email = e.target.username.value;
    const password = e.target.password.value;
  
    try {
      const response = await axios.post(`${BACKEND_IP}/api/v1/auth/login`, 
        { email, password },
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setSuccess(true);
        setError(false);
        setErrorMessage(response.data.message);
        Cookies.set("username", response.data.user.name, { expires: 1 });
        setUser(response.data.user.name);
        setLoginOverlay(false);
      } else {
        setSuccess(false);
        setError(true);
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      setSuccess(false);
      setError(true);
      const serverMsg = err.response?.data?.message || "Invalid credentials";
      setErrorMessage(serverMsg);  
      const errorFieldMap = {};
      if (serverMsg.toLowerCase().includes("email")) errorFieldMap.email = true;
      if (serverMsg.toLowerCase().includes("password")) errorFieldMap.password = true;
      setFieldErrors(errorFieldMap);
    } finally {
      setLoading(false);
    }
  };  

  const handleLogout = () => {
    setLoggingOut(true);
    Cookies.remove("token");
    Cookies.remove("username");
    setUser(null);
    setLoggingOut(false); 
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");
    setFieldErrors({});
    setLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.pass.value;
    const cpass = e.target.cpass.value;

    if (password !== cpass) {
      setError(true);
      setErrorMessage("Password does not match");
      setFieldErrors({ pass: true, cpass: true });
      setLoading(false);
      return;
    }

    try {
      const data = { name, email, password };
      const response = await axios.post(`${BACKEND_IP}/api/v1/auth/signup`, data, {
        withCredentials: true,
      });      

      if (response.status === 201) {
        setSuccess(true);
        setError(false);
        setErrorMessage(response.data.message);
        setLoginOverlay(false);
        setSignUpOverlay(false);
        Cookies.set("username", email, { expires: 1 });
        setUser(name);
      } else {
        setSuccess(false);
        setError(true);
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      setSuccess(false);
      setError(true);
      const serverMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMessage(serverMsg);

      const errorFieldMap = {};
      if (serverMsg.toLowerCase().includes("email")) errorFieldMap.email = true;
      if (serverMsg.toLowerCase().includes("name")) errorFieldMap.name = true;
      if (serverMsg.toLowerCase().includes("password")) errorFieldMap.pass = true;

      setFieldErrors(errorFieldMap);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <nav className={`fixed top-0 z-10 h-15 w-full flex items-center justify-between px-6 py-4 ${darkMode ? "bg-gray-900" : "bg-gray-200"} `}>
        <Link to="/" className={`text-xl font-bold  ${darkMode ? "text-white" : "text-black"}`}>AlgoReads</Link>
        <ul className={`hidden md:flex space-x-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pages"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>


        <div className="flex items-center space-x-4">
          {/* <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <Search className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={16} />
          </div> */}
          <button onClick={toggleMode} className={`p-2 rounded-full ${darkMode ? "bg-white" : "bg-black "} cursor-pointer`}>
            {darkMode ? <Sun className="text-black" /> : <Moon className="text-white" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-white">{user}</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded-md">Logout</button>
            </div>
          ) : (
            <button onClick={() => setLoginOverlay(true)} className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">Login</button>
          )}

          <button onClick={toggleMenu} className="md:hidden p-2 text-white cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {loggingOut && (
        <div className="border-4 border-white border-t-transparent rounded-full w-8 h-8 animate-spin backdrop-blur-md">
        </div>
      )}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center space-y-4 py-6">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/post" onClick={toggleMenu}>Single Post</Link>
          <Link to="/pages" onClick={toggleMenu}>Pages</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </div>
      )}

      {/* Login Overlay */}
      {loginOverlay && ( <AnimatePresence>
        <motion.div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md z-11" key="modal" exit={{ opacity: 0 }}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setLoginOverlay(false)} className="absolute top-2 right-2 text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col">
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className={`p-2 mb-3 rounded-m bg-gray-700 text-white outline-none ${
                  fieldErrors.email ? "border-2 border-red-700" : "border-none"
                }`}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className={`p-2 mb-3 rounded-md bg-gray-700 text-white outline-none ${
                  fieldErrors.password ? "border-2 border-red-700" : "border-none"
                }`}
                required
              />

              {(error || success) && (
                <p className={`text-sm mb-2 ${success ? "text-green-500" : "text-red-500"}`}>
                  {errorMessage}
                </p>
              )}

              <motion.button 
                type="submit" 
                className="py-2 text-white cursor-pointer rounded-[30px] bg-[#00ccff]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </form>

            <div className="flex justify-between mt-4">
              <button onClick={() => { setForgotOverlay(true); setLoginOverlay(false); }} className="text-red-500 mb-0.5">Forgot Password</button>
              <button onClick={() => { setSignUpOverlay(true); setLoginOverlay(false); }} className="text-red-500 mb-0.5">Sign Up</button>
            </div>
          </div>
        </motion.div> </AnimatePresence>
      )}

      {/* Forgot Password Overlay */}
      {forgotOverlay && (
        <div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md z-11">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setForgotOverlay(false)} className="absolute top-2 right-2 text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Forgot Password</h2>
            <form className="flex flex-col">
              <input type="email" placeholder="Enter Email" className="p-2 mb-3 border rounded-md bg-gray-700 text-white outline-none border-none" required />
              <motion.button type="submit" 
                className="py-2 text-white cursor-pointer rounded-[30px] bg-[#00ccff]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                disabled={loading}
              >Reset Password
              </motion.button>
            </form>
            <div className="flex justify-between mt-4">
              <button onClick={() => { setLoginOverlay(true); setForgotOverlay(false); }} className="text-red-500 mb-0.5">Login</button>
              <button onClick={() => { setSignUpOverlay(true); setForgotOverlay(false); }} className="text-red-500 mb-0.5">Sign Up</button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Overlay */}
      {signUpOverlay && (
        <div className="fixed inset-0 z-11 bg-transparent bg-opacity-20 flex items-center justify-center backdrop-blur-md">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setSignUpOverlay(false)} className="absolute top-2 right-2 text-gray-300">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Create an account</h2>
            <form className="flex flex-col" onSubmit={handleSignUp} autoComplete="off">
              <input
                type="text"
                placeholder="Name"
                className={`p-2 mb-3 border rounded-md bg-gray-700 text-white outline-none ${fieldErrors.name ? "border-2 border-red-700" : "border-none"}`}
                name="name"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className={`p-2 mb-3 border rounded-md bg-gray-700 text-white outline-none ${fieldErrors.email ? "border-2 border-red-700" : "border-none"}`}
                name="email"
                required
              />
              <input
                type="password"
                placeholder="Enter password"
                className={`p-2 mb-3 rounded-md bg-gray-700 text-white outline-none ${fieldErrors.pass ? "border-2 border-red-700" : "border-none"}`}
                name="pass"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                className={`p-2 mb-3 rounded-md bg-gray-700 text-white outline-none ${fieldErrors.cpass ? "border-2 border-red-700" : "border-none"}`}
                name="cpass"
                required
              />

              {(error || success) && (
                <p className={`text-sm mb-2 ${success ? "text-green-500" : "text-red-500"}`}>
                  {errorMessage}
                </p>
              )}

              <motion.button
                type="submit"
                className="py-2 text-white cursor-pointer rounded-[30px] bg-[#00ccff]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>
            <div className="flex justify-between mt-4">
              <button onClick={() => { setLoginOverlay(true); setSignUpOverlay(false); }} className="text-red-500 mb-0.5">Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
