import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, content, blogImage, author, date, tags }) => {
  const navigate = useNavigate();

  // Function to generate a slug from the blog title
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleClick = () => {
    const slug = generateSlug(title);
    navigate(`/blog/${slug}`);
  };

  return (
    <div
      className="flex flex-col p-2 bg-gray-50 border-blue-400 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <img src={blogImage} alt={title} className="rounded-md" />
      <div className="tags">{tags[0]}</div>
      <div className="font-medium blog-title">{title}</div>
      <div className="flex justify-between items-center blog-author">
        <div>{author}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default BlogCard;
