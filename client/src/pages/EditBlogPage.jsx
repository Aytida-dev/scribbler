import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogpreview from "../components/Blogpreview";
import CustomAlert from "../components/Customalert";

export default function EditBlogPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [showAlert, setShowAlert] = useState({ status: "" });

  useEffect(() => {
    async function initMe() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      //   console.log(data);
      setCreatedBy(data.user.email);
    }

    async function initBlog() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/blog/getblog/${id}`
      );
      const data = await res.json();
      setTitle(data.blog.title);
      setSummary(data.blog.summary);
      setContent(data.blog.content);
    }

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
    setCreatedAt(newDate);

    async function init() {
      await initMe();
      await initBlog();
    }
    init();
  }, []);

  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/blog/updateBlog/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          summary,
          content,
          createdBy,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "blog updated") {
      setShowAlert({ status: "success" });
    } else {
      setShowAlert({ status: "error" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert({ status: "" });
    }, 4000); // Hide the alert initially

    if (showAlert.status === "success") {
      setTimeout(() => {
        setShowAlert({ status: "" }); // Hide the alert after 4 seconds
        window.location.href = "/myblogs"; // Redirect to the login page
      }, 3000);
    }
  }, [showAlert.status]);

  return (
    <Skeleton isLoaded={title}>
      {showAlert.status === "success" && (
        <CustomAlert
          status={"success"}
          title={"Changes published successfully"}
          discription={"Redirecting to My blogs"}
        />
      )}
      {showAlert.status === "error" && (
        <CustomAlert
          status={"error"}
          title={"Error occured while publishing changes"}
          discription={"Try again"}
        />
      )}
      <Flex flexWrap="wrap">
        <Box width={{ base: "100%", md: "50%" }} p={2}>
          <Flex direction="column" alignItems="center" gap={"8vh"}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText>This will the Heading of the blog</FormHelperText>
            </FormControl>
            <FormControl isRequired>
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
            <FormControl isRequired>
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
            <FormControl>
              <Flex justifyContent="space-between" width="100%">
                <Button
                  colorScheme="pink"
                  variant="solid"
                  onClick={() => (window.location.href = "/myblogs")}
                >
                  Discard
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => handleUpdate()}
                  isDisabled={title === "" || summary === "" || content === ""}
                >
                  Update
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </Box>

        <Box width={{ base: "100%", md: "50%" }} p={2}>
          <Blogpreview
            title={title}
            content={content}
            createdBy={createdBy}
            newDate={createdAt}
          />
        </Box>
      </Flex>
    </Skeleton>
  );
}
