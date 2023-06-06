import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
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
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          padding={6}
        >
          {blogs &&
            blogs.map((blog) => (
              <CustomBlog
                title={blog.title}
                summary={blog.summary}
                author={blog.createdBy}
                date={blog.createdAt}
                image={blog.image}
                key={blog._id}
                id={blog._id}
                canEdit={true}
                reload={init}
              />
            ))}
        </SimpleGrid>
      </Skeleton>
    </Box>
  );
}
