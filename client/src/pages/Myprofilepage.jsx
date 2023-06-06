import { useContext } from "react";
import { userContext } from "../App";
import Customform from "../components/Customform";
import Customuser from "../components/Customuser";

export default function Myprofilepage() {
  const { user } = useContext(userContext);

  return (
    <>
      <Customuser
        username={user.username}
        email={user.email}
        password={user.password}
        bio={user.bio}
        imageUrl={user.image}
      />
    </>
  );
}
