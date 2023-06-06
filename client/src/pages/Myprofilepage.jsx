import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../App";
import Customform from "../components/Customform";
import Customuser from "../components/Customuser";

export default function Myprofilepage() {
  const { user } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Customform
            penName={user.username}
            email={user.email}
            password={user.password}
            bio={user.bio}
            modalClose={onClose}
          />
        </ModalContent>
      </Modal>
      <Customuser
        username={user.username}
        email={user.email}
        bio={user.bio}
        imageUrl={user.image}
        blogs={user.blogs}
        modalOpen={onOpen}
        edit={true}
      />
    </>
  );
}
