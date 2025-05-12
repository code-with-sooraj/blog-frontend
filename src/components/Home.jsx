import {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/CreateContext'
import BlogCard from './BlogCard'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion';

function Home() {
    const [query, setQuery] = useState("");
    const {darkMode, blogs} = useContext(UserContext);
    const navigate = useNavigate();
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        const slug = generateSlug(query);
        navigate(`/blog/${slug}`);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        const matches = blogs.filter((blog) =>
          blog.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBlogs(value.trim() ? matches : []);
    };
    const handleSelect = (title) => {
        const slug = generateSlug(title);
        navigate(`/blog/${slug}`);
    };
    return (
        <motion.div 
            className={`flex flex-col w-full items-center justify-center py-3 gap-2 mt-15 ${darkMode? "bg-gray-700":"bg-white"}`}
        >
            <div className="container w-5/6 flex flex-col gap-4">
                {/* 🔽 Marquee Description */}
                <marquee className="text-md text-red-600 font-medium mb-2" behavior="scroll" direction="left">
                Welcome to **AlgoReads** — your one-stop hub for trending tech, lifestyle tips, and cultural insights. Discover expertly written articles that spark curiosity and conversation. Stay informed and inspired with our latest thought-provoking posts.
                </marquee>
            </div>
            <section className="w-full z-2 h-screen flex flex-col items-center justify-center px-4 gap-12">
            {/* Relative wrapper for input and dropdown */}
            <div className="w-full max-w-xl mx-auto">
                {/* Relative wrapper to anchor dropdown */}
                <div className="relative">
                    {/* Input & button container */}
                    <div className="flex overflow-hidden rounded-full shadow-lg">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search blogs..."
                        className={`w-full px-6 py-3 ${darkMode? "bg-white":"bg-gray-200"} text-black text-lg outline-none`}
                    />
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 px-6 text-white text-lg transition-colors"
                        disabled={true}
                    >
                        🔍
                    </button>
                    </div>

                    {/* Dropdown below search bar */}
                    {filteredBlogs.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 bg-white text-black mt-1 rounded-md shadow-md z-">
                        {filteredBlogs.map((blog) => (
                        <li
                            key={blog._id}
                            onClick={() => handleSelect(blog.title)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition border-b-2"
                        >
                            {blog.title}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>

            {/* Top fade-in animation */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-4">From Code to Culture — All In One Blog</h1>
                <p className="text-lg md:text-xl font-semibold mb-6">
                Join readers exploring trends in development, education, productivity, and beyond.
                </p>
            </motion.div>
            {/* Decorative curve */}
            {/* <div className="absolute bottom-0 w-full h-32 bg-gray-200 rounded-t-[100%]" /> */}
            </section>
            <div className="container w-5/6 flex flex-col gap-4">
                <div className="w-full flex justify-between mb-4">
                    <h2 className='font-medium text-2xl'>Latest Blogs</h2>
                    <Link to="/blog" className="flex gap-1 text-sm px-3 py-1 border-1 bg-gray-700 hover:font-semibold text-white rounded-md transition">
                        <p>Explore Blogs</p>
                        <ArrowRight/>
                    </Link>
                </div>
                <div className="grid gap-2 grid-cols-4 cards-container">
                    {blogs.slice(0, 4).map(blog => (
                        <BlogCard
                            key={blog._id}
                            title={blog.title}
                            content={blog.content}
                            blogImage={blog.blogImage}
                            author={blog.author.name}
                            date={blog.date}
                            tags={blog.tags}
                            upvote={blog.upvote}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Home