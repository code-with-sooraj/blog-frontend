import BlogCard from './BlogCard'
import { useState, useMemo, useContext } from "react";
import { Search} from "lucide-react";
import UserContext from '../context/CreateContext';

function Blog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const {darkMode,blogs} = useContext(UserContext);
    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&(selectedTag === "" || blog.tags.includes(selectedTag)));
    const uniqueTags = useMemo(() => {
        const tagSet = new Set();
        blogs.forEach(blog => blog.tags.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet);
      }, [blogs]);
    return (
    <div 
        className={`flex w-full ${darkMode? "bg-gray-700":"bg-white"} items-center justify-center py-3 mt-15`}
    >
        <div className="container w-5/6 flex flex-col gap-4">
            <div className="w-full flex justify-between mb-4">
                <h2 className={`font-medium text-2xl ${darkMode ? "text-white":"text-gray-700"}`}>Our Blogs</h2>
                <div className="flex gap-2 items-center h-9">
                    <div className='w-auto h-full'>
                        <input
                        type="text"
                        placeholder="Search..."
                        className={`pl-8 pr-3 py-1 rounded-lg border-1 ${darkMode? "bg-gray-700 text-white":"bg-white text-gray-900"} `}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search
                        className="mx-1.5 -mt-6.5 dark:text-gray-500 text-gray-400"
                        size={16}
                        />
                    </div>

                    {/* Tag Dropdown */}
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className={`px-2 py-1 h-full text-sm border-1 rounded-md ${darkMode ? "bg-gray-700 text-white":"bg-gray-100 text-gray-900"}`}
                    >
                        <option value="">All Tags</option>
                        {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid gap-2 grid-cols-4 cards-container">
                {filteredBlogs.map(blog => (
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
    </div>
    )
}

export default Blog