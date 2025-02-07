import React from 'react'
import blogs from '../assets/blogs.json'
import BlogCard from './BlogCard'

function Home() {
  return (
    <div className='flex w-full items-center justify-center py-3'>
        <div className="container w-5/6 flex flex-col gap-4">
            <h2 className='font-medium text-2xl'>Latest Blogs</h2>
            <div className="grid gap-2 grid-cols-4 cards-container">
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        blogImage={blog.blogImage}
                        author={blog.author}
                        date={blog.date}
                        tags={blog.tags}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home