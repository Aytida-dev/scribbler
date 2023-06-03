import { useContext } from "react";
import { userContext } from "../App";
import Customform from "../components/Customform";

export default function Myprofilepage() {
  const { user } = useContext(userContext);

  return (
    <>
      <Customform
        penName={user.username}
        email={user.email}
        password={user.password}
        bio={user.bio}
      />
    </>
  );
}
