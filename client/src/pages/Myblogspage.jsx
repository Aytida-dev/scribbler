import { Box, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomBlog from "../components/CustomBlog";

export default function Myblogspage() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/blog/getBlogsByUser/${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    setTotalBlogs(data.totalBlogs);
    setBlogs(data.blogs.reverse());
    setPage(page + 1);
  }

  return (
    <Box>
      {blogs.length === 0 && (
        <Box textAlign={"center"} mt={"20vh"}>
          <Heading size={"lg"} opacity={"80%"}>
            You have not published any blogs yet.
          </Heading>
        </Box>
      )}
      <Skeleton isLoaded={blogs.length !== 0}>
        <InfiniteScroll
          dataLength={blogs.length}
          next={init}
          hasMore={totalBlogs > blogs.length}
          loader={<h4>Loading...</h4>}
        >
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
        </InfiniteScroll>
      </Skeleton>
    </Box>
  );
}
