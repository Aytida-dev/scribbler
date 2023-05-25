import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Blogspage() {
  const { title, id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function init() {
      const res = await fetch(`http://localhost:4000/blog/getblog/${id}`);
      const data = await res.json();
      setBlog(data.blog);
    }
    init();
  }, []);

  const changeDate = new Date(blog.createdAt);
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
    <Card>
      <CardHeader>
        <Flex gap={"10px"} direction={"column"} alignItems={"center"}>
          <Heading size="md">{blog.title}</Heading>
        </Flex>
        <Flex justifyContent={"end"} gap={"10px"}>
          <Text py="2" opacity={'50%'}>
            by : {blog.createdBy} || {newDate}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text py="2">{blog.content}</Text>
      </CardBody>
    </Card>
  );
}
