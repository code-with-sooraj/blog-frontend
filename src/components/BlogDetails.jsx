import React from 'react'
import blogs from '../assets/blogs.json';
import {useParams} from 'react-router-dom';
const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};
const BlogDetails = () => {
    const { blogSlug } = useParams();
    const blog = blogs.find((b) => generateSlug(b.title) === blogSlug);
    console.log(blog);
  
    if (!blog) {
      return <h2 className="text-center text-xl text-red-500">Blog Not Found</h2>;
    }
  
    return (
    <div className='flex w-full items-center justify-center py-3'>
        <div className="container w-5/6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title} <span className='font-normal'>&nbsp;⬆️{blog.upvote}</span></h1>
        <img src={blog.blogImage} alt={blog.title} className="w-md rounded-md mb-4 " />
        <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 underline">
          <span>By {blog.author}</span> | <span>{blog.date}</span>
        </div>
      </div>
    </div>
    );
}

export default BlogDetails