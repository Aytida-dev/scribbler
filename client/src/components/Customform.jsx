import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomAlert from "./Customalert";

export default function Customform({
  penName,
  email,
  password,
  bio,
  modalClose,
}) {
  const [PenName, setPenName] = useState("");
  // const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Bio, setBio] = useState("");

  const [showAlert, setShowAlert] = useState({ status: "" });

  useEffect(() => {
    if (penName !== undefined) setPenName(penName);
    // if (email !== undefined) setEmail(email);
    if (password !== undefined) setPassword(password);
    if (password !== undefined) setConfirmPassword(password);
    if (bio !== undefined) setBio(bio);
  }, [penName, email, password, bio]);

  const updateHandler = async () => {
    const formData = new FormData();
    formData.append("username", PenName);
    formData.append("email", email);
    formData.append("password", Password);
    formData.append("bio", Bio);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/updateuser`,
      {
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "user updated") {
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
    <Flex direction={"column"} width={"50%"} m={"auto"} gap={"2"}>
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
      <FormControl isRequired>
        <FormLabel>Pen name</FormLabel>
        <Input
          type="text"
          value={PenName}
          onChange={(e) => setPenName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} isReadOnly={true} />
        <FormHelperText>Email can't be changed.</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired isInvalid={Password !== ConfirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormErrorMessage>Passwords do not match</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Bio</FormLabel>
        <Textarea
          type="text"
          value={Bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Flex justifyContent="space-between" width="100%">
          <Button colorScheme="pink" variant="solid" onClick={modalClose}>
            Discard
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => updateHandler()}
            isDisabled={
              Password !== ConfirmPassword || Password === "" || PenName === ""
            }
          >
            Update
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
}
