import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomBlog from "../components/CustomBlog";

export default function Myblogspage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/blog/getBlogsByUser`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();

    setBlogs(data.blogs.reverse());
  }

  return (
    <Box>
      <Skeleton isLoaded={blogs.length !== 0}>
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
              reload={init}
            />
          ))}
      </Skeleton>
    </Box>
  );
}
