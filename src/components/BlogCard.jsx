import { useNavigate } from "react-router-dom";
const BlogCard = ({ title, content, blogImage, author, date, tags, upvote }) => {
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
      className="flex flex-col p-2 bg-gray-200 rounded-md cursor-pointer"
      onClick={handleClick}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <img src={blogImage} alt={title} className="rounded-md" />
      <div className="tags">{tags.join(', ')}</div>
      <div className="font-medium blog-title">{title} <span> &nbsp; ⬆️{upvote}</span>
      </div>
      <div className="flex justify-between items-center blog-author">
        <div>{author}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default BlogCard;
