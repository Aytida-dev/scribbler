
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomBlog from "../components/CustomBlog";

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);    
  useEffect(() => {
    async function init() {
      const res = await fetch("http://localhost:4000/blog/allBlogs");
      const data = await res.json();
      console.log(data);
      setBlogs(data.blogs);
    }
    init();
  }, []);
  return (
    <Box>
      {blogs && blogs.map((blog) => (
        <CustomBlog title = {blog.title} summary={blog.summary} author={blog.createdBy} date={blog.createdAt} key={blog._id}/>
      ))}
    </Box>
  );
}
