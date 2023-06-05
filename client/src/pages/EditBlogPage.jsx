import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Textarea,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import Blogpreview from "../components/Blogpreview";
import CustomAlert from "../components/Customalert";

export default function EditBlogPage() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [image, setImage] = useState();

  const [showAlert, setShowAlert] = useState({ status: "" });

  const { user } = useContext(userContext);
  const createdBy = user.email;

  useEffect(() => {
    async function initBlog() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/blog/getblog/${id}`
      );
      const data = await res.json();
      console.log(data);
      setTitle(data.blog.title);
      setSummary(data.blog.summary);
      setContent(data.blog.content);
      // setImage(data.blog.image);
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

    initBlog();
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
          image,
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
    <Skeleton isLoaded={title || createdBy}>
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Markdown Tips</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList spacing={5}>
                <ListItem>
                  Headers: Use hash symbols (#) to create headers. The number of
                  hash symbols indicates the header level.
                </ListItem>
                <ListItem>
                  Emphasis: Use asterisks (*) or underscores (_) to add emphasis
                  to text. Single asterisks or underscores create italic text,
                  while double asterisks or underscores create bold text
                </ListItem>
                <ListItem>
                  Links: Enclose the link text in square brackets ([]) and the
                  URL in parentheses (()).{" "}
                </ListItem>
                <ListItem>
                  Images: Use an exclamation mark (!), followed by the
                  alternative text in square brackets ([]), and the image URL in
                  parentheses (()).
                </ListItem>
                <ListItem>
                  Lists: Create unordered lists using hyphens (-), plus signs
                  (+), or asterisks (*). For ordered lists, use numbers followed
                  by periods (1., 2., etc.)
                </ListItem>
                <ListItem>
                  Code: Use backticks (`) to denote inline code snippets, and
                  triple backticks for code blocks. For code blocks, you can
                  also specify the language for syntax highlighting
                </ListItem>
              </UnorderedList>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
            <FormControl>
              <FormLabel>Thumbnail</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
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
              {
                <Button onClick={onOpen} variant={"ghost"}>
                  <FormHelperText>
                    The content is written in markdown language ,
                  </FormHelperText>
                </Button>
              }

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
            image={image}
          />
        </Box>
      </Flex>
    </Skeleton>
  );
}
