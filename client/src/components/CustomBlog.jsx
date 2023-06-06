import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallback from "../assets/fallback.webp";
import "./compCss.css";

export default function CustomBlog({
  title,
  summary,
  author,
  date,
  image,
  id,
  canEdit,
  reload,
}) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function imageInit() {
      if (!image) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/blog/images/${image}`
      );
      setImgUrl(res.url);
    }
    imageInit();
  }, []);

  const changeDate = new Date(date);
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

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/blog/deleteBlog/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(false);
    reload();
  }

  return (
    <Card maxW="sm">
      <Link to={`/${id}/${title}`}>
        <CardBody>
          <Image
            src={imgUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            fallbackSrc={fallback}
            width={"100%"}
            height={"200px"}
            objectFit={"cover"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text height={"100px"} className="text">
              {summary}
            </Text>
          </Stack>
        </CardBody>
      </Link>
      <Divider />
      <CardFooter>
        <Flex justifyContent={"space-between"} width={"100%"}>
          {canEdit ? (
            <>
              <Link to={`/edit/${id}`}>
                <Button variant="solid" colorScheme="blue">
                  Edit Blog
                </Button>
              </Link>
              <Button
                colorScheme="red"
                onClick={() => handleDelete()}
                isLoading={loading}
              >
                delete
              </Button>
            </>
          ) : (
            <Link to={`/${id}/${title}`}>
              <Button variant="solid" colorScheme="blue">
                Read more
              </Button>
            </Link>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
}
