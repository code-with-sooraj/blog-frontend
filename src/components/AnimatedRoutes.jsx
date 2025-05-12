import {Route, Routes,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import BlogDetail from "./BlogDetails";
import Blog from "./Blog";
import PageNotFound from "./PageNotFound";
const Courses = () => <h1 className='mt-15'>Courses</h1>;
const Pages = () => <h1 className='mt-15'>Pages</h1>;
const Contact = () => <h1 className='mt-15'>Contact</h1>;

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogSlug" element={<BlogDetail />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes;