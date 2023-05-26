import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomBlog from "../components/CustomBlog";

export default function Myblogspage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function init() {
      const res = await fetch("http://localhost:4000/blog/getBlogsByUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setBlogs(data.blogs.reverse());
    }
    init();
  }, []);
  return (
    <Box>
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
              canEdit={true}
            />
          ))}
      </Skeleton>
    </Box>
  );
}
