import React from 'react'
import blogs from '../assets/blogs.json'
import BlogCard from './BlogCard'
import { useState, useMemo } from "react";
import { Search} from "lucide-react";

function Blog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&(selectedTag === "" || blog.tags.includes(selectedTag)));
    const uniqueTags = useMemo(() => {
        const tagSet = new Set();
        blogs.forEach(blog => blog.tags.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet);
      }, [blogs]);
    return (
    <div className='flex w-full items-center justify-center py-3'>
        <div className="container w-5/6 flex flex-col gap-4">
            <div className="w-full flex justify-between mb-4">
                <h2 className='font-medium text-2xl'>Latest Blogs</h2>
                <div className="flex gap-2 items-center h-9">
                    <div className='w-auto h-full'>
                        <input
                        type="text"
                        placeholder="Search..."
                        className="pl-8 pr-3 py-1 rounded-lg border-2 dark:bg-white bg-gray-800 dark:text-gray-900 text-white border-gray-900"
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
                        className="px-2 py-1 h-full text-sm border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        blogImage={blog.blogImage}
                        author={blog.author}
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