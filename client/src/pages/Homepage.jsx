import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomBlog from "../components/CustomBlog";

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/blog/allBlogs/${page}`
    );
    const data = await res.json();
    setTotalBlogs(data.totalBlogs);
    setBlogs(data.blogs.reverse());
    setPage(page + 1);
  }

  return (
    <Skeleton isLoaded={blogs.length > 0} width={"100"}>
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
                key={blog._id}
                id={blog._id}
                image={blog.image}
              />
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Skeleton>
  );
}
