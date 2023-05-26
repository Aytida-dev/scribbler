import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import Blogpreview from "../components/Blogpreview";

export default function EditBlogPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function initMe() {
      const res = await fetch("http://localhost:4000/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      //   console.log(data);
      setUsername(data.user.username);
    }

    async function initBlog() {
      const res = await fetch(`http://localhost:4000/blog/getblog/${id}`);
      const data = await res.json();
      setTitle(data.blog.title);
      setSummary(data.blog.summary);
      setContent(data.blog.content);
    }

    async function init() {
      await initMe();
      await initBlog();
    }
    init();
  }, []);

  const changeDate = new Date();
  const year = changeDate.getFullYear();
  const month = changeDate.getMonth() + 1;
  const day = changeDate.getDate();

  const dayOfWeeknumber = changeDate.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[dayOfWeeknumber];
  const newDate = `${day}-${month}-${year} (${dayOfWeek})`;

  return (
    <Flex flexWrap="wrap">
      <Box width={{ base: "100%", md: "50%" }} p={2}>
        <Flex direction="column" alignItems="center" gap={"10vh"}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormHelperText>This will the Heading of the blog</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Summary</FormLabel>
            <Input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <FormHelperText>
              Write a small but catchy subject for your blog
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <FormHelperText>
              The content is written in markdown language
            </FormHelperText>
            <Textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </Flex>
      </Box>

      <Box width={{ base: "100%", md: "50%" }} p={2}>
        <Blogpreview
          title={title}
          content={content}
          createdBy={username}
          createdAt={newDate}
        />
      </Box>
    </Flex>
  );
}
