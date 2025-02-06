import React from 'react'


const BlogCard = ({title, content, blogImage, author, date, tags }) => {
  return (
    <div className='flex flex-col p-2 bg-gray-50 border-blue-400 rounded-md'>
        <img srcSet={blogImage} alt=""/>
        <div className="tags">{tags[0]}</div>
        <div className="font-medium blog-title">{title}</div>
        <div className="flex justify-between items-center blog-author">
            <div>{author}</div>
            <div>{date}</div>
        </div>
    </div>
  )
}

export default BlogCard