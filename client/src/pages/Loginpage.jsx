import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import CustomAlert from "../components/Customalert";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [allCorrect, setAllCorrect] = useState(false);

  const [showAlert, setShowAlert] = useState({ status: "" });

  const { login } = useContext(userContext);

  const checkAllCorrect = () => {
    if (email.length > 0 && password.length > 0) {
      setAllCorrect(true);
    } else {
      setAllCorrect(false);
    }
  };
  useEffect(() => {
    checkAllCorrect();
  }, [email, password]);

  const handleOnSubmit = async (e) => {
    const data = {
      email,
      password,
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const token = result.token;
    localStorage.setItem("token", token);
    if (result.message === "login successful") {
      setShowAlert({ status: "success" });
    }
    if (result.message === "user does not exist") {
      setShowAlert({ status: "warning" });
    }
    if (result.message === "incorrect password") {
      setShowAlert({ status: "warning" });
    }
    if (result.status === 404) {
      setShowAlert({ status: "error" });
    }
    login();
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert({ status: "" });
    }, 4000);

    if (showAlert.status === "success") {
      setTimeout(() => {
        setShowAlert({ status: "" });
        window.location.href = "/";
      }, 3000);
    }
  }, [showAlert.status]);

  return (
    <Flex
      justifyContent={"center"}
      m={"2px"}
      direction={"column"}
      alignItems={"center"}
      mt={"20px"}
      gap={"10px"}
    >
      {/* add a switch statement for the alert */}
      {showAlert.status === "success" && (
        <CustomAlert
          status={"success"}
          title={"Login successful"}
          discription={"Redirecting to Home page"}
        />
      )}
      {showAlert.status === "error" && (
        <CustomAlert
          status={"error"}
          title={"Error while loging in"}
          discription={"Please try again"}
        />
      )}
      {showAlert.status === "warning" && (
        <CustomAlert
          status={"warning"}
          title={"User not found or incorrect password"}
          discription={""}
        />
      )}

      <FormControl maxWidth={"500px"} isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl maxWidth={"500px"} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button onClick={() => handleOnSubmit()} isDisabled={!allCorrect}>
        Login
      </Button>

      <Button href={"/signup"} variant={"ghost"} as={"a"}>
        New user ? Register Here
      </Button>
    </Flex>
  );
}
