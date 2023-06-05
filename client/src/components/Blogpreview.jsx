import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Blogpreview({
  title,
  createdBy,
  content,
  newDate,
  image,
}) {
  return (
    <Skeleton isLoaded={title}>
      <Card>
        <CardHeader>
          <Flex gap={"10px"} direction={"column"} alignItems={"center"}>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="blog image"
                width={"100%"}
                height={"auto"}
              />
            )}
            <Heading size="xl">{title}</Heading>
          </Flex>
          <Flex justifyContent={"end"} gap={"10px"}>
            <Text py="2" opacity={"50%"}>
              by : {createdBy} || {newDate}
            </Text>
          </Flex>
        </CardHeader>
        <hr></hr>
        <CardBody marginLeft={"5%"}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </CardBody>
      </Card>
    </Skeleton>
  );
}
