import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import React from "react";

export default function CustomAlert({ status, title, discription }) {
  return (
    <Box>
      <Alert status={status}>
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{discription}</AlertDescription>
      </Alert>
    </Box>
  );
}
