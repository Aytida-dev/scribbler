import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CustomBlog({
  title,
  summary,
  author,
  date,
  id,
  canEdit,
  reload,
}) {
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
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/blog/deleteBlog/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    reload();
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Flex direction={"column"} width={"100%"}>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">{summary}</Text>
        </CardBody>

        <CardFooter>
          <Flex alignItems={"start"} direction={"column"} gap={"10px"}>
            <Link to={`/${id}/${title}`}>
              <Button variant="solid" colorScheme="blue">
                Read more
              </Button>
            </Link>
            {canEdit && (
              <Flex gap={10}>
                <Link to={`/edit/${id}`}>
                  <Button variant="solid" colorScheme="blue">
                    Edit Blog
                  </Button>
                </Link>
                <Button colorScheme="red" onClick={() => handleDelete()}>
                  delete
                </Button>
              </Flex>
            )}
            <Text py="2" opacity={"50%"}>
              by : {author} at: {newDate}
            </Text>
          </Flex>
        </CardFooter>
      </Flex>
    </Card>
  );
}
