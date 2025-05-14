import {Route, Routes,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import BlogDetail from "./BlogDetails";
import Blog from "./Blog";
import PageNotFound from "./PageNotFound";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogSlug" element={<BlogDetail />} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes;