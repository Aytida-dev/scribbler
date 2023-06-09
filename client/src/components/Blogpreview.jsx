import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import fallback from "../assets/fallback.webp";

export default function Blogpreview({
  title,
  createdBy,
  content,
  newDate,
  image,
  preview,
}) {
  return (
    <Skeleton isLoaded={title}>
      <Card>
        <CardHeader>
          <Flex gap={"10px"} direction={"column"} alignItems={"center"}>
            {preview
              ? image && (
                  <Image
                    src={URL.createObjectURL(image)}
                    width={"50%"}
                    fallbackSrc={fallback}
                  />
                )
              : image && (
                  <Image
                    src={image}
                    alt="blog image"
                    fallbackSrc={fallback}
                    boxSize={"30%"}
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
