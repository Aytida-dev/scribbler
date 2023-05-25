import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function CustomBlog({ title, summary, author, date }) {
  // change date from 2023-05-24T06:50:05.412Z to 2023-05-24 and day of week
  const changeDate = new Date(date);
  const year = changeDate.getFullYear();
  const month = changeDate.getMonth() + 1;
  const day = changeDate.getDate();
  //get day of week
  const dayOfWeeknumber = changeDate.getDay();
  //change numbers to monday, tuesday, etc
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
      <Flex direction={'column'} width={'100%'}>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">{summary}</Text>
        </CardBody>

        <CardFooter >
          <Flex alignItems={'start'} direction={'column'} gap={'10px'}>
            <Button variant="solid" colorScheme="blue">
              Read more
            </Button>
            <Text py="2">
              by : {author} at: {newDate}
            </Text>
          </Flex>
        </CardFooter>
      </Flex>
    </Card>
  );
}
