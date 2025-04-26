import React from 'react'
import { Link } from 'react-router-dom'
import blogs from '../assets/blogs.json'
import BlogCard from './BlogCard'
import { Icon, ArrowRight } from 'lucide-react'

function Home() {
  return (
    <div className='flex flex-col w-full items-center justify-center py-3 gap-2'>
        <div className="container w-5/6 flex flex-col gap-4">
            {/* 🔽 Marquee Description */}
            <marquee className="text-md text-red-600 font-medium mb-2" behavior="scroll" direction="left">
            Welcome to **AlgoReads** — your one-stop hub for trending tech, lifestyle tips, and cultural insights. Discover expertly written articles that spark curiosity and conversation. Stay informed and inspired with our latest thought-provoking posts.
            </marquee>
        </div>
        <div className="container w-5/6 flex flex-col gap-4">
            <div className="w-full flex justify-between mb-4">
                <h2 className='font-medium text-2xl'>Latest Blogs</h2>
                <Link to="/blog" className="flex gap-1 text-sm px-3 py-1 bg-gray-700 hover:font-semibold text-white rounded-md transition">
                    <p>Explore Blogs</p>
                    <ArrowRight/>
                </Link>
            </div>
            <div className="grid gap-2 grid-cols-4 cards-container">
                {blogs.slice(0, 4).map(blog => (
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

export default Home