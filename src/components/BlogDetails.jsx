import {useParams} from 'react-router-dom';
import { useContext } from 'react';
import { motion, useScroll } from "framer-motion";
import UserContext from '../context/CreateContext';
const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};
const BlogDetails = () => {
    const { blogSlug } = useParams();
    const {darkMode,blogs} = useContext(UserContext);
    const blog = blogs.find((b) => generateSlug(b.title) === blogSlug);
    const { scrollYProgress } = useScroll();
  
    if (!blog) {
      return <h2 className="text-center text-xl text-red-500">Blog Not Found</h2>;
    }
    return (
      <div className={`mt-15 ${darkMode? "bg-gray-700 text-gray-100":"bg-white text-gray-800"}`}>
        <motion.div
          className="progress-bar bg-blue-500 fixed top-15 left-0 right-0 h-2 origin-left"
          style={{ scaleX: scrollYProgress }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <div 
          className='flex w-full items-center justify-center py-3'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <div className="container w-5/6 flex flex-col gap-8">
            <h1 className="text-3xl font-bold">{blog.title} <span className='font-normal'>&nbsp;⬆️{blog.upvote}</span></h1>
            <div className='flex gap-4 flex-1'>
              <img src={blog.blogImage} alt={blog.title} className="w-md max-h-100 rounded-md"/>
              <p className='text-justify'>{blog.content} <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, sit. Est eveniet eligendi totam ipsum ab adipisci quos blanditiis harum eaque ipsa provident minima quaerat, corporis reiciendis labore. Nam, minus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur laudantium voluptatum omnis molestiae enim ea quia veritatis corrupti officiis aspernatur blanditiis nihil perspiciatis exercitationem, excepturi soluta dolor animi, suscipit numquam! <br/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate delectus doloribus distinctio deserunt consectetur quam sed placeat dolorem veritatis accusamus eveniet, officia ea neque laboriosam suscipit nostrum, optio ipsam iusto.
              Reiciendis suscipit sequi, earum corrupti saepe fuga repellendus? Ipsam eos odio tenetur, commodi reiciendis repudiandae, amet magni cumque obcaecati perferendis velit aut. Beatae officia molestiae, consectetur similique totam blanditiis. Accusamus!
              Illum optio quaerat corrupti! Ea odit enim qui voluptas consequuntur quae iusto consequatur quis minus perspiciatis inventore accusamus, tempore eos in repellat dignissimos quos necessitatibus! Soluta suscipit iste numquam quia?
              Ab deserunt obcaecati corrupti eaque expedita libero iste? Veniam pariatur nesciunt dolore cupiditate consequuntur animi commodi tempore. Minima numquam doloremque, molestiae alias libero, ullam exercitationem, reprehenderit aspernatur laboriosam doloribus assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate perspiciatis eius, quidem modi beatae aliquid aspernatur nulla. Dolores iusto laborum sint nostrum tempora unde a adipisci in ullam eos! Soluta.
              Distinctio atque rem assumenda ratione aut laboriosam natus hic voluptates maiores sequi laudantium beatae eius maxime asperiores obcaecati molestias sunt delectus omnis, incidunt illo enim consectetur illum. Assumenda, odit nemo. </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Tags:</h2>
              <ul className="list-disc pl-5">
                {blog.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
              <span>Author: <strong>{blog.author.name}</strong></span> <br />
              <span>Published Date: <strong>{blog.date}</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default BlogDetails