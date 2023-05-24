import React from "react";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

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
