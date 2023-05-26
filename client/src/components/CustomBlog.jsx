import {
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
              <Link to={`/edit/${id}`}>
                <Button variant="solid" colorScheme="blue">
                  Edit Blog
                </Button>
              </Link>
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
