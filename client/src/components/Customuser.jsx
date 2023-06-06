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

export default function Customuser({ username, email, bio, imageUrl }) {
  return (
    <Skeleton isLoaded={username}>
      <Card width={"50%"} m={"auto"} minHeight={"90vh"}>
        <CardBody m={"auto"} width={"100%"}>
          <Flex direction={"column"} alignItems={"center"} gap={"10px"}>
            <Avatar name={username} src={imageUrl} size="xl" />
            <Heading size="lg" mt="4">
              {username}
            </Heading>
            <Heading size="sm" opacity={"50%"}>
              {email}
            </Heading>
            <Divider />
            <Stack mt="6" spacing="3">
              <Text>{bio}</Text>
              <Button>Edit</Button>
            </Stack>
          </Flex>
        </CardBody>
      </Card>
    </Skeleton>
  );
}
