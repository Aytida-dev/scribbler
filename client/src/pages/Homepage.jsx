import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomBlog from "../components/CustomBlog";

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function init() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blog/allBlogs`);
      const data = await res.json();

      setBlogs(data.blogs.reverse());
    }
    init();
  }, []);
  return (
    <Skeleton isLoaded={blogs.length > 0}>
      {blogs &&
        blogs.map((blog) => (
          <CustomBlog
            title={blog.title}
            summary={blog.summary}
            author={blog.createdBy}
            date={blog.createdAt}
            key={blog._id}
            id={blog._id}
            image={blog.image}
          />
        ))}
    </Skeleton>
  );
}
