import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Customuser({
  username,
  email,
  bio,
  imageUrl,
  blogs,
  modalOpen,
  edit,
}) {
  return (
    <Skeleton isLoaded={username}>
      <Card width={"50%"} m={"auto"} minHeight={"90vh"}>
        <CardBody m={"auto"} width={"100%"}>
          <Flex direction={"column"} alignItems={"center"} gap={"10px"}>
            <Avatar name={username} src={imageUrl} size="xl" />
            <Heading size="sm" opacity={"70%"}>
              {blogs} blogs published
            </Heading>
            <Heading size="lg" mt="4">
              {username}
            </Heading>
            <Heading size="sm" opacity={"50%"}>
              {email}
            </Heading>
            <Divider />
            <Flex mt="6" direction={"column"} height={"100%"} gap={"100px"}>
              <Text overflowWrap={"break-word"}>{bio}</Text>

              {edit && <Button onClick={modalOpen}>Edit</Button>}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Skeleton>
  );
}
